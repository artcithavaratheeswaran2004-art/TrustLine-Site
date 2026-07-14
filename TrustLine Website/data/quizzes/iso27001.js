window.TRUSTLINE_QUIZZES = window.TRUSTLINE_QUIZZES || {};
window.TRUSTLINE_QUIZZES["iso27001"] = {
  "id": "iso27001",
  "title": "ISO 27001 Assessment",
  "description": "Core controls for SMEs: access control, asset management, risk assessment, training, incident management and backups.",
  "estimatedMinutes": 9,
  "passPercentage": 70,
  "randomizeQuestions": true,
  "randomizeOptions": true,
  "backHref": "/iso27001",
  "backLabel": "Back to Reading",
  "nextHref": "/quick-tips",
  "nextLabel": "Let's Go to Quick Tips",
  "topics": [
    { "id": "access-control", "label": "Access Control" },
    { "id": "asset-management", "label": "Asset Management" },
    { "id": "risk-assessment", "label": "Risk Assessment" },
    { "id": "awareness-training", "label": "Awareness & Training" },
    { "id": "incident-management", "label": "Incident Management" },
    { "id": "backups", "label": "Backups & Continuity" }
  ],
  "recommendedModules": {
    "access-control": { "title": "Access Control", "href": "/iso27001#controls" },
    "asset-management": { "title": "Asset Management", "href": "/iso27001#controls" },
    "risk-assessment": { "title": "Risk Assessment", "href": "/iso27001#controls" },
    "awareness-training": { "title": "Awareness and Training", "href": "/iso27001#controls" },
    "incident-management": { "title": "Incident Management", "href": "/iso27001#controls" },
    "backups": { "title": "Backups and Continuity", "href": "/iso27001#controls" }
  },
  "questions": [
    {
      "id": "iso-01",
      "type": "single",
      "topic": "access-control",
      "prompt": "What is the primary purpose of access control within ISO 27001?",
      "options": [
        { "id": "a", "text": "To slow down staff logins for security theatre" },
        { "id": "b", "text": "To make sure only the right people can reach the right systems" },
        { "id": "c", "text": "To track staff working hours" },
        { "id": "d", "text": "To reduce the number of IT licences needed" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Access control exists to match system and data access to what a person actually needs for their role, nothing more.",
        "incorrect": {
          "a": "Access control isn't about friction for its own sake.",
          "c": "Time tracking is unrelated to access control.",
          "d": "Licence count is a cost consideration, not the security purpose."
        },
        "whyItMatters": "Auditors check access control almost every time, and it's one of the most commonly misconfigured areas in practice. Getting it right prevents a large share of avoidable incidents."
      }
    },
    {
      "id": "iso-02",
      "type": "multiple",
      "topic": "access-control",
      "prompt": "Which of the following are core access control practices? Select all that apply.",
      "options": [
        { "id": "a", "text": "Enabling MFA on important accounts" },
        { "id": "b", "text": "Giving all staff full admin rights for convenience" },
        { "id": "c", "text": "Removing access as soon as someone leaves or changes role" },
        { "id": "d", "text": "Granting access based on role and actual need" }
      ],
      "correctOptionIds": ["a", "c", "d"],
      "explanation": {
        "correct": "MFA, prompt de-provisioning, and role-based access are the practical backbone of access control for a small organisation.",
        "incorrect": {
          "b": "Blanket admin rights is the opposite of least-privilege access and significantly increases the impact of any single compromised account."
        },
        "whyItMatters": "This is exactly the kind of shortcut small teams take under time pressure, and it's the one that turns a single phishing click into a full system compromise."
      }
    },
    {
      "id": "iso-03",
      "type": "single",
      "topic": "asset-management",
      "prompt": "Why does asset management matter for a small organisation?",
      "options": [
        { "id": "a", "text": "It's required to buy business insurance" },
        { "id": "b", "text": "You can't really protect what you don't know exists" },
        { "id": "c", "text": "It reduces the number of devices staff need" },
        { "id": "d", "text": "It replaces the need for backups" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "A clear picture of what devices, data and systems exist is the foundation everything else (access control, risk assessment, incident response) is built on.",
        "incorrect": {
          "a": "Insurers may ask about it, but that's not the underlying reason it matters.",
          "c": "Asset management tracks devices; it doesn't reduce how many are needed.",
          "d": "Asset management and backups are separate, complementary controls."
        },
        "whyItMatters": "It's easy to assume you know what's in your organisation until you try to write it down. Asset management turns that assumption into a fact."
      }
    },
    {
      "id": "iso-04",
      "type": "boolean",
      "topic": "asset-management",
      "prompt": "True or False: a simple spreadsheet listing devices, owners and classification is an acceptable starting point for asset management in a small organisation.",
      "options": [
        { "id": "true", "text": "True" },
        { "id": "false", "text": "False" }
      ],
      "correctOptionIds": ["true"],
      "explanation": {
        "correct": "A basic spreadsheet is a perfectly reasonable starting point, the goal is having a clear record at all, not a sophisticated system on day one.",
        "incorrect": {
          "false": "Overcomplicating the starting point is a common reason SMEs never begin asset management at all. Simple and maintained beats elaborate and abandoned."
        },
        "whyItMatters": "Setting an achievable bar matters: an SME that starts with a spreadsheet and keeps it updated is in a far stronger position than one waiting for a “proper” tool it never gets around to buying."
      }
    },
    {
      "id": "iso-05",
      "type": "single",
      "topic": "risk-assessment",
      "prompt": "In a basic SME risk assessment, what two factors are typically scored for each risk?",
      "options": [
        { "id": "a", "text": "Cost and time to fix" },
        { "id": "b", "text": "Likelihood and impact" },
        { "id": "c", "text": "Department and staff age" },
        { "id": "d", "text": "Popularity and visibility" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "A simple likelihood-versus-impact grid is enough to prioritise which risks need attention first, without needing a formal enterprise framework.",
        "incorrect": {
          "a": "Cost and time matter for planning a fix, but they aren't what a risk score itself is built from.",
          "c": "Neither factor is relevant to how risky something is.",
          "d": "Popularity and visibility have no bearing on actual risk."
        },
        "whyItMatters": "This two-factor approach is deliberately simple so that a small business owner, not a security consultant, can realistically run it themselves."
      }
    },
    {
      "id": "iso-06",
      "type": "scenario",
      "topic": "risk-assessment",
      "scenario": "Your risk register lists “accidental data loss from a lost laptop” as likely and high impact.",
      "prompt": "Which treatment approach directly reduces this specific risk?",
      "options": [
        { "id": "a", "text": "Ignore it since laptops are replaceable" },
        { "id": "b", "text": "Enable full-disk encryption and remote-wipe capability" },
        { "id": "c", "text": "Increase the general IT budget" },
        { "id": "d", "text": "Remove all laptops from staff" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Encryption and remote wipe address the actual exposure (the data on the device) rather than the hardware cost of replacing it.",
        "incorrect": {
          "a": "The laptop's replacement cost isn't the risk; the data it holds is.",
          "c": "A bigger budget doesn't target this specific, identified risk.",
          "d": "Removing laptops entirely is disproportionate and impractical for most roles."
        },
        "whyItMatters": "Risk treatment should map directly to what's actually at risk (data, in this case) rather than a generic response, which is what makes a risk register genuinely useful rather than a box-ticking exercise."
      }
    },
    {
      "id": "iso-07",
      "type": "single",
      "topic": "awareness-training",
      "prompt": "What is the main reason most security incidents trace back to people rather than technology?",
      "options": [
        { "id": "a", "text": "People are careless by nature" },
        { "id": "b", "text": "Staff often don't realise they've done something risky, and untrained habits are the default" },
        { "id": "c", "text": "Training is a legal requirement" },
        { "id": "d", "text": "Technology is inherently insecure" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Without training, people default to convenient habits rather than secure ones, not out of carelessness, but because they were never shown the alternative.",
        "incorrect": {
          "a": "Framing it as carelessness misses the real, fixable cause: lack of awareness.",
          "c": "Legal requirement isn't the underlying mechanism behind why incidents happen.",
          "d": "Technology is a factor, but human decisions are the more common root cause."
        },
        "whyItMatters": "This reframing matters practically: it points to training as the highest-leverage fix, rather than blaming individuals after the fact."
      }
    },
    {
      "id": "iso-08",
      "type": "single",
      "topic": "awareness-training",
      "prompt": "Which approach to staff security policies tends to work best in practice?",
      "options": [
        { "id": "a", "text": "Long, highly detailed documents covering every possible scenario" },
        { "id": "b", "text": "Short, clear policies that people will actually read" },
        { "id": "c", "text": "No written policy, just verbal reminders" },
        { "id": "d", "text": "A separate policy for every individual software tool used" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "A policy only works if people actually read and remember it. Keeping it short and clear is what makes that realistic.",
        "incorrect": {
          "a": "Nobody reads a ten-page document in practice, however thorough it is on paper.",
          "c": "Verbal-only guidance isn't consistent or auditable.",
          "d": "Fragmenting policy by tool creates unnecessary overhead without adding clarity."
        },
        "whyItMatters": "For a small team without a dedicated compliance function, a policy nobody reads provides no real protection at all. Brevity is a security feature, not a compromise."
      }
    },
    {
      "id": "iso-09",
      "type": "single",
      "topic": "incident-management",
      "prompt": "Why should even “near-miss” events be logged, not just confirmed incidents?",
      "options": [
        { "id": "a", "text": "It looks good for compliance paperwork only" },
        { "id": "b", "text": "Patterns in near-misses often reveal a bigger issue before it becomes a real incident" },
        { "id": "c", "text": "Near-misses must legally be reported to customers" },
        { "id": "d", "text": "They don't need to be logged at all" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "A cluster of near-misses is often the earliest visible sign of a developing problem. Logging them is what makes that pattern visible at all.",
        "incorrect": {
          "a": "Treating it as paperwork misses the actual operational value.",
          "c": "There's no blanket requirement to report near-misses externally.",
          "d": "Not logging them throws away exactly the early-warning signal that makes them useful."
        },
        "whyItMatters": "SMEs rarely have dedicated monitoring tools, so staff-reported near-misses are often the only detection mechanism available. Logging them turns individual observations into an early-warning system."
      }
    },
    {
      "id": "iso-10",
      "type": "boolean",
      "topic": "incident-management",
      "prompt": "True or False: staff should always find a manager before they're allowed to raise a security incident.",
      "options": [
        { "id": "true", "text": "True" },
        { "id": "false", "text": "False" }
      ],
      "correctOptionIds": ["false"],
      "explanation": {
        "correct": "Staff should be able to raise an incident directly, without needing to track down a manager first. Friction at this step slows down containment.",
        "incorrect": {
          "true": "Requiring a manager first adds delay at exactly the moment speed matters most."
        },
        "whyItMatters": "The faster an incident can be raised, the smaller its eventual impact tends to be. Removing unnecessary steps in the reporting path is a real control, not just a process nicety."
      }
    },
    {
      "id": "iso-11",
      "type": "single",
      "topic": "backups",
      "prompt": "What is the key weakness in an organisation that has backups but has never tested a restore?",
      "options": [
        { "id": "a", "text": "Backups take up too much storage space" },
        { "id": "b", "text": "They don't actually know whether their backups would work if needed" },
        { "id": "c", "text": "Backups are usually too expensive to maintain" },
        { "id": "d", "text": "Backups slow down daily operations" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "A backup that has never been restored is an assumption, not a guarantee. Plenty of organisations only discover a broken backup during an actual emergency.",
        "incorrect": {
          "a": "Storage cost is a separate, secondary concern.",
          "c": "Cost doesn't relate to whether the backup actually works.",
          "d": "Well-configured backups shouldn't meaningfully disrupt daily operations."
        },
        "whyItMatters": "Backups are only as good as the last time they were proven to work. This is one of the most common and most damaging blind spots for SMEs."
      }
    },
    {
      "id": "iso-12",
      "type": "multiple",
      "topic": "backups",
      "prompt": "Which of these are recommended backup practices? Select all that apply.",
      "options": [
        { "id": "a", "text": "Automating backups rather than relying on manual steps" },
        { "id": "b", "text": "Keeping every backup on the same physical drive as the original data" },
        { "id": "c", "text": "Keeping at least one copy offsite or in a separate account" },
        { "id": "d", "text": "Periodically testing that a restore actually works" }
      ],
      "correctOptionIds": ["a", "c", "d"],
      "explanation": {
        "correct": "Automation removes reliance on someone remembering to do it, an offsite/separate copy protects against a single point of failure, and testing confirms the backup would actually work in a real recovery.",
        "incorrect": {
          "b": "Storing the only backup alongside the original data means a single incident (fire, theft, ransomware) can destroy both at once."
        },
        "whyItMatters": "These three practices together are what separate “we have backups” from “we could actually recover”. The gap between them is where many SMEs get caught out."
      }
    }
  ]
}
;
