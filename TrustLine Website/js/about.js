var cards = document.querySelectorAll(".about-card");
cards.forEach(function(card, i) {
  setTimeout(function() {
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        card.classList.add("visible");
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(card);
  }, i * 100);
});

var responses = {
  unsure: "Honestly, that's where most people start. The basics are enough to make a real difference: recognising phishing emails, using strong passwords, keeping software updated. TrustLine covers all of that and it's a reasonable place to begin.",
  somewhat: "You're already in a decent position. The main thing worth checking is whether you're being consistent. MFA on every account, not just a few, is a common gap. The ISO 27001 page has more practical steps if you want to go further.",
  confident: "Good to hear. That said, even well-prepared teams tend to have blind spots. Access control and incident response are two areas that often look fine until they're actually tested. Worth a look around to make sure the fundamentals are covered."
};

function showConfidenceResponse(level) {
  var box = document.getElementById("confidence-response");
  var btns = document.querySelectorAll(".confidence-btns button");

  btns.forEach(function(btn) {
    btn.classList.remove("selected");
    if (btn.getAttribute("onclick").includes(level)) {
      btn.classList.add("selected");
    }
  });

  box.style.opacity = 0;
  box.textContent = responses[level];

  setTimeout(function() {
    box.style.opacity = 1;
  }, 50);
}

function openPopup() {
  var input = prompt("How many people work at your organisation?");

  if (input === null) return;

  var val = parseInt(input);

  if (isNaN(val) || val < 1) {
    alert("Please enter a valid number above 0.");
    return;
  }

  if (val < 100) {
    window.location.href = "Cyber Awareness.html";
  } else {
    window.location.href = "Policies.html";
  }
}
