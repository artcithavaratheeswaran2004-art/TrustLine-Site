function speakTip(btn) {
  var li = btn.parentElement;
  if (!li) return;
  var tipText = li.querySelector('.tip-text');
  if (!tipText) return;
  var utterance = new SpeechSynthesisUtterance(tipText.textContent.trim());
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function togglePasswordVisibility() {
  var input = document.getElementById('password');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function checkPassword(val) {
  var hasLen     = val.length >= 12; //checks if password is 12 characters long 
  var hasUpper   = /[A-Z]/.test(val);
  var hasLower   = /[a-z]/.test(val);
  var hasNumber  = /[0-9]/.test(val);
  var hasSpecial = /[!@#$%^&*]/.test(val);

//Maps each requirement to its visual indicator
  var reqMap = {
    'req-length':  hasLen,
    'req-upper':   hasUpper,
    'req-lower':   hasLower,
    'req-number':  hasNumber,
    'req-special': hasSpecial
  };
//Update the UI to show which requirements are met
  Object.keys(reqMap).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.toggle('met', reqMap[id]);
  });

  var score = [hasLen, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  var fill  = document.getElementById('strength-meter-fill');
  var text  = document.getElementById('strength-text');

  if (!fill || !text) return;

  if (!val) {
    fill.style.width = '0%';
    fill.style.backgroundColor = '#e5e5e0';
    text.textContent = '';
    text.style.color = '';
    return;
  }

  var levels = [
    { pct: '20%',  color: '#ef4444', label: 'Very Weak' },
    { pct: '40%',  color: '#f97316', label: 'Weak' },
    { pct: '60%',  color: '#eab308', label: 'Moderate' },
    { pct: '80%',  color: '#22c55e', label: 'Strong' },
    { pct: '100%', color: '#4d7af7', label: 'Very Strong' }
  ];

  var l = levels[score - 1] || levels[0];
  fill.style.width = l.pct;    //Adjusts bar width 
  fill.style.backgroundColor = l.color; //Update colour 
  text.textContent = l.label;      //Shows strength label
  text.style.color = l.color;      //Matches text colour
}

function initDailyHabits() {
  var storageKey = 'daily-security-habits';
  var checkboxes = document.querySelectorAll('[data-habit]');
  var progress = document.getElementById('habit-progress');
  var message = document.getElementById('habit-message');

  if (!progress || !message || checkboxes.length === 0) return;

  function updateHabits() {
    var done = 0;

    checkboxes.forEach(function(box) {
      if (box.checked) done++;
    });

    progress.textContent = done + ' / ' + checkboxes.length + ' completed';

    if (done === checkboxes.length) {
      message.textContent = '🎉 Great job! You finished all four daily security habits.';
    } else {
      message.textContent = '';
    }
  }

  function saveHabits() {
    var habits = {};

    checkboxes.forEach(function(box) {
      habits[box.getAttribute('data-habit')] = box.checked;
    });

    localStorage.setItem(storageKey, JSON.stringify(habits));
    updateHabits();
  }

  function loadHabits() {
    var saved = localStorage.getItem(storageKey);

    if (!saved) return;

    try {
      var habits = JSON.parse(saved);
      checkboxes.forEach(function(box) {
        var key = box.getAttribute('data-habit');
        if (habits[key] !== undefined) {
          box.checked = habits[key];
        }
      });
    } catch (e) {
      console.log('Could not load habits');
    }

    updateHabits();
  }

  checkboxes.forEach(function(box) {
    box.addEventListener('change', saveHabits);
  });

  loadHabits();
}

initDailyHabits();
