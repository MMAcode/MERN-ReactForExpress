import React from 'react';
import { SLink } from '../../../App';
import ShowPersonalPlanToUserToAdjust from './ShowPersonalPlanToUserToAdjust';

import PushUpsContext from '../state/PushUpsContextState';


////delete
// import PushUpsContext from '../state/PushUpsContextState';
////up to here


const AdjustPersonalPushupPlan = (props) => {
  //newest
  let { user, updateUser,publicPlans } = React.useContext(PushUpsContext);
  let positionFrom0 = props.match.params.positionFrom0;
  let id = props.match.params.id;
  let publicPlan = false;
  console.log("XXXX ", props.match.params);
  // let plan=user.pushupPlans.personal[positionFrom0];
  let plan;
  if (user) {
    if (positionFrom0 >= 0) {
      plan = user.pushupPlans.personal[positionFrom0]
    } else if (positionFrom0==='-125') {
      console.log("this is public plan!");
      plan = publicPlans.find((plan, planPositionFrom0) => {
        positionFrom0 = planPositionFrom0;
        publicPlan = true;
        return plan._id === id
      })
    } else {
      plan = user.pushupPlans.personal.find((plan, planPositionFrom0) => {
        positionFrom0 = planPositionFrom0;
        return plan._id === id
      })
    }
  }
  console.log("PLAN ", plan);

  //old -  to renew
  // const [plan, setPlan] = React.useState(null);

  //renew following line
  let stateP = props.location.state;

  ////////////delete from here
  // const [stateP, setStateP] = React.useState(props.location.state);
  // let { user, updateUser } = React.useContext(PushUpsContext);
  // React.useEffect(() => {
  //   if (!user) return;
  //   setStateP({
  //     personalPlanPositionFrom0: 1,
  //     plan: user.pushupPlans.personal[1]
  //   })
  // }, [user])
  ////////////delete up to here


  console.log("props location state: ", stateP);
  // console.log("props location state: ",props.location.state);

  // React.useEffect(() => {
  //   if (props.location.state) {
  //     setPlan(props.location.state);
  //     console.log("adjust if true");
  //     console.log("plan: ", plan);
  //   }
  //  }, []);
  console.log("plan in state (in adjust): ", plan);

  return (
    <div>
      <h1>Adjust plan</h1>
      {/* <p>position: {stateP.personalPlanPositionFrom0}</p> */}
      {/* {stateP != undefined ? <ShowPersonalPlanToUserToAdjust planToAdjust={stateP.plan} adjustingNotCreating={stateP.personalPlanPositionFrom0} /> */}
      {plan != undefined ? <ShowPersonalPlanToUserToAdjust planToAdjust={plan} adjustingNotCreating={positionFrom0} publicPlan={publicPlan} />
        : <p>loading (or error if it takes too long :-).</p>}
      {/*  <p>State undefined. No plan selected now. Go back and select plan to adjust.</p>} */}

      {/* {(typeof plan == "object") ? <div>{JSON.stringify(plan)}</div> : <p> {plan} </p>} */}
      {/* {plan!=null ?? <ShowPersonalPlanToUserToAdjust planToAdjust={plan} />} */}
      {/* {plan ?? <p>xxdddd</p>} */}


    </div>
  );
};

export default AdjustPersonalPushupPlan;