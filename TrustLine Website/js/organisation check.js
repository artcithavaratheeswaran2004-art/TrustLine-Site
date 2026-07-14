(function () {
  function checkOrgSizeAndRedirect() {
    let orgSize = prompt("How many people work in your organisation?");
    if (orgSize === null) return;

    orgSize = parseInt(orgSize, 10);
    if (Number.isNaN(orgSize)) {
      alert("Please enter a valid number.");
      return;
    }

    if (orgSize >= 100) {
      window.location.href = "Policies.html";
    } else {
      window.location.href = "Cyber Awareness.html";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("resources-link");
    const btn = document.getElementById("resources-btn");

    function handle(e) {
      e.preventDefault();
      checkOrgSizeAndRedirect();
    }

    if (link) link.addEventListener("click", handle);
    if (btn) btn.addEventListener("click", handle);
  });
})();
