function getMockResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("password")) return "Use at least 12 characters with a mix of uppercase, lowercase, numbers and special characters. Avoid reusing passwords across accounts.";
  if (msg.includes("phishing")) return "Check the sender address carefully, hover over links before clicking and verify any unusual requests through a second channel before acting.";
  if (msg.includes("iso27001") || msg.includes("iso 27001")) return "ISO 27001 is an information security standard that helps organisations manage and protect their data in a structured and consistent way. It focuses on key areas such as access control, risk management and ongoing improvement. This supports organisations in building a clear approach to security rather than relying on ad hoc measures.";
  if (msg.includes("backup")) return"Automated backups should be set up so that important data is regularly saved without relying on manual input. This helps ensure that information can be recovered if anything goes wrong. It is also important to follow a recognised security standard that covers key areas such as access control, risk assessments, data backups and staff awareness. This provides a structured approach to protecting data and supports organisations in managing security more effectively.";
  if (msg.includes("attack")) return "Common attacks against SMEs include phishing, ransomware and credential stuffing. Phishing is the most frequent entry point, accounting for the majority of breaches.";
  if (msg.includes("gdpr")) return "Under GDPR, it is important to understand what personal data your organisation holds and the reasons for collecting it. You also need to be clear on who has access to that information within the business. This data should always be stored securely and only accessed by authorised staff. In addition, there should be a clear process in place for responding to data requests and for reporting any potential breaches if they occur.";
  if (msg.includes("policy") || msg.includes("policies")) return "For an SME, it is important to have a set of core policies in place to guide how security is managed. This usually includes an information security policy, an acceptable use policy, a password policy, an incident response plan and a data protection policy. These documents help set clear expectations for staff and support consistent practices across the organisation. Even if they are simple to begin with, having these policies in place is far better than having none at all.";
  return "Hello. I’m your TrustLine Guide, here to provide clear and practical cybersecurity guidance. You can ask about passwords, phishing, ISO 27001, GDPR, backups or security policies.";
}

function addLine(log, who, text) {
  const div = document.createElement("div");
  const strong = document.createElement("strong");
  strong.textContent = who + ": ";
  div.appendChild(strong);
  div.appendChild(document.createTextNode(text));
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const log = document.getElementById("chat-log");
  if (!input || !log) return;

  const msg = input.value.trim();
  if (!msg) return;

  addLine(log, "You", msg);
  input.value = "";

  const reply = getMockResponse(msg);
  setTimeout(() => addLine(log, "TrustLine Assistant", reply), 600);
}

function toggleChat() {
  const chat = document.getElementById("chat-window");
  const input = document.getElementById("chat-input");
  if (!chat) return;

  const isOpen = chat.classList.toggle("open");
  if (isOpen && input) input.focus();
}

function handleKey(event) {
  if (event.key === "Enter") sendMessage();
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chat-toggle-btn");
  const input = document.getElementById("chat-input");

  if (toggleBtn && !toggleBtn.getAttribute("onclick")) {
    toggleBtn.addEventListener("click", toggleChat);
  }

  if (input && !input.getAttribute("onkeydown")) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") sendMessage();
    });
  }
});
