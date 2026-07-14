window.TRUSTLINE_QUIZZES = window.TRUSTLINE_QUIZZES || {};
window.TRUSTLINE_QUIZZES["cyber-awareness"] = {
  "id": "cyber-awareness",
  "title": "Cyber Awareness Assessment",
  "description": "Everyday security habits: phishing, passwords, MFA, updates, public Wi-Fi and reporting.",
  "estimatedMinutes": 8,
  "passPercentage": 70,
  "randomizeQuestions": true,
  "randomizeOptions": true,
  "backHref": "/cyber-awareness",
  "backLabel": "Back to Reading",
  "nextHref": "/policies",
  "nextLabel": "Let's Go to Policies",
  "topics": [
    { "id": "phishing", "label": "Phishing & Email Security" },
    { "id": "passwords", "label": "Password Hygiene" },
    { "id": "mfa", "label": "Multi-Factor Authentication" },
    { "id": "updates", "label": "Software Updates" },
    { "id": "wifi-devices", "label": "Public Wi-Fi & Devices" },
    { "id": "reporting", "label": "Reporting & Data Handling" }
  ],
  "recommendedModules": {
    "phishing": { "title": "Think Before You Click", "href": "/cyber-awareness#tips" },
    "passwords": { "title": "Better Password Habits", "href": "/quick-tips" },
    "mfa": { "title": "Strengthening Account Security with MFA", "href": "/cyber-awareness#tips" },
    "updates": { "title": "Keeping Systems Up to Date", "href": "/cyber-awareness#tips" },
    "wifi-devices": { "title": "Using Public Wi-Fi Safely", "href": "/cyber-awareness#tips" },
    "reporting": { "title": "Speak Up Early", "href": "/cyber-awareness#tips" }
  },
  "questions": [
    {
      "id": "ca-01",
      "type": "single",
      "topic": "phishing",
      "prompt": "You receive an email from “support@paypa1-login.com” asking you to urgently confirm your account details. What is the clearest red flag?",
      "options": [
        { "id": "a", "text": "The email uses HTML formatting" },
        { "id": "b", "text": "The sender domain is a close imitation of a real, trusted brand" },
        { "id": "c", "text": "The email was sent in the morning" },
        { "id": "d", "text": "The email includes a company logo" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Swapping a letter for a similar character (“paypa1” instead of “paypal”) is a classic domain-spoofing trick designed to slip past a quick glance.",
        "incorrect": {
          "a": "Legitimate business emails use HTML formatting too, it's not a meaningful signal on its own.",
          "c": "Time of day tells you nothing about legitimacy.",
          "d": "Logos are trivial to copy into a fake email, so their presence proves nothing."
        },
        "whyItMatters": "Phishing is the most common way SMEs get compromised. A team that habitually checks the full sender domain, not just the display name, closes off the single biggest entry point attackers use."
      }
    },
    {
      "id": "ca-02",
      "type": "boolean",
      "topic": "phishing",
      "prompt": "True or False: if the display name on an email looks correct, you can trust that the email is genuinely from that person or organisation.",
      "options": [
        { "id": "true", "text": "True" },
        { "id": "false", "text": "False" }
      ],
      "correctOptionIds": ["false"],
      "explanation": {
        "correct": "Display names are just text; anyone can set theirs to say whatever they like. It's the underlying address that has to be checked.",
        "incorrect": {
          "true": "This is the exact assumption phishing relies on. Attackers routinely set a display name to match a trusted contact while the real address is unrelated."
        },
        "whyItMatters": "SMEs without a technical filter layer rely almost entirely on staff judgement at the inbox. Teaching people to check the address, not the name, is a free, high-impact control."
      }
    },
    {
      "id": "ca-03",
      "type": "single",
      "topic": "passwords",
      "prompt": "Which of these makes the strongest and most memorable password?",
      "options": [
        { "id": "a", "text": "Password123" },
        { "id": "b", "text": "TigerGlassMountain" },
        { "id": "c", "text": "yourname1990" },
        { "id": "d", "text": "qwerty!!" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Three unrelated words strung together are long, hard to guess, and easy for a human to actually remember. Length beats complexity for real-world security.",
        "incorrect": {
          "a": "“Password123” is one of the first guesses in any password-cracking wordlist.",
          "c": "Names and birth years are exactly what an attacker will try first after checking public profiles.",
          "d": "Keyboard patterns like “qwerty” are common and predictable, even with extra symbols on the end."
        },
        "whyItMatters": "SMEs rarely have the budget for enterprise-grade authentication tooling, so the strength of a password is often the only line of defence on a given account."
      }
    },
    {
      "id": "ca-04",
      "type": "multiple",
      "topic": "passwords",
      "prompt": "Which of the following are genuine password risks? Select all that apply.",
      "options": [
        { "id": "a", "text": "Reusing the same password across multiple accounts" },
        { "id": "b", "text": "Using a password manager" },
        { "id": "c", "text": "Using a pet's name as a password" },
        { "id": "d", "text": "Writing a password down and keeping it in a locked drawer" }
      ],
      "correctOptionIds": ["a", "c"],
      "explanation": {
        "correct": "Reusing passwords means one breach cascades into every other account that shares it, and a pet's name is easily found on social media and is a common first guess.",
        "incorrect": {
          "b": "A password manager is a recommended practice, not a risk, it removes the temptation to reuse or weaken passwords.",
          "d": "A password physically secured in a locked drawer is a widely accepted fallback for people who struggle to remember complex passwords. It's far safer than reuse or a weak, memorable password."
        },
        "whyItMatters": "This is a common misconception worth correcting directly: SMEs often discourage writing passwords down at all, when the real risk is reuse and predictability, not a physically secured note."
      }
    },
    {
      "id": "ca-05",
      "type": "single",
      "topic": "mfa",
      "prompt": "Why does MFA meaningfully reduce account takeover risk, even if a password is stolen?",
      "options": [
        { "id": "a", "text": "It makes the password itself longer" },
        { "id": "b", "text": "It requires a second, independent factor the attacker is unlikely to also possess" },
        { "id": "c", "text": "It automatically changes the password every day" },
        { "id": "d", "text": "It blocks all access to email accounts" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "MFA works by requiring something the attacker doesn't have alongside the password (usually a device or app), so a stolen password alone isn't enough to get in.",
        "incorrect": {
          "a": "MFA is unrelated to password length.",
          "c": "MFA doesn't rotate passwords automatically.",
          "d": "MFA protects an account; it doesn't block access outright."
        },
        "whyItMatters": "Credential theft happens constantly through phishing and breached databases. MFA is one of the highest-impact, lowest-cost controls an SME can turn on today."
      }
    },
    {
      "id": "ca-06",
      "type": "scenario",
      "topic": "mfa",
      "scenario": "You receive an MFA approval prompt on your phone that you did not request or expect.",
      "prompt": "What should you do?",
      "options": [
        { "id": "a", "text": "Approve it, your phone confirms it's really you" },
        { "id": "b", "text": "Deny it, change the account password, and report it" },
        { "id": "c", "text": "Ignore it and let it expire on its own" },
        { "id": "d", "text": "Forward the notification to IT without changing anything" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "An unexpected prompt almost always means someone else already has your password and is trying to complete the login. Denying it, changing the password, and reporting it closes the attempt and alerts the team to a live issue.",
        "incorrect": {
          "a": "Approving it hands the attacker access. The prompt appearing on your phone doesn't mean you requested it.",
          "c": "Ignoring it does nothing to stop the attacker from trying again, and doesn't fix the underlying compromised password.",
          "d": "Forwarding without acting first leaves the account exposed while you wait for a reply."
        },
        "whyItMatters": "An unexpected MFA prompt is one of the clearest early-warning signs of a credential compromise. Treating it as a real incident, not a glitch, is what stops it becoming a bigger one."
      }
    },
    {
      "id": "ca-07",
      "type": "single",
      "topic": "updates",
      "prompt": "What is the main security reason to install software updates promptly?",
      "options": [
        { "id": "a", "text": "Updates always add new features" },
        { "id": "b", "text": "Updates often patch vulnerabilities that attackers already know about" },
        { "id": "c", "text": "Updates make devices run faster" },
        { "id": "d", "text": "Updates are a legal requirement for all businesses" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Many updates exist specifically to close security holes that are already public knowledge. Delaying the update leaves that door open.",
        "incorrect": {
          "a": "Some updates add features, but that's not the security-relevant reason to install them promptly.",
          "c": "Performance improvements are a side benefit at best, not the driver.",
          "d": "There's no blanket legal requirement to update software on this basis."
        },
        "whyItMatters": "Unpatched software is one of the easiest ways into a small business's systems, precisely because the fix already exists and simply hasn't been applied."
      }
    },
    {
      "id": "ca-08",
      "type": "single",
      "topic": "wifi-devices",
      "prompt": "You need to access a work file while at a café using public Wi-Fi. What is the safest approach?",
      "options": [
        { "id": "a", "text": "Connect directly, most café networks are safe" },
        { "id": "b", "text": "Use your company VPN before accessing anything sensitive" },
        { "id": "c", "text": "Use the café's guest network without a password" },
        { "id": "d", "text": "Ask a staff member if the network is trustworthy" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "A VPN encrypts your connection regardless of how trustworthy the underlying network is, which is the point: you can't verify a public network's security from the outside.",
        "incorrect": {
          "a": "Public networks are convenient, not inherently safe. Traffic on them can potentially be intercepted.",
          "c": "An open, unpassworded network offers no protection at all.",
          "d": "Staff can't meaningfully vouch for the technical security of their own network."
        },
        "whyItMatters": "Remote and hybrid working means SME staff regularly connect from unmanaged networks. A VPN is the practical control that makes this safe rather than risky."
      }
    },
    {
      "id": "ca-09",
      "type": "boolean",
      "topic": "wifi-devices",
      "prompt": "True or False: personal devices should be trusted with the same level of sensitive company data as company-issued devices.",
      "options": [
        { "id": "true", "text": "True" },
        { "id": "false", "text": "False" }
      ],
      "correctOptionIds": ["false"],
      "explanation": {
        "correct": "Personal devices aren't held to the same security standard. They may lack encryption, updates, or endpoint protection that company devices are configured with.",
        "incorrect": {
          "true": "This overlooks the real difference in how personal devices are configured, updated and secured compared with managed company equipment."
        },
        "whyItMatters": "BYOD is common at SMEs that can't issue a device to everyone, so it needs its own explicit rules rather than an assumption that “it's still my work, so it's fine.”"
      }
    },
    {
      "id": "ca-10",
      "type": "single",
      "topic": "reporting",
      "prompt": "An employee notices a strange pop-up but isn't sure if it's serious. What is the best action?",
      "options": [
        { "id": "a", "text": "Ignore it since they aren't certain it's a problem" },
        { "id": "b", "text": "Report it anyway, even if unsure" },
        { "id": "c", "text": "Restart the computer and say nothing" },
        { "id": "d", "text": "Post about it on social media to ask for opinions" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "The sooner something gets flagged, the easier it is to contain. Reporting doesn't require certainty, just suspicion.",
        "incorrect": {
          "a": "Waiting for certainty is exactly how small issues turn into bigger ones.",
          "c": "Restarting may hide symptoms without addressing an underlying compromise, and losing that information helps no one.",
          "d": "Social media is public and unrelated to the organisation's actual incident process."
        },
        "whyItMatters": "Most SMEs don't have a 24/7 security team, so early, low-confidence reporting from staff is often the only realistic early-warning system available."
      }
    },
    {
      "id": "ca-11",
      "type": "single",
      "topic": "reporting",
      "prompt": "Before sending an email with a sensitive attachment, what is the most important habit to check?",
      "options": [
        { "id": "a", "text": "The file size" },
        { "id": "b", "text": "That the recipient in the “To” field is actually correct" },
        { "id": "c", "text": "The spelling in the subject line" },
        { "id": "d", "text": "The time of day it's being sent" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Autocomplete gets recipients wrong more often than people expect. Double-checking the actual address before sending catches this before it becomes a data leak.",
        "incorrect": {
          "a": "File size has no bearing on who receives it.",
          "c": "Subject line spelling is irrelevant to who the data goes to.",
          "d": "Send time doesn't affect data protection."
        },
        "whyItMatters": "Misdirected emails are one of the most common ways SMEs accidentally expose personal or confidential data, and it's entirely preventable with one habit."
      }
    },
    {
      "id": "ca-12",
      "type": "scenario",
      "topic": "phishing",
      "scenario": "A colleague clicked a link in a suspicious-looking email before realising it seemed off, but nothing obviously bad has happened since.",
      "prompt": "What should they do immediately afterwards?",
      "options": [
        { "id": "a", "text": "Say nothing since no harm seems to have happened" },
        { "id": "b", "text": "Report it straight away so it can be looked into and contained early" },
        { "id": "c", "text": "Wait a few days to see if anything goes wrong first" },
        { "id": "d", "text": "Delete the email from their history so there's no record of it" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Compromise isn't always immediately visible. Reporting straight away lets IT check for signs of an issue while it's still easy to contain.",
        "incorrect": {
          "a": "Absence of obvious symptoms doesn't mean nothing happened; some compromises are designed to be silent.",
          "c": "Waiting gives any potential issue more time to spread before anyone is looking for it.",
          "d": "Deleting the evidence makes it harder to investigate, not easier, and doesn't undo any damage already done."
        },
        "whyItMatters": "A culture where people feel safe reporting a mistake immediately, without fear of blame, is one of the most effective incident-response controls an SME can build, far more effective than any single technical tool."
      }
    }
  ]
}
;
