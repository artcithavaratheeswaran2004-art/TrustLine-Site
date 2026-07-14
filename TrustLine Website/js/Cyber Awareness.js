// Speak a tip out loud using the browser's speech synthesis
function speakTip(btn) {
  if (!window.speechSynthesis) return;

  const text = btn.parentElement.childNodes[0].textContent.trim();

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function initRedFlagHighlights() {
  const flagItems = document.querySelectorAll('.flag-item');
  const explanation = document.getElementById('flagExplanation');

  if (!flagItems.length || !explanation) return;

  flagItems.forEach(function(item) {
    item.addEventListener('click', function() {
      flagItems.forEach(function(flag) {
        flag.classList.remove('selected');
      });

      item.classList.add('selected');
      explanation.textContent = item.getAttribute('data-tip');
    });
  });
}

initRedFlagHighlights();
