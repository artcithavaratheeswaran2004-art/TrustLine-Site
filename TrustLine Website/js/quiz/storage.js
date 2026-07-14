// Persists a single in-progress or completed attempt per quiz to localStorage.
// Classic script (not a module) so quiz pages work when opened directly from
// disk (file://), where ES module imports and fetch() are both blocked.
(function () {
  var TrustLineQuiz = (window.TrustLineQuiz = window.TrustLineQuiz || {});
  var PREFIX = "trustline:quiz:";
  var VERSION = 1;

  TrustLineQuiz.loadAttempt = function (quizId) {
    try {
      var raw = window.localStorage.getItem(PREFIX + quizId);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== VERSION) return null;
      return parsed;
    } catch (err) {
      return null;
    }
  };

  TrustLineQuiz.saveAttempt = function (quizId, attempt) {
    try {
      var toSave = Object.assign({}, attempt, { version: VERSION });
      window.localStorage.setItem(PREFIX + quizId, JSON.stringify(toSave));
    } catch (err) {
      // localStorage can be unavailable (private browsing, quota), the quiz
      // still works in-memory for the current page load, it just won't resume.
    }
  };

  TrustLineQuiz.clearAttempt = function (quizId) {
    try {
      window.localStorage.removeItem(PREFIX + quizId);
    } catch (err) {
      // ignore
    }
  };
})();
