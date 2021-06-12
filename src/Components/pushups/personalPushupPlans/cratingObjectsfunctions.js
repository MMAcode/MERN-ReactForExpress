const createPersonalSETStarter = (reps,repsAsPercentage, breakAfterInSeconds) => {
  let set = {
    reps,
    repsAsPercentage,
    duration:undefined,
    repsNotes: undefined,
    breakAfterInSeconds,
    breakNotes: undefined
  }
  return set;
}
const createPersonalTRAININGStarter = (name, repsAsPercentage = false, currentMax) => {
  let training;
  if (repsAsPercentage) {
    training = {
      name,
      sets: [createPersonalSETStarter(null,75 ,60,)]
    };
  }
  else {
    training = {
      name,
      sets: [createPersonalSETStarter(20, undefined,60)]
    };
  }
  return training;
}

const createPersonalPLANStarter = (name) => { //just to make mongoose id
  let schedule =[];
  for (let i = 0; i < 14; i++) schedule.push({trainingNumber: i<11 ? 1:0})
  let plan = {  //DUPLICATE CODE IN MONGOOSE SCHEMA!!!!!
    name,
    trainings: [createPersonalTRAININGStarter()],
    schedule,
    //not implemented yet:
    // description: undefined,
    descriptionRich: undefined,
    summary: undefined,
    personal: 'yes-only',
    // planType: - will be assigned only to specific plans with date to this object's ID
  }
  return plan;
}









export {  createPersonalPLANStarter, createPersonalTRAININGStarter, createPersonalSETStarter};