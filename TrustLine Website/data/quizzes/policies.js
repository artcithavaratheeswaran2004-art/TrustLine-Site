window.TRUSTLINE_QUIZZES = window.TRUSTLINE_QUIZZES || {};
window.TRUSTLINE_QUIZZES["policies"] = {
  "id": "policies",
  "title": "Security Policies Assessment",
  "description": "Core SME policies: information security, access control, email and phishing, acceptable use, data protection and incident response.",
  "estimatedMinutes": 9,
  "passPercentage": 70,
  "randomizeQuestions": true,
  "randomizeOptions": true,
  "backHref": "/policies",
  "backLabel": "Back to Policies",
  "nextHref": "/iso27001",
  "nextLabel": "Let's Go to ISO 27001",
  "topics": [
    { "id": "information-security-policy", "label": "Information Security Policy" },
    { "id": "password-access-policy", "label": "Password & Access Control" },
    { "id": "email-phishing-policy", "label": "Email & Phishing Awareness" },
    { "id": "acceptable-use-policy", "label": "Acceptable Use" },
    { "id": "data-protection-policy", "label": "Data Protection & Privacy" },
    { "id": "incident-response-policy", "label": "Incident Response" }
  ],
  "recommendedModules": {
    "information-security-policy": { "title": "Information Security Policy", "href": "/policies" },
    "password-access-policy": { "title": "Password and Access Control Policy", "href": "/policies" },
    "email-phishing-policy": { "title": "Email and Phishing Awareness Policy", "href": "/policies" },
    "acceptable-use-policy": { "title": "Acceptable Use Policy", "href": "/policies" },
    "data-protection-policy": { "title": "Data Protection and Privacy Policy", "href": "/policies" },
    "incident-response-policy": { "title": "Incident Response Policy", "href": "/policies" }
  },
  "questions": [
    {
      "id": "pol-01",
      "type": "single",
      "topic": "information-security-policy",
      "prompt": "What is the main purpose of an Information Security Policy?",
      "options": [
        { "id": "a", "text": "To list every software licence the company owns" },
        { "id": "b", "text": "To set out the organisation's overall approach to security and who is responsible for it" },
        { "id": "c", "text": "To replace the need for any other policy" },
        { "id": "d", "text": "To satisfy a one-off legal requirement with no ongoing relevance" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "It's the top-level document: the key commitments and who owns security decisions, without needing to cover every detail.",
        "incorrect": {
          "a": "That's closer to an asset register, not this policy's purpose.",
          "c": "It sets the tone for other policies; it doesn't replace them.",
          "d": "It should be reviewed periodically, not treated as a one-time exercise."
        },
        "whyItMatters": "This policy sets the tone for everything else an SME does on security. Starting here gives every other policy a clear frame of reference."
      }
    },
    {
      "id": "pol-02",
      "type": "single",
      "topic": "password-access-policy",
      "prompt": "According to good practice, when should a former employee's system access be revoked?",
      "options": [
        { "id": "a", "text": "Within a month of them leaving" },
        { "id": "b", "text": "The same day they leave" },
        { "id": "c", "text": "Only if they specifically ask for it to be removed" },
        { "id": "d", "text": "It doesn't need to be revoked if they left on good terms" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Access should be removed the same day someone leaves. This is just as important as setting access up correctly in the first place.",
        "incorrect": {
          "a": "A month-long gap leaves a real, unnecessary window of exposure.",
          "c": "Access removal shouldn't depend on the departing person's request.",
          "d": "How amicably someone left has no bearing on the security risk of leftover access."
        },
        "whyItMatters": "Leftover access for former staff is one of the most preventable and most commonly overlooked security gaps at small organisations."
      }
    },
    {
      "id": "pol-03",
      "type": "multiple",
      "topic": "password-access-policy",
      "prompt": "Which elements would you expect in a Password and Access Control Policy? Select all that apply.",
      "options": [
        { "id": "a", "text": "Minimum password requirements" },
        { "id": "b", "text": "MFA expectations for important accounts" },
        { "id": "c", "text": "A list of every customer's personal address" },
        { "id": "d", "text": "Access granted based on role, not by default" }
      ],
      "correctOptionIds": ["a", "b", "d"],
      "explanation": {
        "correct": "Password rules, MFA expectations, and role-based access are the practical core of this policy.",
        "incorrect": {
          "c": "Customer address data belongs in data-handling records, not an access control policy."
        },
        "whyItMatters": "Getting access control right is one of the more straightforward wins available to an SME. It prevents a lot of problems before they start."
      }
    },
    {
      "id": "pol-04",
      "type": "single",
      "topic": "email-phishing-policy",
      "prompt": "Why is phishing awareness typically the centrepiece of an Email and Phishing Awareness Policy?",
      "options": [
        { "id": "a", "text": "Phishing is rare compared with other attack types" },
        { "id": "b", "text": "Phishing remains the most common way organisations are compromised" },
        { "id": "c", "text": "Email policies are mainly about storage limits" },
        { "id": "d", "text": "It only matters for large enterprises" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Phishing is still the most common entry point for a compromise, by a significant margin, so a concrete policy on it has an outsized impact.",
        "incorrect": {
          "a": "The opposite is true, it's extremely common.",
          "c": "Storage limits are unrelated to the security purpose of this policy.",
          "d": "SMEs are frequent phishing targets precisely because they often have fewer technical defences."
        },
        "whyItMatters": "This policy gives staff something concrete to refer to, rather than just “be careful” and hope for the best."
      }
    },
    {
      "id": "pol-05",
      "type": "boolean",
      "topic": "email-phishing-policy",
      "prompt": "True or False: sharing a password with a colleague over chat is an acceptable shortcut if it saves time.",
      "options": [
        { "id": "true", "text": "True" },
        { "id": "false", "text": "False" }
      ],
      "correctOptionIds": ["false"],
      "explanation": {
        "correct": "Passwords shared over chat can be intercepted, forwarded, or left visible in message history. There's always a safer alternative, such as a password manager's sharing feature.",
        "incorrect": {
          "true": "Convenience doesn't offset the risk here. This is one of the more explicit things an Email and Phishing Policy should rule out."
        },
        "whyItMatters": "Small, everyday shortcuts like this are exactly what a written policy is meant to prevent, since “just this once” tends to become a habit."
      }
    },
    {
      "id": "pol-06",
      "type": "single",
      "topic": "acceptable-use-policy",
      "prompt": "What is the primary value of an Acceptable Use Policy?",
      "options": [
        { "id": "a", "text": "It is mainly useful as a disciplinary tool after something goes wrong" },
        { "id": "b", "text": "It sets clear expectations for staff before anything goes wrong" },
        { "id": "c", "text": "It replaces the need for any technical security controls" },
        { "id": "d", "text": "It only applies to company-owned devices" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Its real value is preventative: making expectations clear up front, rather than only mattering once there's already a problem.",
        "incorrect": {
          "a": "It's less useful as an after-the-fact disciplinary tool than as an upfront expectation-setter.",
          "c": "It complements technical controls; it doesn't replace them.",
          "d": "A well-written AUP also covers personal devices used for work (BYOD)."
        },
        "whyItMatters": "Clear expectations set early reduce the number of avoidable mistakes staff make simply because nobody told them the rule existed."
      }
    },
    {
      "id": "pol-07",
      "type": "scenario",
      "topic": "acceptable-use-policy",
      "scenario": "A staff member wants to use a personal laptop to finish some work over the weekend.",
      "prompt": "What does a typical BYOD-aware Acceptable Use Policy expect in this situation?",
      "options": [
        { "id": "a", "text": "Personal devices are automatically as secure as company devices, so no restriction is needed" },
        { "id": "b", "text": "Personal device use for work should follow the same care and restrictions the policy sets out, since personal devices aren't held to the same standard" },
        { "id": "c", "text": "Personal devices should never be allowed under any circumstance" },
        { "id": "d", "text": "It's entirely up to the individual, with no policy guidance at all" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "The policy should explicitly extend to BYOD scenarios, since personal devices are genuinely less secure by default and the same care still needs to apply.",
        "incorrect": {
          "a": "This is the incorrect assumption the policy exists to correct.",
          "c": "An outright ban is often impractical for smaller teams, sensible guidance is more realistic than prohibition.",
          "d": "Leaving it fully to individual judgement is exactly what a policy is meant to avoid."
        },
        "whyItMatters": "BYOD is extremely common at SMEs that can't issue devices to everyone. A policy that ignores it leaves a real, foreseeable gap."
      }
    },
    {
      "id": "pol-08",
      "type": "single",
      "topic": "data-protection-policy",
      "prompt": "Under UK GDPR-aligned practice, what should an organisation be able to clearly state about personal data it holds?",
      "options": [
        { "id": "a", "text": "Only how much storage it uses" },
        { "id": "b", "text": "The lawful basis for collecting it and who can access it internally" },
        { "id": "c", "text": "The brand of software used to store it" },
        { "id": "d", "text": "Nothing specific, as long as it's stored somewhere" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "Knowing the lawful basis for holding data, and who has access to it, is the foundation UK GDPR-aligned practice is built on.",
        "incorrect": {
          "a": "Storage volume has nothing to do with lawful basis or access control.",
          "c": "The software brand is irrelevant to compliance obligations.",
          "d": "This is precisely the gap a Data Protection Policy is meant to close."
        },
        "whyItMatters": "UK GDPR applies to most UK businesses whether they realise it or not. Being able to answer this clearly is often the first thing asked in an audit or a client's due-diligence questionnaire."
      }
    },
    {
      "id": "pol-09",
      "type": "single",
      "topic": "data-protection-policy",
      "prompt": "What should a Data Protection Policy define regarding a suspected breach?",
      "options": [
        { "id": "a", "text": "That it should only ever be discussed internally and never escalated" },
        { "id": "b", "text": "Clear steps to take if a breach is suspected" },
        { "id": "c", "text": "That detecting issues is solely the customer's responsibility" },
        { "id": "d", "text": "Nothing specific, since each case is unique" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "A defined set of steps for a suspected breach means the organisation doesn't have to work out its response from scratch under pressure.",
        "incorrect": {
          "a": "Some breaches have legal reporting obligations, so “internal only” is the wrong default.",
          "c": "Detection responsibility sits with the organisation, not its customers.",
          "d": "Even a general-purpose set of steps is better than none. “Every case is unique” isn't a reason to have no plan."
        },
        "whyItMatters": "How a breach is handled in the first hour often matters as much as the breach itself. A policy exists so that response doesn't depend on who happens to notice it first."
      }
    },
    {
      "id": "pol-10",
      "type": "single",
      "topic": "incident-response-policy",
      "prompt": "What is the main value of even a basic one-page Incident Response Policy?",
      "options": [
        { "id": "a", "text": "It guarantees no incidents will ever occur" },
        { "id": "b", "text": "It stops people freezing up or making things worse when something goes wrong" },
        { "id": "c", "text": "It is only useful for insurance paperwork" },
        { "id": "d", "text": "It removes the need to report incidents to anyone" }
      ],
      "correctOptionIds": ["b"],
      "explanation": {
        "correct": "The real value is behavioural: people already know roughly what to do, rather than working it out for the first time under pressure.",
        "incorrect": {
          "a": "No policy can prevent incidents outright, it shapes the response, not the occurrence.",
          "c": "Insurance is one use case, not the primary value.",
          "d": "A good policy usually clarifies reporting obligations, not removes them."
        },
        "whyItMatters": "It doesn't need to cover every scenario, just enough that nobody has to improvise a response from zero in the moment."
      }
    },
    {
      "id": "pol-11",
      "type": "multiple",
      "topic": "incident-response-policy",
      "prompt": "Which elements should a basic Incident Response Policy define? Select all that apply.",
      "options": [
        { "id": "a", "text": "What counts as a reportable incident" },
        { "id": "b", "text": "Who to contact and within what timeframe" },
        { "id": "c", "text": "The exact software licence keys used company-wide" },
        { "id": "d", "text": "Immediate steps to contain the problem" }
      ],
      "correctOptionIds": ["a", "b", "d"],
      "explanation": {
        "correct": "Defining what counts as reportable, who to contact, and immediate containment steps covers the practical essentials.",
        "incorrect": {
          "c": "Licence keys belong in an asset register, not an incident response policy."
        },
        "whyItMatters": "These are the exact pieces of information people scramble to work out mid-incident if they aren't already written down."
      }
    },
    {
      "id": "pol-12",
      "type": "boolean",
      "topic": "information-security-policy",
      "prompt": "True or False: documented policies are one of the first things auditors and clients typically ask to see.",
      "options": [
        { "id": "true", "text": "True" },
        { "id": "false", "text": "False" }
      ],
      "correctOptionIds": ["true"],
      "explanation": {
        "correct": "Written, maintained policies are often the first evidence an auditor or client due-diligence process asks for. Even a small, well-kept set goes a long way.",
        "incorrect": {
          "false": "In practice, documentation is usually one of the very first things requested, precisely because it's easy to verify and hard to fake."
        },
        "whyItMatters": "For an SME chasing a larger client or a certification, having even basic documented policies in place can be the difference between passing an initial screening and being ruled out early."
      }
    }
  ]
}
;
