import React from 'react';
import PushUpsContext from '../state/PushUpsContextState';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import { withRouter } from 'react-router-dom';


const FinishPersonalPushupPlan = (props) => {
  const { history } = props;
  let { user, updateUser } = React.useContext(PushUpsContext);
  let positionFrom0 = props.match.params.positionFrom0;
  let plan = user ? user.pushupPlans.personal[positionFrom0] : undefined;

  const markPlanAsFinished = async () => {
    let updatedUser = await postJsonDataUrlAfterAPIpushups('/finishPersonalPlan', {positionFrom0});
    updateUser({ ...updatedUser });
    history.push('/pushups/trainingPlans/personal');

  }

  return (
    <div>
      <h1>Finishing Personal Pushup Plan</h1>
      <p>%?: {plan && `${plan.repsAsPercentages}`}</p>
      <p>(If you are currently "commited" to this plan, this will commitment be ended (plan execution will be archived).(Start new commitment using this finished plan.))</p>

      {plan && plan.repsAsPercentages === undefined ? <p>you better change plan to % plan.</p> : <p>All looks good. Remember plan can't be changed/adjusted after this.(But can be duplicated).</p>}

      <button onClick={markPlanAsFinished}>Submit as finished</button>
    </div>
  );
};

export default withRouter(FinishPersonalPushupPlan);