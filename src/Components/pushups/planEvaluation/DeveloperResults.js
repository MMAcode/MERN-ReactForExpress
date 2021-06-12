import React from 'react';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import PushUpsContext from '../state/PushUpsContextState';


const DeveloperResults = () => {
  let { user, updateUser, publicPlans, updatePublicPlans } = React.useContext(PushUpsContext);

  let [publicPlan, setPublicPlan] = React.useState({ id: '', name: '' });
  // let [indexNeeded, setIndexNeeded] = React.useState(-1);
  let [executedPlan, setExecutedPlan] = React.useState({ positionFrom0: '', id: '', name: '' });

  React.useEffect(() => {
    if (publicPlans) {
      let plan = publicPlans.find(p => p.name === publicPlan.name);
      if (plan && !publicPlan.id) setPublicPlan(p => ({ ...p, id: plan._id }))
    };

  }, [publicPlan])

  React.useEffect(() => {
    if (user) {
      // let plan = user.pushupPlans.history[indexNeeded];
      let plan; let index;
      if (executedPlan.positionFrom0) plan = user.pushupPlans.history[executedPlan.positionFrom0];
      if (executedPlan.id) plan = user.pushupPlans.history.find((pl, i) => {
        if (pl._id === executedPlan.id) {
          index = i;
          return true;
        }
      });
      
      if (plan && !executedPlan.name) setExecutedPlan(p => ({ ...p, name: plan.name, id: plan._id, positionFrom0: index ? index : p.positionFrom0 }))
    };

  }, [executedPlan])

  const submitClicked = async () => {
    let dataForDB = {
      publicPlanID: publicPlan.id,
      planExecutionPositionFrom0: executedPlan.positionFrom0,
      planExecutionID:executedPlan.id
    };

    // console.log("DATA FOR DB:", dataForDB);
    let [updatedUser, updatedPublicPlan] = await postJsonDataUrlAfterAPIpushups('/updatePublicPlanExecutionHistory', {fromFrontEnd: dataForDB});

    // console.log(" eval - USER from DB:", updatedUser.pushupPlans.current);
    updateUser({ ...updatedUser });

    // updatePublicPlans(pps => {
    // console.log("UPDATED PLANS1:", pps);
    // console.log("UPDATED PLANS2:");

    let index;
    // pps.find((pp, i) => {
    //   if (pp._id === updatedPublicPlan._id) index = i;
    // })
    publicPlans.find((pp, i) => {
      if (pp._id === updatedPublicPlan._id) index = i;
    })
    // console.log("IIIIIIIIINDEX:", index);
    publicPlans.splice(index, 1, updatedPublicPlan);
    updatePublicPlans([...publicPlans]);
    // console.log("UPDATED PLANS:", pps);
    // return pps;
    // })

  }

  return (
    <div>
      <h4>Developer section</h4>
      <h4>Publish old Plan execution results</h4>
      <div style={{ backgroundColor: 'orange' }}>
        <div>
          <span>plan execution position in history array (First plan on position 0):</span>
          <input value={executedPlan.positionFrom0} onChange={({ target: { value } }) => setExecutedPlan({ positionFrom0: value, name: '', id: '' })}></input>
        </div>
        <div>
          <span>plan execution ID):</span>
          <input value={executedPlan.id} onChange={({ target: { value } }) => setExecutedPlan({ id: value, positionFrom0:'', name: '' })}></input>
        </div>
        
        {/* <p>plan execution ID: {executedPlan.id}</p> */}
        <p>plan name: {executedPlan.name}</p>
      </div>
      <div style={{ backgroundColor: 'yellow' }}>
        <span>public plan name:</span>
        <input value={publicPlan.name} onChange={({ target: { value } }) => setPublicPlan({ name: value, id: '' })}></input>
        <p>plan ID: {publicPlan.id}</p>
        <p>plan name: {publicPlan.name}</p>
      </div>
      <button onClick={submitClicked}>Submit</button>
    </div>
  );
};

export default DeveloperResults;