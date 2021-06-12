import React from 'react';
import PushUpsContext from '../state/PushUpsContextState';
import { getSimpleDateIfTrueAlsoTime } from '../functions/basics'
import CurrentPlan from './CurrentPlan';
import FinishedExecutionPlanTrainings from './FinishedExecutionPlanTrainings';

const FinishedExecutionPlan = ({ execution }) => {
  let { user, publicPlans } = React.useContext(PushUpsContext);


  let assessments = {};
  assessments.initial = user.assessments.find(ass => execution.assessments.initialAssessmentID === ass._id);
  assessments.final = user.assessments.find(ass => execution.assessments.finalAssessmentID === ass._id);
  let firstTrainingDate;
  if(execution.trainingHistory?.length>0) firstTrainingDate = execution.trainingHistory[execution.trainingHistory.length-1].date;
  // console.log("firstTrainingDate: ", firstTrainingDate);
  // if (!firstTrainingDate) firstTrainingDate = assessments.initial.date;
  // console.log("EXECUTION: ", execution);

  // console.log(assessments.initial);
  // console.log(getSimpleDateIfTrueAlsoTime(assessments.initial.date));

  const [showTrainingHistory, showTrainingHistorySET] = React.useState(false);

  return (
    <div style={{ backgroundColor: 'lightBlue', margin: '5px' }}>
      <p>Plan Name: {execution.name}</p>
      {/* <p>Improvement:</p> */}

      <p>Progress: {assessments.final.reps - assessments.initial.reps} reps
      {/* (from {assessments.initial.reps}  to  {assessments.final.reps} ) */}
      </p>
      <div style={{ textAlign: 'right' }}>
        {/* <p> from {assessments.initial.reps} ({getSimpleDateIfTrueAlsoTime(assessments.initial.date, false, true)})</p> */}
        <p> from {assessments.initial.reps} ({getSimpleDateIfTrueAlsoTime(firstTrainingDate, false, true)})</p>

        <p>  to  {assessments.final.reps} ({getSimpleDateIfTrueAlsoTime(assessments.final.date, false, true)})</p>
      </div>
      <div>
        {/* <UsabilityInfo usability={execution?.usability?.rating} /> */}
        <p>Results Usability/validity:{execution?.usability?.rating}</p>
        <p>Show Plan</p>
        <p>Show Plan's BackUp Copy</p>
        <button onClick={() => showTrainingHistorySET(before => !before)}>{showTrainingHistory ? 'Hide' : 'Show'} My Trainings history</button>
        <p>Show My Evaluation</p>
        {user.authority?.power > 9 && <div style={{backgroundColor:'pink',margin:'5px'}}>
          <p style={{textAlign:'center'}}>Developer's view</p>
          <p>Execution id: {execution._id}</p>
        </div>}
        {showTrainingHistory && <div>
          <p>ahoj</p>
          <FinishedExecutionPlanTrainings
            trainingSHistory={execution.trainingHistory.length > 0 ? execution.trainingHistory : null}
            //assuming personal;not public pushup plan!!
            currentPlanExecution={execution}
          // assessments={context.user.assessments}
          // personalPushupPlans={context.user.pushupPlans}
          />
        </div>}
      </div>
      {/* dates - started, finished */}
      {/* schedule */}
      {/* training history */}

    </div>
  );
};

export default FinishedExecutionPlan;