// DOM builders for each screen of the assessment. No state lives in here;
// every function takes plain data + a callbacks object and returns/populates
// DOM nodes. Keeping this pure makes the engine (engine.js) easy to follow.
//
// Layout model: a scrollable list. Every question is on the page at once,
// answered in place as the user scrolls down, with a single "Submit
// Assessment" action at the bottom, no per-question "next" navigation.
//
// Classic script (not a module) so quiz pages work when opened directly from
// disk (file://), where ES module imports and fetch() are both blocked.
(function () {
  var TrustLineQuiz = (window.TrustLineQuiz = window.TrustLineQuiz || {});

  /** Minimal element builder: el("button", { class:"x", attrs:{...} }, ["text", childNode]) */
  function el(tag, opts, children) {
    opts = opts || {};
    children = children || [];
    var node = document.createElement(tag);
    if (opts.class) node.className = opts.class;
    if (opts.text !== undefined) node.textContent = opts.text;
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (key) {
        var value = opts.attrs[key];
        if (value === false || value === null || value === undefined) return;
        node.setAttribute(key, value === true ? "" : value);
      });
    }
    children.forEach(function (child) {
      if (child === null || child === undefined) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function clear(container) {
    container.replaceChildren();
  }

  function formatDuration(ms) {
    if (!ms || ms < 0) return null;
    var totalSeconds = Math.round(ms / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    if (minutes === 0) return seconds + "s";
    return minutes + "m " + seconds + "s";
  }

  // -------------------------------------------------------------------------
  // Intro screen
  // -------------------------------------------------------------------------
  TrustLineQuiz.renderIntro = function (container, quiz, opts, callbacks) {
    clear(container);

    var meta = el("div", { class: "quiz-intro-meta" }, [
      el("span", { class: "quiz-chip" }, [
        el("i", { class: "fa-regular fa-clock", attrs: { "aria-hidden": "true" } }),
        " " + quiz.estimatedMinutes + " min",
      ]),
      el("span", { class: "quiz-chip" }, [
        el("i", { class: "fa-solid fa-list-check", attrs: { "aria-hidden": "true" } }),
        " " + quiz.questions.length + " questions",
      ]),
      el("span", { class: "quiz-chip" }, [
        el("i", { class: "fa-solid fa-gauge-high", attrs: { "aria-hidden": "true" } }),
        " " + quiz.passPercentage + "% to pass",
      ]),
    ]);

    var topicList = el(
      "ul",
      { class: "quiz-intro-topics" },
      quiz.topics.map(function (t) {
        return el("li", { text: t.label });
      })
    );

    var actions = el("div", { class: "quiz-intro-actions" });
    if (opts.hasResumableAttempt) {
      var resumeBtn = el("button", { class: "quiz-btn quiz-btn-primary", attrs: { type: "button" } }, ["Resume Assessment"]);
      var restartBtn = el("button", { class: "quiz-btn quiz-btn-ghost", attrs: { type: "button" } }, ["Start Over"]);
      resumeBtn.addEventListener("click", function () {
        callbacks.onStart(true);
      });
      restartBtn.addEventListener("click", function () {
        callbacks.onStart(false);
      });
      actions.append(resumeBtn, restartBtn);
    } else {
      var startBtn = el(
        "button",
        { class: "quiz-btn quiz-btn-primary", attrs: { type: "button" } },
        ["Begin Assessment", el("i", { class: "fa-solid fa-arrow-right", attrs: { "aria-hidden": "true" } })]
      );
      startBtn.addEventListener("click", function () {
        callbacks.onStart(false);
      });
      actions.append(startBtn);
    }

    var card = el("section", { class: "quiz-card quiz-intro-card", attrs: { "aria-labelledby": "quiz-intro-heading" } }, [
      el("p", { class: "quiz-eyebrow", text: "Assessment" }),
      el("h1", { class: "quiz-intro-title", attrs: { id: "quiz-intro-heading" }, text: quiz.title }),
      el("p", { class: "quiz-intro-desc", text: quiz.description }),
      meta,
      el("p", { class: "quiz-intro-hint" }, [
        el("i", { class: "fa-solid fa-circle-info", attrs: { "aria-hidden": "true" } }),
        " Every question is on one page, answer as you scroll, then submit at the bottom.",
      ]),
      el("h2", { class: "quiz-intro-subhead", text: "Topics covered" }),
      topicList,
      actions,
    ]);

    container.append(card);
  };

  // -------------------------------------------------------------------------
  // Question list (scrollable) screen
  // -------------------------------------------------------------------------
  function renderOption(question, option, inputType, isSelected, isChecked, isCorrectOption, isSelectedWrong, onSelectOption) {
    var inputId = "opt-" + question.id + "-" + option.id;
    var input = el("input", {
      class: "quiz-option-input",
      attrs: {
        type: inputType,
        name: "question-" + question.id,
        id: inputId,
        value: option.id,
        checked: isSelected || false,
        disabled: isChecked || false,
      },
    });

    var label = el(
      "label",
      {
        class:
          "quiz-option" +
          (isSelected ? " is-selected" : "") +
          (isChecked && isCorrectOption ? " is-correct" : "") +
          (isChecked && isSelectedWrong ? " is-incorrect" : ""),
        attrs: { for: inputId },
      },
      [
        input,
        el("span", { class: "quiz-option-marker", attrs: { "aria-hidden": "true" } }),
        el("span", { class: "quiz-option-text", text: option.text }),
        isChecked && isCorrectOption
          ? el("i", { class: "fa-solid fa-circle-check quiz-option-icon", attrs: { "aria-hidden": "true" } })
          : null,
        isChecked && isSelectedWrong
          ? el("i", { class: "fa-solid fa-circle-xmark quiz-option-icon", attrs: { "aria-hidden": "true" } })
          : null,
      ]
    );

    input.addEventListener("change", function (e) {
      onSelectOption(option.id, e.target.checked);
    });

    return label;
  }

  function renderExplanationPanel(question, answer) {
    var wasCorrect = answer.correct;
    var incorrectNotes = (answer.selected || [])
      .filter(function (id) {
        return question.correctOptionIds.indexOf(id) === -1;
      })
      .map(function (id) {
        return question.explanation.incorrect && question.explanation.incorrect[id];
      })
      .filter(Boolean);

    return el(
      "div",
      {
        class: "quiz-explanation" + (wasCorrect ? " is-correct" : " is-incorrect"),
        attrs: {
          role: "region",
          "aria-label": "Answer explanation",
          id: "explanation-" + question.id,
          tabindex: "-1",
        },
      },
      [
        el("p", { class: "quiz-explanation-status" }, [
          el("i", {
            class: wasCorrect ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation",
            attrs: { "aria-hidden": "true" },
          }),
          el("span", { class: "sr-only", text: wasCorrect ? "Correct. " : "Incorrect. " }),
          wasCorrect ? " Correct" : " Not quite",
        ]),
        el("p", { class: "quiz-explanation-text", text: question.explanation.correct }),
        incorrectNotes.length
          ? el(
              "ul",
              { class: "quiz-explanation-list" },
              incorrectNotes.map(function (note) {
                return el("li", { text: note });
              })
            )
          : null,
        el("div", { class: "quiz-explanation-why" }, [
          el("p", { class: "quiz-explanation-why-label", text: "Why it matters for an SME" }),
          el("p", { text: question.explanation.whyItMatters }),
        ]),
      ]
    );
  }

  function renderQuestionCard(quiz, question, index, total, answer, isFlagged, optionOrder, callbacks) {
    var inputType = question.type === "multiple" ? "checkbox" : "radio";
    var checked = !!answer.checked;

    var scenarioBlock = question.scenario
      ? el("div", { class: "quiz-scenario" }, [
          el("p", { class: "quiz-scenario-label", text: "Scenario" }),
          el("p", { text: question.scenario }),
        ])
      : null;

    var optionsWrap = el("div", {
      class: "quiz-options" + (question.type === "multiple" ? " is-multi" : ""),
      attrs: { role: "group", "aria-label": "Answer options" },
    });
    var orderedOptions = optionOrder.map(function (id) {
      return question.options.filter(function (o) {
        return o.id === id;
      })[0];
    });
    orderedOptions.forEach(function (option) {
      var isSelected = (answer.selected || []).indexOf(option.id) !== -1;
      var isCorrectOption = checked && question.correctOptionIds.indexOf(option.id) !== -1;
      var isSelectedWrong = checked && isSelected && question.correctOptionIds.indexOf(option.id) === -1;
      var label = renderOption(question, option, inputType, isSelected, checked, isCorrectOption, isSelectedWrong, function (optionId, isChecked) {
        callbacks.onSelectOption(question.id, optionId, isChecked);
      });
      optionsWrap.append(label);
    });

    var fieldset = el("fieldset", { class: "quiz-fieldset" }, [
      el("legend", { class: "quiz-question-text", text: question.prompt }),
      question.type === "multiple" ? el("p", { class: "quiz-select-hint", text: "Select all that apply." }) : null,
      optionsWrap,
    ]);

    var confidenceLevels = [
      ["low", "Low"],
      ["medium", "Medium"],
      ["high", "High"],
    ];
    var confidenceChips = confidenceLevels.map(function (pair) {
      var value = pair[0];
      var label = pair[1];
      var id = "confidence-" + question.id + "-" + value;
      var input = el("input", {
        attrs: {
          type: "radio",
          name: "confidence-" + question.id,
          id: id,
          value: value,
          checked: answer.confidence === value,
          disabled: checked,
        },
      });
      var chip = el("label", { class: "quiz-confidence-chip", attrs: { for: id } }, [input, label]);
      input.addEventListener("change", function () {
        callbacks.onSelectConfidence(question.id, value);
      });
      return chip;
    });
    var confidenceWrap = el(
      "div",
      { class: "quiz-confidence", attrs: { role: "radiogroup", "aria-label": "How confident are you in this answer?" } },
      [el("span", { class: "quiz-confidence-label", text: "Confidence" })].concat(confidenceChips)
    );

    var flagBtn = el(
      "button",
      {
        class: "quiz-flag-btn" + (isFlagged ? " is-flagged" : ""),
        attrs: { type: "button", id: "flag-" + question.id, "aria-pressed": String(isFlagged) },
      },
      [
        el("i", { class: isFlagged ? "fa-solid fa-flag" : "fa-regular fa-flag", attrs: { "aria-hidden": "true" } }),
        isFlagged ? " Flagged for review" : " Flag for review",
      ]
    );
    flagBtn.addEventListener("click", function () {
      callbacks.onFlagToggle(question.id);
    });

    var hasSelection = (answer.selected || []).length > 0;
    var checkBtn = !checked
      ? el(
          "button",
          {
            class: "quiz-btn quiz-btn-primary quiz-check-btn",
            attrs: { type: "button", id: "check-" + question.id, disabled: !hasSelection },
          },
          ["Check Answer", el("i", { class: "fa-solid fa-arrow-right", attrs: { "aria-hidden": "true" } })]
        )
      : null;
    if (checkBtn) {
      checkBtn.addEventListener("click", function () {
        callbacks.onCheck(question.id);
      });
    }

    var statusBadge = checked
      ? el("span", { class: "quiz-q-status " + (answer.correct ? "is-correct" : "is-incorrect") }, [
          el("i", {
            class: answer.correct ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation",
            attrs: { "aria-hidden": "true" },
          }),
          answer.correct ? " Answered correctly" : " Answered incorrectly",
        ])
      : el("span", { class: "quiz-q-status is-pending", text: "Not yet answered" });

    return el(
      "article",
      {
        class: "quiz-card quiz-q-card" + (checked ? " is-checked" : ""),
        attrs: { id: "q-card-" + question.id, "data-question-id": question.id },
      },
      [
        el("div", { class: "quiz-q-card-top" }, [
          el("span", { class: "quiz-q-index", text: "Question " + (index + 1) + " of " + total }),
          statusBadge,
          flagBtn,
        ]),
        scenarioBlock,
        fieldset,
        confidenceWrap,
        checkBtn,
        checked ? renderExplanationPanel(question, answer) : null,
      ]
    );
  }

  TrustLineQuiz.renderQuestionList = function (container, ctx, callbacks) {
    var quiz = ctx.quiz;
    var order = ctx.order;
    var optionOrder = ctx.optionOrder;
    var answers = ctx.answers;
    var flagged = ctx.flagged;
    var answeredCount = ctx.answeredCount;
    clear(container);

    var total = order.length;
    var percentage = Math.round((answeredCount / total) * 100);

    var jumpBtn = el("button", { class: "quiz-jump-btn", attrs: { type: "button" } }, [
      "Jump to next unanswered ",
      el("i", { class: "fa-solid fa-arrow-down", attrs: { "aria-hidden": "true" } }),
    ]);
    jumpBtn.addEventListener("click", callbacks.onJumpNext);

    var header = el("header", { class: "quiz-list-header" }, [
      el("div", { class: "quiz-topbar-row" }, [el("p", { class: "quiz-module-title", text: quiz.title })]),
      el("div", { class: "quiz-progress-row" }, [
        el(
          "div",
          {
            class: "quiz-progress-track",
            attrs: {
              role: "progressbar",
              "aria-valuenow": String(percentage),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-label": "Assessment progress",
            },
          },
          [el("div", { class: "quiz-progress-fill", attrs: { style: "width:" + percentage + "%" } })]
        ),
        el("span", { class: "quiz-counter", text: answeredCount + " of " + total + " answered" }),
      ]),
      jumpBtn,
    ]);

    var questionsById = {};
    quiz.questions.forEach(function (q) {
      questionsById[q.id] = q;
    });
    var list = el(
      "div",
      { class: "quiz-q-list" },
      order.map(function (id, i) {
        var question = questionsById[id];
        var answer = answers[id] || { selected: [], confidence: null, checked: false, correct: false };
        return renderQuestionCard(quiz, question, i, total, answer, flagged.indexOf(id) !== -1, optionOrder[id], callbacks);
      })
    );

    var allAnswered = answeredCount === total;
    var submitBtn = el(
      "button",
      { class: "quiz-btn quiz-btn-primary quiz-submit-btn", attrs: { type: "button" } },
      ["Submit Assessment", el("i", { class: "fa-solid fa-arrow-right", attrs: { "aria-hidden": "true" } })]
    );
    submitBtn.addEventListener("click", callbacks.onSubmit);

    var submitBar = el("div", { class: "quiz-submit-bar" }, [
      el("p", {
        class: "quiz-submit-note",
        text: allAnswered
          ? "All " + total + " questions answered, ready to submit."
          : answeredCount + " of " + total + " answered. You can submit any time; unanswered questions count as incorrect.",
      }),
      submitBtn,
    ]);

    container.append(header, list, submitBar);
  };

  // -------------------------------------------------------------------------
  // Results screen
  // -------------------------------------------------------------------------
  function renderTopicBar(topic) {
    return el("li", { class: "quiz-topic-row" }, [
      el("div", { class: "quiz-topic-row-head" }, [
        el("span", { text: topic.label }),
        el("span", { class: "quiz-topic-row-value", text: topic.percentage + "%" }),
      ]),
      el("div", { class: "quiz-topic-track" }, [
        el("div", { class: "quiz-topic-fill", attrs: { style: "width:" + topic.percentage + "%" } }),
      ]),
      el("p", { class: "quiz-topic-count", text: topic.correct + " of " + topic.total + " correct" }),
    ]);
  }

  TrustLineQuiz.renderResults = function (container, ctx, callbacks) {
    var quiz = ctx.quiz;
    var results = ctx.results;
    var order = ctx.order;
    var answers = ctx.answers;
    clear(container);

    var scoreRing = el(
      "div",
      {
        class: "quiz-score-ring",
        attrs: { style: "--pct:" + results.percentage, role: "img", "aria-label": "Score: " + results.percentage + " percent" },
      },
      [el("span", { text: results.percentage + "%" })]
    );

    var duration = formatDuration(results.durationMs);

    var scoreCard = el("div", { class: "quiz-score-card" }, [
      scoreRing,
      el("div", { class: "quiz-score-meta" }, [
        el("span", { class: "quiz-score-badge " + (results.passed ? "is-pass" : "is-fail") }, [
          el("i", {
            class: results.passed ? "fa-solid fa-circle-check" : "fa-solid fa-circle-exclamation",
            attrs: { "aria-hidden": "true" },
          }),
          results.passed ? " Pass" : " Not yet passed",
        ]),
        el("p", {
          class: "quiz-score-detail",
          text: results.correctCount + " of " + results.totalQuestions + " correct · " + results.passPercentage + "% required to pass",
        }),
        duration ? el("p", { class: "quiz-score-detail quiz-score-duration", text: "Completed in " + duration }) : null,
      ]),
    ]);

    var topicsPanel = el("div", { class: "quiz-results-panel" }, [
      el("h3", { text: "Performance by topic" }),
      el("ul", { class: "quiz-topic-list" }, results.topics.map(renderTopicBar)),
    ]);

    var strengthsList = results.strengths.length
      ? el(
          "ul",
          { class: "quiz-tag-list" },
          results.strengths.map(function (t) {
            return el("li", { class: "quiz-tag is-good", text: t.label });
          })
        )
      : el("p", { class: "quiz-empty-note", text: "Keep working through the assessment to build up clear strengths." });

    var improvementsList = results.improvements.length
      ? el(
          "ul",
          { class: "quiz-improve-list" },
          results.improvements.map(function (t) {
            return el("li", { class: "quiz-improve-item" }, [
              el("span", { class: "quiz-tag is-warn", text: t.label }),
              t.recommendedModule
                ? el("a", { class: "quiz-improve-link", attrs: { href: t.recommendedModule.href } }, [
                    "Revisit “" + t.recommendedModule.title + "”",
                    el("i", { class: "fa-solid fa-arrow-right", attrs: { "aria-hidden": "true" } }),
                  ])
                : null,
            ]);
          })
        )
      : el("p", { class: "quiz-empty-note", text: "No clear weak areas, solid result across every topic covered." });

    var insightsPanel = el("div", { class: "quiz-results-panel" }, [
      el("h3", { text: "Strengths" }),
      strengthsList,
      el("h3", { text: "Areas for improvement" }),
      improvementsList,
    ]);

    var certBtn = el(
      "button",
      {
        class: "quiz-btn quiz-btn-ghost",
        attrs: { type: "button", disabled: true, title: "Certificate downloads are coming soon" },
      },
      [el("i", { class: "fa-solid fa-award", attrs: { "aria-hidden": "true" } }), " Download Certificate"]
    );
    var retakeBtn = el("button", { class: "quiz-btn quiz-btn-primary", attrs: { type: "button" } }, [
      el("i", { class: "fa-solid fa-rotate-right", attrs: { "aria-hidden": "true" } }),
      " Retake Assessment",
    ]);
    retakeBtn.addEventListener("click", callbacks.onRetake);
    var reviewToggleBtn = el(
      "button",
      { class: "quiz-btn quiz-btn-ghost", attrs: { type: "button", "aria-expanded": "false" } },
      [el("i", { class: "fa-solid fa-magnifying-glass", attrs: { "aria-hidden": "true" } }), " Review Your Answers"]
    );

    var actions = el("div", { class: "quiz-results-actions" }, [retakeBtn, reviewToggleBtn, certBtn]);

    // Detailed answer review (collapsed by default)
    var questionsById = {};
    quiz.questions.forEach(function (q) {
      questionsById[q.id] = q;
    });
    var incorrectOnlyCheckbox = el("input", { attrs: { type: "checkbox", id: "quiz-incorrect-only" } });
    var detailList = el("ol", { class: "quiz-review-detail-list" });

    function renderDetailList(incorrectOnly) {
      clear(detailList);
      order.forEach(function (id) {
        if (incorrectOnly && results.incorrectQuestionIds.indexOf(id) === -1) return;
        var question = questionsById[id];
        var answer = answers[id] || {};
        var selectedText =
          (answer.selected || [])
            .map(function (optId) {
              return question.options.filter(function (o) {
                return o.id === optId;
              })[0];
            })
            .filter(Boolean)
            .map(function (o) {
              return o.text;
            })
            .join(", ") || "No answer given";
        var correctText = question.correctOptionIds
          .map(function (optId) {
            return question.options.filter(function (o) {
              return o.id === optId;
            })[0];
          })
          .filter(Boolean)
          .map(function (o) {
            return o.text;
          })
          .join(", ");

        detailList.append(
          el("li", { class: "quiz-review-detail-item " + (answer.correct ? "is-correct" : "is-incorrect") }, [
            el("p", { class: "quiz-review-detail-prompt", text: question.prompt }),
            el("p", { class: "quiz-review-detail-row", text: "Your answer: " + selectedText }),
            !answer.correct
              ? el("p", { class: "quiz-review-detail-row quiz-review-detail-correct", text: "Correct answer: " + correctText })
              : null,
            answer.confidence
              ? el("p", { class: "quiz-review-detail-row quiz-review-detail-confidence", text: "Confidence: " + answer.confidence })
              : null,
            el("p", { class: "quiz-review-detail-why", text: question.explanation.whyItMatters }),
          ])
        );
      });
      if (!detailList.children.length) {
        detailList.append(el("li", { class: "quiz-empty-note", text: "Nothing to show here." }));
      }
    }
    renderDetailList(false);
    incorrectOnlyCheckbox.addEventListener("change", function (e) {
      renderDetailList(e.target.checked);
    });

    var detailSection = el("div", { class: "quiz-results-review", attrs: { hidden: true } }, [
      el("label", { class: "quiz-incorrect-toggle" }, [incorrectOnlyCheckbox, " Show incorrect answers only"]),
      detailList,
    ]);

    reviewToggleBtn.addEventListener("click", function () {
      var isHidden = detailSection.hasAttribute("hidden");
      if (isHidden) detailSection.removeAttribute("hidden");
      else detailSection.setAttribute("hidden", "");
      reviewToggleBtn.setAttribute("aria-expanded", String(isHidden));
    });

    var card = el("section", { class: "quiz-card quiz-results-card", attrs: { "aria-labelledby": "results-heading" } }, [
      el("p", { class: "quiz-eyebrow", text: "Assessment complete" }),
      el("h1", { attrs: { id: "results-heading" }, text: quiz.title + " Results" }),
      scoreCard,
      el("div", { class: "quiz-results-grid" }, [topicsPanel, insightsPanel]),
      actions,
      detailSection,
    ]);

    container.append(card);
  };

  TrustLineQuiz.dom = { el: el, clear: clear };
})();
