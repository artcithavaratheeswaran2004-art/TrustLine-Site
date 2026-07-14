// Classic script (not a module) so quiz pages work when opened directly from
// disk (file://) by double-clicking the HTML file. ES module imports and
// fetch() are both blocked by the browser under file://, so quiz data is
// loaded from a plain <script src="data/quizzes/xxx.js"> that assigns to
// window.TRUSTLINE_QUIZZES[key] instead of being fetched as JSON.
(function () {
  var TrustLineQuiz = (window.TrustLineQuiz = window.TrustLineQuiz || {});

  /**
   * Orchestrates a single quiz: reads the pre-loaded question bank, manages
   * attempt state (with localStorage persistence and auto-resume), and
   * re-renders the relevant screen from js/quiz/render.js on every change.
   *
   * Layout: every question renders at once in a single scrollable list,
   * answer as you scroll, then "Submit Assessment" at the bottom.
   *
   * Usage: new TrustLineQuiz.QuizEngine({ container, quizKey }).init();
   * Add a new assessment anywhere on the site by pointing a fresh container at
   * a new key + <script src="data/quizzes/your-quiz.js">, no engine changes required.
   */
  function QuizEngine(opts) {
    this.container = opts.container;
    this.quizKey = opts.quizKey;
    this.quiz = null;
    this.state = null;
    this.timerHandle = null;
  }

  QuizEngine.prototype.init = function () {
    TrustLineQuiz.dom.clear(this.container);

    var bank = window.TRUSTLINE_QUIZZES || {};
    var quiz = bank[this.quizKey];
    if (!quiz) {
      this.renderLoadError();
      return;
    }
    this.quiz = quiz;

    var saved = TrustLineQuiz.loadAttempt(this.quiz.id);
    var resumable = saved && this.isValidAttempt(saved);
    this.showIntro(resumable ? saved : null);
  };

  QuizEngine.prototype.renderLoadError = function () {
    var dom = TrustLineQuiz.dom;
    dom.clear(this.container);
    this.container.append(
      dom.el("div", { class: "quiz-card quiz-error-card" }, [
        dom.el("p", { class: "quiz-eyebrow", text: "Assessment unavailable" }),
        dom.el("h2", { text: "This assessment couldn't be loaded." }),
        dom.el("p", {
          text:
            'No question data was found for "' +
            this.quizKey +
            '". Make sure the page includes its data script (e.g. <script src="data/quizzes/' +
            this.quizKey +
            '.js">) before js/quiz/engine.js.',
        }),
      ])
    );
  };

  QuizEngine.prototype.isValidAttempt = function (attempt) {
    var ids = {};
    this.quiz.questions.forEach(function (q) {
      ids[q.id] = true;
    });
    return (
      Array.isArray(attempt.order) &&
      attempt.order.length === this.quiz.questions.length &&
      attempt.order.every(function (id) {
        return ids[id];
      })
    );
  };

  QuizEngine.prototype.buildFreshAttempt = function () {
    var quiz = this.quiz;
    var order = quiz.randomizeQuestions
      ? TrustLineQuiz.shuffle(quiz.questions.map(function (q) { return q.id; }))
      : quiz.questions.map(function (q) { return q.id; });

    var optionOrder = {};
    quiz.questions.forEach(function (question) {
      optionOrder[question.id] = quiz.randomizeOptions
        ? TrustLineQuiz.shuffle(question.options.map(function (o) { return o.id; }))
        : question.options.map(function (o) { return o.id; });
    });

    var startedAt = Date.now();
    return {
      order: order,
      optionOrder: optionOrder,
      answers: {},
      flagged: [],
      phase: "list",
      startedAt: startedAt,
      finishedAt: null,
      deadlineAt: quiz.timerMinutes ? startedAt + quiz.timerMinutes * 60000 : null,
    };
  };

  QuizEngine.prototype.persist = function () {
    TrustLineQuiz.saveAttempt(this.quiz.id, this.state);
  };

  QuizEngine.prototype.showIntro = function (resumableAttempt) {
    var self = this;
    this.stopTimer();
    TrustLineQuiz.renderIntro(this.container, this.quiz, { hasResumableAttempt: !!resumableAttempt }, {
      onStart: function (resume) {
        self.state = resume && resumableAttempt ? resumableAttempt : self.buildFreshAttempt();
        self.persist();
        self.renderCurrentPhase();
      },
    });
  };

  QuizEngine.prototype.findQuestion = function (id) {
    return this.quiz.questions.filter(function (q) {
      return q.id === id;
    })[0];
  };

  QuizEngine.prototype.renderCurrentPhase = function () {
    if (this.state.phase === "results") this.renderResultsScreen();
    else this.renderListScreen();
  };

  // --- scroll + focus preservation ------------------------------------------
  // The whole list re-renders on every change; restoring window.scrollY keeps
  // the page from jumping, and re-focusing the control the user just used
  // keeps keyboard/screen-reader users oriented instead of losing focus to <body>.
  QuizEngine.prototype.withPreservedViewport = function (selectorToFocus, renderFn) {
    var scrollY = window.scrollY;
    renderFn();
    window.scrollTo(0, scrollY);
    if (selectorToFocus) {
      var el = this.container.querySelector(selectorToFocus);
      if (el) el.focus();
    }
  };

  QuizEngine.prototype.renderListScreen = function () {
    var self = this;
    var answeredCount = this.state.order.filter(function (id) {
      return self.state.answers[id] && self.state.answers[id].checked;
    }).length;

    TrustLineQuiz.renderQuestionList(
      this.container,
      {
        quiz: this.quiz,
        order: this.state.order,
        optionOrder: this.state.optionOrder,
        answers: this.state.answers,
        flagged: this.state.flagged,
        answeredCount: answeredCount,
      },
      {
        onSelectOption: function (questionId, optionId, isChecked) {
          self.selectOption(questionId, optionId, isChecked);
        },
        onSelectConfidence: function (questionId, value) {
          self.selectConfidence(questionId, value);
        },
        onCheck: function (questionId) {
          self.checkAnswer(questionId);
        },
        onFlagToggle: function (questionId) {
          self.toggleFlag(questionId);
        },
        onSubmit: function () {
          self.finish();
        },
        onJumpNext: function () {
          self.jumpToNextUnanswered();
        },
      }
    );
    this.renderTimerChip();
  };

  QuizEngine.prototype.selectOption = function (questionId, optionId, isChecked) {
    var question = this.findQuestion(questionId);
    var answer = this.state.answers[questionId] || { selected: [], confidence: null, checked: false, correct: false };
    if (answer.checked) return;

    if (question.type === "multiple") {
      var set = {};
      (answer.selected || []).forEach(function (id) { set[id] = true; });
      if (isChecked) set[optionId] = true;
      else delete set[optionId];
      answer.selected = Object.keys(set);
    } else {
      answer.selected = [optionId];
    }

    this.state.answers[questionId] = answer;
    this.persist();
    this.withPreservedViewport("#opt-" + questionId + "-" + optionId, this.renderListScreen.bind(this));
  };

  QuizEngine.prototype.selectConfidence = function (questionId, value) {
    var answer = this.state.answers[questionId] || { selected: [], confidence: null, checked: false, correct: false };
    if (answer.checked) return;
    answer.confidence = value;
    this.state.answers[questionId] = answer;
    this.persist();
    this.withPreservedViewport("#confidence-" + questionId + "-" + value, this.renderListScreen.bind(this));
  };

  QuizEngine.prototype.checkAnswer = function (questionId) {
    var question = this.findQuestion(questionId);
    var answer = this.state.answers[questionId];
    if (!answer || !answer.selected.length || answer.checked) return;
    answer.checked = true;
    answer.correct = TrustLineQuiz.isAnswerCorrect(question, answer.selected);
    this.persist();
    this.withPreservedViewport("#explanation-" + questionId, this.renderListScreen.bind(this));
  };

  QuizEngine.prototype.toggleFlag = function (questionId) {
    var idx = this.state.flagged.indexOf(questionId);
    if (idx === -1) this.state.flagged.push(questionId);
    else this.state.flagged.splice(idx, 1);
    this.persist();
    this.withPreservedViewport("#flag-" + questionId, this.renderListScreen.bind(this));
  };

  QuizEngine.prototype.jumpToNextUnanswered = function () {
    var self = this;
    var nextId = this.state.order.filter(function (id) {
      return !self.state.answers[id] || !self.state.answers[id].checked;
    })[0];
    if (nextId) {
      var card = this.container.querySelector("#q-card-" + nextId);
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    var submitBar = this.container.querySelector(".quiz-submit-bar");
    if (submitBar) submitBar.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  QuizEngine.prototype.finish = function () {
    this.stopTimer();
    this.state.phase = "results";
    this.state.finishedAt = Date.now();
    this.persist();
    this.renderResultsScreen();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  QuizEngine.prototype.renderResultsScreen = function () {
    var results = TrustLineQuiz.computeResults(
      this.quiz,
      this.state.answers,
      this.state.order,
      this.state.startedAt,
      this.state.finishedAt
    );
    var self = this;
    TrustLineQuiz.renderResults(
      this.container,
      { quiz: this.quiz, results: results, order: this.state.order, answers: this.state.answers },
      {
        onRetake: function () {
          self.retake();
        },
      }
    );
  };

  QuizEngine.prototype.retake = function () {
    TrustLineQuiz.clearAttempt(this.quiz.id);
    this.state = this.buildFreshAttempt();
    this.persist();
    this.renderListScreen();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- optional per-quiz countdown timer -----------------------------------
  QuizEngine.prototype.renderTimerChip = function () {
    var self = this;
    this.stopTimer();
    if (!this.state.deadlineAt) return;

    var row = this.container.querySelector(".quiz-topbar-row");
    if (!row) return;
    var chip = TrustLineQuiz.dom.el("span", { class: "quiz-chip quiz-timer-chip" });
    row.append(chip);

    function tick() {
      var remainingMs = self.state.deadlineAt - Date.now();
      if (remainingMs <= 0) {
        chip.textContent = "Time's up";
        self.finish();
        return;
      }
      var minutes = Math.floor(remainingMs / 60000);
      var seconds = String(Math.floor((remainingMs % 60000) / 1000)).padStart(2, "0");
      chip.textContent = "⏱ " + minutes + ":" + seconds + " remaining";
    }
    tick();
    this.timerHandle = window.setInterval(tick, 1000);
  };

  QuizEngine.prototype.stopTimer = function () {
    if (this.timerHandle) {
      window.clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
  };

  TrustLineQuiz.QuizEngine = QuizEngine;
})();
