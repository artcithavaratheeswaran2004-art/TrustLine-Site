function toggleDone(btn) {
  const card = btn.closest('.iso-card');
  card.classList.toggle('done');
  const icon = btn.querySelector('i');
  if (card.classList.contains('done')) {
    icon.classList.replace('fa-regular', 'fa-solid');
  } else {
    icon.classList.replace('fa-solid', 'fa-regular');
  }

  updateProgress();
}

function updateProgress() {
  const cards = document.querySelectorAll('.iso-card');
  const doneCards = document.querySelectorAll('.iso-card.done');
  const progressText = document.getElementById('reviewCount');
  const message = document.getElementById('reviewMessage');

  if (progressText) {
    progressText.textContent = doneCards.length + ' of ' + cards.length + ' controls reviewed';
  }

  if (message) {
    if (doneCards.length === cards.length) {
      message.textContent = "Great work. You've reviewed all core ISO 27001 controls.";
    } else {
      message.textContent = '';
    }
  }
}

document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.iso-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

updateProgress();
