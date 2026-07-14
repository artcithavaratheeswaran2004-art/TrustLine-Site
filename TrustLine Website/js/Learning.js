
function openSizePopup() {
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