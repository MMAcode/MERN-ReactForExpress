import React from 'react';
import PlanContext from './ContextDefaults';
import MaxRepsUsedForRepsPercentages from './repsAsPercentages/MaxRepsUsedForRepsPercentages';

//get current max
const getCurrentMaxReps = (user) => { //.reps; .type: 'initialAssessment'; 'latestMaxReps'; 'default'
  let maxRepsNeeded = {};
  let initAssRepsId = user.pushupPlans.current ? user.pushupPlans.current.assessments.initialAssessmentID : undefined;

  //using initial assessment for default reps from % frozen
  // if (initAssRepsId !== undefined && initAssRepsId !== null) {
  //   maxRepsNeeded = user.assessments.find(ass => ass._id === initAssRepsId);
  //   maxRepsNeeded.type = 'initialAssessment';
  //   // console.log("initAssReps: ", maxRepsNeeded);
  // } else {

    //init ass doesn't exist, get latest max reps
    if (user.assessments && user.assessments.length > 0) {
      maxRepsNeeded = user.assessments[0];
      maxRepsNeeded.type = 'latestMaxReps';
      // console.log("MaxReps found: ", maxRepsNeeded);
    } else {
      maxRepsNeeded.reps = 20;
      maxRepsNeeded.type = 'default';
    }
  // }

  // console.log("maxRepsNeeded:", maxRepsNeeded);
  return maxRepsNeeded;
}





const PercentagesRegimeActivator = ({ user }) => {
  const { plan, updatePlan } = React.useContext(PlanContext);

  //onClick function...
  const activateDeactivatePercentageRegime = (autoActivated = false) => {
    // console.log("XX", autoActivated);
    if (!plan.repsAsPercentages) {
      // console.log("plan:", plan);
      plan.repsAsPercentages = true;
      plan.maxRepsNeeded = getCurrentMaxReps(user);//.reps; .type: 'initialAssessment'; 'latestMaxReps'; 'default'
      // console.log("maxRepsNeeded:", plan.maxRepsNeeded.reps, plan.maxRepsNeeded.type);
      //create all the values on the plan 
      plan.trainings.forEach(training => {
        let sets = training.sets;
        sets.forEach(set => {
          if (set.reps) { //some sets may use duration
            let repsAsPercentage = Math.round(set.reps / plan.maxRepsNeeded.reps * 100);
            set.repsAsPercentage = repsAsPercentage;
            set.reps = null;
            // set.reps = 0;
            // set.reps =Math.round(repsAsPercentage/100 * maxRepsNeeded.reps); //causes warning as type number is changed to 'undefined', but tha shall be ok as i will change it back later
            //don't delete .reps yet
          }
        })
      })
      // console.log("plan before update:", plan);
      updatePlan({ ...plan });
    } else if (autoActivated !== true) {
      // console.log("REQUEST TO DEACTIVATE %%%%%%%%%%%%%%%%%%...");
      //deactivate %...

      //create all the values on the plan 
      plan.trainings.forEach(training => {
        let sets = training.sets;
        sets.forEach(set => {
          set.reps = Math.round(set.repsAsPercentage / 100 * plan.maxRepsNeeded.reps); //causes warning as type number is changed to 'undefined', but tha shall be ok as i will change it back later
          set.repsAsPercentage = undefined;
        })
      })
      plan.repsAsPercentages = undefined;
      plan.maxRepsNeeded = undefined;
      // console.log("plan before update:", plan);
      updatePlan({ ...plan });
    }

    //upon duplicating/deleting/creating new set,training - it needs to do that to the set also

    // make sure that will update the UI so that the UI also refreshes(but not DB as user didn't save changes.)
    //create logic to display all the % values if those exists
    // then display current max reps and all the values
  }

  //to simulate button click
  // React.useEffect(() => { if (user) activateDeactivatePercentageRegime(true); }, [user])

  //set current max reps if plan is set to % regime
  React.useEffect(() => {
    console.log("MAX REPS SHALL BE PART OF PLAN NOW");
    if (user && plan.repsAsPercentages && !plan.maxRepsNeeded) {
      plan.maxRepsNeeded = getCurrentMaxReps(user);
      updatePlan({ ...plan });
    }
  }, [user, plan])

  return (
    <div>
      <button onClick={activateDeactivatePercentageRegime} style={{ display: 'block', margin: '15px 10%', padding: '15px', width: '80%' }}><h5>{plan.repsAsPercentages && 'DE-'}Activate % regime</h5></button>
      {/* <button>What is % regime? -></button> */}
      <p style={{ textAlign: 'center' }}>If % regime is activated, reps are calculated dynamically from user's initial assessment data (or current max, if initial assessment currently doesn't exist.)</p>
      { (plan.repsAsPercentages && plan.maxRepsNeeded) ? <MaxRepsUsedForRepsPercentages /> : null }
    </div >
  );
};

export default PercentagesRegimeActivator;