export default {
  "common": {
    "siteName": "ember-raffle",
    "save": "Save",
    "edit": "Edit",
  },
  "adapter": {
    "localstorageDisabled": "WARNING: localstorage is disabled. Your data will not be persisted.",
  },
  "siteHeader": {
    "raffles": "View All Raffles"
  },
  "raffleList": {
    "emptyState": "Hi! Looks like you're new here.",
    "emptyStateDescription": "This is the dashboard for all your raffles. Why don't you create one?",
    "createCta": "Create a New Raffle",
    "header": "Your Raffles",
    "localstorageReminder": "Did you know? All raffle information is only stored on this computer."
  },
  "raffleInfo": {
    "setup": 'Setup',
    "ready": 'Start the Drawing',
    "completeSetupTooltip": 'Please complete setup to enable this action',
    "completed": {
      "header": "Winners have already been drawn for this raffle!",
    }
  },
  "raffleSetupInfo": {
    'header': "Setup {{raffleName}}",
    'settings': 'Settings',
    'addParticipants': 'Add Participants',
  },
  "raffleSetupSettings": {
    "header": "What're the specifics of this raffle?",
    "nameInput": {
      "label": "Name",
    },
    "winnerNumberInput": {
      "label": "Number of Winners",
      "inlineLabel": {
        "one": "winner",
        "other": "winners"
      }
    }
  },
  "raffleSetupAddParticipants": {
    "header": "Who's participating in this raffle?",
    "participantsInput": {
      "label": "Participants (one per line)"
    }
  },
  "raffleSetupConfirmParticipants": {
    "header": "Is this everyone?"
  },
  "readyForDrawing": {
    "header": "We're all set to draw winners for {{raffleName}}!",
    "meta": {
      "participants": "{{count}} participants",
      "numberOfWinners": {
        "one": "1 winner",
        "other": "{{count}} winners"
      }
    },
    "runDrawingCta": "Let's Go!",
  },
  "winners": {
    "header": {
      "one": "Our WINNER",
      "other": "Our WINNERS"
    }
  },
  "homepageContent": {
    "stripes": {
      "why": {
        "header": "You need to run a raffle.",
        "para": "I made a raffle app. It's even free!"
      },
      "who": {
        "header": "Meet the Author",
        "para": "Learn more about <a href='https://benlimmer.com/about' target='_blank' rel='noopener noreferrer'>Ben Limmer</a>."
      },
      "getStarted": {
        "cta": "Get Started"
      }
    }
  }
};
