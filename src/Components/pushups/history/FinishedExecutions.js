import React from 'react';
import PushUpsContext from '../state/PushUpsContextState';
import FinishedExecutionPlan from './FinishedExecutionPlan';

const FinishedExecutions = ({ finishedExecutions }) => {
  let { user, publicPlans } = React.useContext(PushUpsContext);
  // const [finishedExecutions] = React.useState(user.pushupPlans.history);

  return (
    <div>
      <h5>Finished Plans</h5>
      {finishedExecutions.map((ex,index) => {
        return <FinishedExecutionPlan key={index} execution={ex}/>
        
     
      })}
    </div>
  );
};

export default FinishedExecutions;