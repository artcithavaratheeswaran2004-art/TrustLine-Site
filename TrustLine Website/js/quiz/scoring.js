// Pure functions: no DOM, no storage, easy to reason about in isolation.
// Classic script (not a module) so quiz pages work when opened directly from
// disk (file://), where ES module imports and fetch() are both blocked.
(function () {
  var TrustLineQuiz = (window.TrustLineQuiz = window.TrustLineQuiz || {});

  /** Fisher-Yates shuffle. Returns a new array; never mutates the input. */
  TrustLineQuiz.shuffle = function (items) {
    var arr = items.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  };

  /** Is the given selection exactly the set of correct option ids? Order-independent. */
  TrustLineQuiz.isAnswerCorrect = function (question, selectedOptionIds) {
    var correct = question.correctOptionIds.slice().sort();
    var selected = selectedOptionIds.slice().sort();
    if (correct.length !== selected.length) return false;
    for (var i = 0; i < correct.length; i++) {
      if (correct[i] !== selected[i]) return false;
    }
    return true;
  };

  /**
   * Builds the full results summary for a completed (or in-progress) attempt.
   * `answers` is keyed by question id: { selected, confidence, checked, correct }.
   */
  TrustLineQuiz.computeResults = function (quiz, answers, order, startedAt, finishedAt) {
    var questionsById = {};
    quiz.questions.forEach(function (q) {
      questionsById[q.id] = q;
    });
    var totalQuestions = order.length;

    var correctCount = 0;
    var answeredCount = 0;

    var topicTotals = {};
    quiz.topics.forEach(function (topic) {
      topicTotals[topic.id] = { correct: 0, total: 0 };
    });

    var incorrectQuestionIds = [];

    order.forEach(function (id) {
      var question = questionsById[id];
      var answer = answers[id];
      var topicStat = topicTotals[question.topic] || { correct: 0, total: 0 };
      topicStat.total += 1;

      if (answer && answer.checked) {
        answeredCount += 1;
        if (answer.correct) {
          correctCount += 1;
          topicStat.correct += 1;
        } else {
          incorrectQuestionIds.push(id);
        }
      } else {
        incorrectQuestionIds.push(id);
      }
      topicTotals[question.topic] = topicStat;
    });

    var percentage = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;
    var passed = percentage >= quiz.passPercentage;

    var topics = quiz.topics
      .map(function (topic) {
        var stat = topicTotals[topic.id];
        var topicPercentage = stat.total ? Math.round((stat.correct / stat.total) * 100) : null;
        return {
          id: topic.id,
          label: topic.label,
          correct: stat.correct,
          total: stat.total,
          percentage: topicPercentage,
        };
      })
      .filter(function (topic) {
        return topic.total > 0;
      });

    var strengths = topics.filter(function (t) {
      return t.percentage !== null && t.percentage >= 80;
    });
    var improvements = topics
      .filter(function (t) {
        return t.percentage !== null && t.percentage < 60;
      })
      .map(function (t) {
        return Object.assign({}, t, {
          recommendedModule: quiz.recommendedModules ? quiz.recommendedModules[t.id] : null,
        });
      });

    return {
      totalQuestions: totalQuestions,
      answeredCount: answeredCount,
      correctCount: correctCount,
      percentage: percentage,
      passed: passed,
      passPercentage: quiz.passPercentage,
      topics: topics,
      strengths: strengths,
      improvements: improvements,
      incorrectQuestionIds: incorrectQuestionIds,
      durationMs: finishedAt && startedAt ? finishedAt - startedAt : null,
    };
  };
})();
