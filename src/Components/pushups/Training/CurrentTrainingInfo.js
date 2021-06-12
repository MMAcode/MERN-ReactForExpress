import React from 'react';
import { TrainingContext, skipThisDay } from './RunTraining';

import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import { withRouter } from 'react-router-dom';
import pushupsContext from '../state/PushUpsContextState';



const CurrentTrainingInfo = ({ history }) => {
  let trainingContext = React.useContext(TrainingContext);
  let [trainingState, setTrainingState] = trainingContext;
  let pushupContext = React.useContext(pushupsContext);
  console.log("TRAINING CONTEXT:", pushupContext.user.pushupPlans.current);
  console.log("TRAINING CONTEXT:", pushupContext.user.pushupPlans.current.scheduleDayToDoFrom0);
  console.log("TRAINING CONTEXT:", pushupContext.user.pushupPlans.current.schedule);
  console.log("TRAINING CONTEXT:", pushupContext.user.pushupPlans.current.schedule.map(day => day.dueDate));


  const skipThisDay = async () => {
    let updatedUser = await postJsonDataUrlAfterAPIpushups('/setTheNextTraining', { rescheduleDates: true });
    history.push('/pushups');
    pushupContext.updateUser({ ...updatedUser });
    await new Promise(resolve => setTimeout(resolve, 250));
    history.push('/pushups/startMyTraining');
  }

  // console.log("CURRNET TRAINING INFO running")
  return (
    <div>
      <h1>Current training info:</h1>

      <h4>
        Training Number: {trainingState.main.trainingNumber}
        <p>Training Name: {trainingState.main.training.name ? ('"' + trainingState.main.training.name + '"') : '(no name)'}</p>

      </h4>
      <p>Part of plan: {trainingState.main.plan.name}</p>



      {/* trainingState.main.setNumberFrom1 */}
      <ul>{trainingState.main.training.sets.map((set, index) =>
        <li key={index} style={{ backgroundColor: index < trainingState.main.setNumberFrom1 - 1 ? 'gray' : (index === trainingState.main.setNumberFrom1 - 1 ? 'yellow' : 'lightGray') }}>
          {/* Set {index + 1}: {set.reps ? `${set.reps} reps` : `${set.duration} seconds`} */}
          Set {index + 1}: {set.reps} reps
          <br />
          Exercise Notes: {set.repsNotes}
          <br />
          Break after: {set.breakAfterInSeconds}s.
          <br />
          Break Notes: {set.breakNotes}

        </li>)}
      </ul>

      <div style={{ position: 'fixed', bottom: '0', width: '100%', background: 'black', display: 'flex', justifyContent: 'center' }}>
        <button style={{ width: '80%', fontSize: '1.5rem', margin: '1rem', background: 'LightGreen' }} onClick={() => { setTrainingState({ ...trainingState, stage: (trainingState.stage + 1) }) }}>{trainingState.main.continueStartedTraining === true ? 'Continue' : 'Start'}</button>
      </div>

      {/* {pushupContext.user.pushupPlans.current.personal === 'yes-only' && <button onClick={skipThisDay} style={{ fontSize: '1rem', margin: '1rem' }}>Skip this training.</button>}
      <br /><br />
      <p>scheduleDayToDoFrom0: {pushupContext.user.pushupPlans.current.scheduleDayToDoFrom0}</p>
      <p>schedule dates: </p>
      {pushupContext.user.pushupPlans.current.schedule.map((day, index) => <p key={index}>{index}) {day.dueDate}</p>)} */}
      <br /><br />
      <br /><br />
      <br /><br />
    </div>
  );
};

export default withRouter(CurrentTrainingInfo);