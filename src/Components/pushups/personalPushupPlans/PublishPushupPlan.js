import React from 'react';
import { withRouter } from 'react-router-dom';
import PushUpsContext from '../state/PushUpsContextState';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import CounterAllIn from '../basicComponents/CounterAllIn';
import { SLink } from '../../../App';




const PublishPushupPlan = ({ history, match }) => {
  let { user, updateUser, publicPlans, updatePublicPlans } = React.useContext(PushUpsContext);
  const [publicPlansNames, setPublicPlansNames] = React.useState(null);

  //setting up recommended initial reps locally
  const [initialMaxReps, setInitialMaxReps] = React.useState({ reps: 20, rangeAsPercentage: 20, rangeAsReps: [18, 22] });
  React.useEffect(() => {
    let rangeAsReps = [0, 0];
    let max = initialMaxReps.reps;
    let range = initialMaxReps.rangeAsPercentage;
    rangeAsReps[0] = Math.round(max - max * range / 100);
    rangeAsReps[1] = Math.round(max + max * range / 100);
    setInitialMaxReps((v) => ({ ...v, rangeAsReps }));
  }, [initialMaxReps.reps, initialMaxReps.rangeAsPercentage]);
  console.log(initialMaxReps);


  React.useEffect(() => {
    if (publicPlans) {
      let publicPlansNamesSupportVar = publicPlans.map(publicPlan => publicPlan.name);
      setPublicPlansNames(publicPlansNamesSupportVar);
      // console.log("publicPlansNames: ", publicPlansNames);
    }
  }, [publicPlans]);

  React.useEffect(() => {
    // let plan = user ? user.pushupPlans.personalFinished[positionFrom0] : undefined;
    let userReps = (user && user.assessments && user.assessments.length > 0) ? user.assessments[0].reps : undefined;
    if (userReps) setInitialMaxReps(v => ({ ...v, reps: userReps }));
  }, [user]);


  let positionFrom0 = match.params.positionFrom0;
  console.log("PublishPushupPlan element loaded ", publicPlans);
  const buttonActionPublishPlan = async () => {

    if (user) {
      let planSummary = user.pushupPlans.personalFinished[positionFrom0].summary;
      let planDescription = user.pushupPlans.personalFinished[positionFrom0].description;
      let planDescriptionRich = user.pushupPlans.personalFinished[positionFrom0].descriptionRich;
      // console.log("plan.description: ", plan.description);
      if (((planDescription === undefined || planDescription === null || planDescription === '')
        && (planDescriptionRich === undefined || planDescriptionRich === null || planDescriptionRich === ''))
        || (planSummary === undefined || planSummary === null || planSummary === '')) {
        // history.push('/pushups/trainingPlans');
        alert('Plan has to have "Summary" and "Description" to be publishable. (Duplicate this plan, add summary/description to it and publish that duplicate.');
        history.push('/pushups/trainingPlans/personal');
        return;
      }
    }

    //check if name is unique -search through all public names. if this one exists within
    if (publicPlansNames) {//=once names were loaded from context...
      let thisPlanName = user.pushupPlans.personalFinished[positionFrom0].name;
      console.log("thisPlanNameS: ", publicPlansNames);
      console.log("thisPlanName: ", thisPlanName);
      let thisNameExistsAlreadySupportVar = publicPlansNames.find(nameInDb => thisPlanName === nameInDb);
      console.log("thisNameExistsAlreadySupportVar: ", thisNameExistsAlreadySupportVar);
      if (thisNameExistsAlreadySupportVar) {
        console.log("love");
        // history.push('/pushups/trainingPlans');
        alert('this name exists already. Duplicate this plan and change the name.');
        history.push('/pushups/trainingPlans/personal');
        return;
      }
    }
    console.log("PUBLISHING PLAN!!");
    let data = await postJsonDataUrlAfterAPIpushups('/publishPlan', { positionFrom0, initialMaxReps });
    updateUser({ ...data.user });
    updatePublicPlans([...data.plans]);
    history.push('/pushups/trainingPlans/personal');
  }




  return (
    <div>
      {/* <SLink to='/pushups/trainingPlans'>Plans</SLink>  link to go back to the plans */}
      <h1>Publish pushup plan...</h1>
      <div>
        <h3>Specify target group:</h3>
        <div>How many reps should be able to do typical user of your plan? 
        <br />
        {/* Initial max reps (average): */}
        <CounterAllIn settings={[1, 5, (newValue) => setInitialMaxReps((r) => ({ ...r, reps: newValue })), initialMaxReps.reps, undefined, undefined, 1, 1000]} />
          {/* <br /> */}
        {/* (Using your current max as default value.) */}
        </div>
        <div>
          Set some reps range:<br/>
          <CounterAllIn settings={[1, 5, (newValue) => setInitialMaxReps((r) => ({ ...r, rangeAsPercentage: newValue })), initialMaxReps.rangeAsPercentage, '%', '', 0, 1000]} />
        {/* (Recommended about 20%) */}
        </div>
        {/* <div>Initial max reps range: <CounterAllIn settings={[0, 0,(newValue)=> setInitialMaxReps((r)=>({...r,reps:newValue})), initialMaxReps.reps, undefined, undefined, 1, 1000]} /></div> */}
        {/* <h4>Initial max reps range: from </h4> */}
        <h4>This plan will be recommended to users who can do between {initialMaxReps.rangeAsReps[0]} and {initialMaxReps.rangeAsReps[1]} reps.</h4>
      </div>
      <p>Finished Plan in Array position (from0): {positionFrom0}.</p>
      <button onClick={buttonActionPublishPlan}>Publish</button>

    </div>
  );
};

export default withRouter(PublishPushupPlan);