let data = {}


data.questionD = 'How DIFFICULT did you find this plan to follow?'
data.marksDifficulty = [
  {
    value: 0,
    label: 'Too Easy',
  },
  {
    value: 25,
    // label: 'Easy but Good',
    label: 'Easy',
  },
  {
    value: 50,
    label: 'Just Right',
  },
  {
    value: 75,
    // label: 'Hard but Good',
    label: 'Hard',
  },
  {
    value: 100,
    label: 'Too Hard',
  },
];
data.questionS = 'How much did you LIKE this plan?'
data.marksSatisfaction = [
  {
    value: 0,
    label: 'Not at all',
  },
  {
    value: 25,
    // label: 'Easy but Good',
    label: 'Not really',
  },
  {
    value: 50,
    label: 'Partly',
  },
  {
    value: 75,
    // label: 'Hard but Good',
    label: 'A lot',
  },
  {
    value: 100,
    label: 'Greatly',
  },
];
data.questionR = 'Would you RECOMMEND this plan to others?'
data.marksRecommendation = [
  {
    value: 0,
    label: 'Definitely not',
  },
  {
    value: 25,
    // label: 'Easy but Good',
    label: 'Probably not',
  },
  {
    value: 50,
    label: 'Maybe',
  },
  {
    value: 75,
    // label: 'Hard but Good',
    label: 'Probably yes',
  },
  {
    value: 100,
    label: 'Definitely yes',
  },
];
// data.questionFuture = 'Do you have the intention to continue using this app?';
data.questionFuture = 'Do you want to continue using this app (to improve your pushups and fitness)?';
data.marksFuture = [
  {
    value: 0,
    label: 'Definitely not',
  },
  {
    value: 25,
    // label: 'Easy but Good',
    label: 'Probably not',
  },
  {
    value: 50,
    label: 'Maybe',
  },
  {
    value: 75,
    // label: 'Hard but Good',
    label: 'Probably yes',
  },
  {
    value: 100,
    label: 'Definitely yes',
  },
];
data.questionFutureSchedule = 'In how many days do you intend to start the next training plan?';
data.marksFutureSchedule = [
  {
    value: 0,
    label: 'Today',
  },
  {
    value: 15,
    label: '...in this many days...',
  },
];
data.questionOtherSportsScale = 'How many HOURS PER WEEK (on average) did you spend doing other sports and physical activities (considering only last 2 weeks)?';
data.marksOtherSportsScale = [
  {
    value: 10,
    label: '...this many hours...',
  }
];
data.questionOurMuscles = 'How many times did you train shoulders/chest/triceps outside of pushup trainings  (considering only last 2 weeks)?';
data.marksOurMuscles = [
  {
    value: 5,
    label: '...this many times...',
  }
];
// data.questionRest = 'For how many days  before the assessment did you rest your chest+triceps+shoulders?';
// data.marksRest = [
//   {
//     value: 0,
//     label: 'Not a single day',
//   },
//   {
//     value: 1,
//     label: '1 day',
//   },
//   {
//     value: 2,
//     label: '2 days',
//   }, {
//     value: 3,
//     label: '3 days',
//   },
//   {
//     value: 4,
//     label: '4 or more days',
//   },
// ];
data.questionRest = 'Did you rest your chest+triceps+shoulders last days before the assessment (Not considering the pushups trainings itself)?';
data.marksRest = [
  {
    value: 0,
    label: 'No',
  },
  {
    value: 1,
    label: 'partly',
  },
  {
    value: 2,
    label: 'Yes',
  }
];
data.questionWarmUp = 'Did you warm up before the assessment?';
data.marksWarmUp = [
  {
    value: 0,
    label: 'No',
  },
  {
    value: 1,
    // label: 'Easy but Good',
    label: 'A  bit (1min)',
  },
  {
    value: 2,
    label: 'Partly (2min)',
  },
  {
    value: 3,
    // label: 'Hard but Good',
    label: 'Yes (3min)',
  },
  {
    value: 4,
    label: 'Thoroughly (4min+)',
  },
];
data.questionHealth = 'Did you have any health issues which could influence your training or assessments?'
data.marksHealth = [
  {
    value: 0,
    label: 'Not at all',
  },
  {
    value: 25,
    // label: 'Easy but Good',
    label: 'A  bit',
  },
  {
    value: 50,
    label: 'Yes',
  },
  {
    value: 75,
    // label: 'Hard but Good',
    label: 'Yes, serious',
  },
  {
    value: 100,
    label: 'Yes, severe',
  },
];
data.questionWork = 'If you are working: How physical is / how much do you move in your work (in last 14 days)?'
data.marksWork = [
  {
    value: 0,
    label: 'Not at all',
  },
  {
    value: 25,
    // label: 'Easy but Good',
    label: 'A bit',
  },
  {
    value: 50,
    label: '50/50',
  },
  {
    value: 75,
    // label: 'Hard but Good',
    label: 'A lot',
  },
  {
    value: 100,
    label: 'All the time',
  },
];
data.questionAge = 'How old are you (approximately)?'
data.marksAge = [];
data.questionFreeTime = 'How physically active were you in your free time last 2 weeks?'
data.marksFreeTime = [
  {
    value: 0,
    label: 'Not at all',
  },
  {
    value: 25,
    // label: 'Easy but Good',
    label: 'A bit',
  },
  {
    value: 50,
    label: '50/50',
  },
  {
    value: 75,
    // label: 'Hard but Good',
    label: 'A lot',
  },
  {
    value: 100,
    label: 'All the time',
  },
];
data.questionCheating = 'Did you cheat on this plan? (This info (as all other) is anonymous, so please be honest. E.g.: Input fake reps/trainings,etc.)'
data.marksCheating = [
  {
    value: 0,
    label: 'Not at all',
  },
  {
    value: 20,
    // label: 'Easy but Good',
    label: 'A bit, by accident',
  },
  {
    value: 40,
    // label: 'Easy but Good',
    label: 'some',
  },
  {
    value: 60,
    label: 'yes',
  },
  {
    value: 80,
    // label: 'Hard but Good',
    label: 'A lot',
  },
  {
    value: 100,
    label: 'All the time',
  },
];
data.genderLabels = [['male'], ['female'], ['other'], ['notSharing', 'Prefer not to say']];

data.formHere = {
  difficulty: null,
  satisfaction: null,
  recommendation: null,
  future: null,
  futureSchedule: null,
  otherSportsScale: null,
  ourMuscles: null,
  otherSports: '',
  restBeforeAssessment: null,
  warmUoBeforeAssessment: null,
  healthIssues: null,
  gender: null,
  updateDB: false,
  lifestyleAtWork: null,
  lifestyleFreeTime: null,
  age: null,
  cheating: null,
  writingBest: '',
  writingWorst: '',
  writingOneThing: '',
  writingComments: '',
  _publishAnonymously:false
}

export default data;