import React from 'react';
import pushupsContext from '../state/PushUpsContextState';
import { withRouter } from 'react-router-dom';
// import CurrentTrainingInfo from './CurrentTrainingInfo';
// import ShowSetToDo from './ShowSetToDo';
import TrainingSwitcher from './TrainingSwitcher';
// import TrainingStopWatch from './TrainingStopWatch';
import TrainingHeaders from './TrainingHeaders';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import { return0IfLastTrainingDoesntExist1IfDateAsToday2IfDifferentDate } from '../functions/basics';
import DayOfFinalAssessment from './DayOfFinalAssessment';


//Training context
export const TrainingContext = React.createContext({});

const setupTrainingContext = (userHere, publicPlanIfNeeded) => {

  //PLAN
  let plan = {}; //template
  //get plan template from id
  if (userHere.pushupPlans.current.personal.includes('yes-only')) {//=personal from current user
    // console.log("PERSONAL");
    plan = userHere.pushupPlans.personal.find(plan => plan._id === userHere.pushupPlans.current.planIDType);
    // console.log("CURRENT PLAN TEMPLATE:", plan);
  } else if (userHere.pushupPlans.current.personal.includes('yes-finished')) {
    //get finished personal training plan 
    plan = userHere.pushupPlans.personalFinished.find(plan => plan._id === userHere.pushupPlans.current.planIDType);
  } else {
    //get public plan
    // plan = userHere.pushupPlans.current; //this should be enough as this contains all the info needed for training, no need to search for plan itself in public plans
    plan = publicPlanIfNeeded;
  }

  //TRAINING
  // const trainingNumberPosition0IsFirstNumber = userHere.pushupPlans.current.trainingToDoNextNumberPositionInSchedulleArrayFrom0;
  const trainingNumberPosition0IsFirstNumber = userHere.pushupPlans.current.scheduleDayToDoFrom0;

  //final ass.dealings
  let finalAssessment = false;
  if (trainingNumberPosition0IsFirstNumber === 13) return { finalAssessment: true };

  // console.log("TR ISUUE: ", plan, trainingNumberPosition0IsFirstNumber);
  let numberOfThisTrainingTemplate = plan.schedule[trainingNumberPosition0IsFirstNumber].trainingNumber;
  if (numberOfThisTrainingTemplate === 0) return 'dayOff';

  let training = plan.trainings[numberOfThisTrainingTemplate - 1]  //template from plan; training 1 is here on position 0.
  // let trExecution;  // trExecution = context.user.pushupPlans.current.trainingHistory[0];

  //SET(s)
  let set = training.sets[0]; //set instructions (not execution)
  let setNumberFrom1 = 1;
  let setsDone = 0;
  // let totalSets = training.sets.length; //total number of sets (to do and done - all together)

 ///// if plan is as % of initial assessment, recalculate % to reps
  let initialAssessmentRepsNumber;
  let currentMAxRepsNumber;
  if (plan.repsAsPercentages) {
    console.log("Plan is in form of reps as PERCENTAGES - reps will be calculated.")
    //get init.ass


    ////initial assessment max reps replaced by current max
    // initialAssessmentRepsNumber = userHere.assessments.find(ass => ass._id == userHere.pushupPlans.current.assessments.initialAssessmentID).reps;
    currentMAxRepsNumber = userHere.assessments[0].reps;
    initialAssessmentRepsNumber = currentMAxRepsNumber;

    // console.log("initialAssessmentRepsNumber: ", initialAssessmentRepsNumber);
    //calc reps for each set in This training.
    training.sets.forEach(set => set.reps = Math.round(set.repsAsPercentage / 100 * initialAssessmentRepsNumber));
  }
  // %$£100 in future for faster load calculate specific reps upon committing to the plan which is Finished or Public, and save these calculations on user's current execution plan. Then when training starts just use those fixed numbers




  /////"continue training" set up (if it exists)
  //if last training execution was today and is unfinished, add this to the package as startedTrainingExecution; else as undefined
  let continueStartedTraining = false;
  let lastTrainingMatch = return0IfLastTrainingDoesntExist1IfDateAsToday2IfDifferentDate(userHere);
  if (lastTrainingMatch === 1
    && userHere.pushupPlans.current.trainingHistory[0].completed != true) {

    continueStartedTraining = true;
    let startedTraining = userHere.pushupPlans.current.trainingHistory[0];
    let numberOfSetsAlreadyDone = userHere.pushupPlans.current.trainingHistory[0].sets.length;
    set = training.sets[numberOfSetsAlreadyDone];
    setNumberFrom1 = numberOfSetsAlreadyDone + 1;
    setsDone = numberOfSetsAlreadyDone;
    // console.log("setting up CONTINUED training: ",userHere, startedTraining, set,'\n', setNumberFrom1,  numberOfSetsAlreadyDone, setsDone);
    //adjust set info
  }




  ////PACKAGE
  let trainingPackage = {
    plan,
    training,
    trainingNumber: numberOfThisTrainingTemplate, //0=day off
    trainingStartedAt: new Date(),
    // trExecution,
    setNumberFrom1,
    set,
    setsDone,
    continueStartedTraining, //true / false
    initialAssessmentRepsNumber // only for saving reps as % to user's execution history
  };

  return { stage: 0, main: trainingPackage };
}




const RunTraining = ({ history }) => {
  let context = React.useContext(pushupsContext);
  const [trainingContextVariable, setTrainingContextVariable] = React.useState(undefined);
  console.log("training CONTEXT: ", trainingContextVariable);
  const [todayIsDayOff, setTodayIsDayOff] = React.useState(false);
  const [userLoading, setUserLoading] = React.useState(true);

  React.useEffect(() => {
    //sort refresh-user loading
    if (!context.user) { return } else setUserLoading(false);

    //set training context
    if (trainingContextVariable === undefined) {
      let publicPlanIfNeeded;
      if (context.user.pushupPlans.current.personal === 'public') publicPlanIfNeeded = context.publicPlans.find(plan => plan._id === context.user.pushupPlans.current.planIDType);
      let trainingContextToUse = setupTrainingContext(context.user, publicPlanIfNeeded);
      if (trainingContextToUse === 'dayOff') setTodayIsDayOff(true);
      setTrainingContextVariable(trainingContextToUse);

    }

    if(trainingContextVariable)console.log("trainingContextVariable: ",trainingContextVariable)
  }, [context]);

  // React.useEffect(() => {
  //   // console.log("TCV (trainingContextVariable) updated. Current: ", trainingContextVariable);

  //   //  // update training context based on the user context...
  //   // if (context.user && trainingContextVariable.main.setsDone > 0) {
  //   // trainingContextVariable.main.trExecution = context.user.pushupPlans.current.trainingHistory[0];
  //   // }
  // }, [trainingContextVariable]);

  //skipping trainings for plans in development
  const skipThisDay = async () => {
    let updatedUser = await postJsonDataUrlAfterAPIpushups('/setTheNextTraining', {});
    history.push('/pushups');
    context.updateUser({ ...updatedUser });
    await new Promise(resolve => setTimeout(resolve, 250));
    history.push('/pushups/startMyTraining');
  }

  if (userLoading) return <p>loading user...</p>
  if (trainingContextVariable.finalAssessment === true) return <DayOfFinalAssessment />

  if (todayIsDayOff) return (
    <div>
      <h3>Today is your day off.</h3>
      <button onClick={skipThisDay}>Skip this day.</button>
    </div>)
  if (trainingContextVariable) return (
    <div>
      <TrainingContext.Provider value={[trainingContextVariable, setTrainingContextVariable]}>
        <TrainingHeaders trainingState={trainingContextVariable} />
        <TrainingSwitcher />
      </TrainingContext.Provider>
    </div>);

  return <h1>Training - Training context is most probably currently undefined; this html shouldn't really appear at all.</h1>
};

export default withRouter(RunTraining);