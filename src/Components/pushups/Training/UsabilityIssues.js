import React from 'react';
import pushupsContext from '../state/PushUpsContextState';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import { withRouter } from 'react-router-dom';



const UsabilityIssues = ({ data,history }) => {
  // {data.schedule.usability, data.schedule.usabilityOld, data.daysLateToday} - used by re-schedule
  let { user, updateUser } = React.useContext(pushupsContext);
  // let [stuffToUpdateOnDB, setStuffToUpdateOnDB] = React.useState({ data.fianl });

  const [readAgain, setReadAgain] = React.useState(null);

  console.log("D A T A: ", data);

  // React.useEffect(() => {
  //   if (user) {
  //     // setStuffToUpdateOnDB({ usability: data.schedule.usability, updatedSchedule });//needs to be in the ReactEffect or sth, otherwise it would keep re-rendering
  //   }
  // }, [user]);

  const continueToTraining = async () => {
    console.log("continue");

    const updatedUser = await postJsonDataUrlAfterAPIpushups('/reschedule', {
      usability: data.finalUsabilityForDB,
      updatedSchedule: data.schedule ? data.schedule.updatedSchedule : undefined,
      updateScheduleDayToDoFrom0OrUndefined: data.lastTraining ? data.lastTraining.updatedScheduleDayToDoFrom0 : undefined,
      potentialUnfinishedTrainingAccounted: true
    }); //and final as other option
    // console.log("updatedUser-rescheduled", updatedUser);
    updateUser({ ...updatedUser });
    history.push('/pushups/runMyTraining');

    //update user on DB then here

    //load training



  }

  if (!user) return <p>loading...</p>

  return (
    <div>
      {/* usability - intro */}
      <h1>Updating data "usability"...</h1>


      <p>Every time you miss or don't finish a training, the ability to measure how effective this push-up plan is goes down. </p>

      <p>Until now effect of the pushup plan on your improvement was possible to measure with cca
      <span style={{ fontSize: '2rem' }}>{data.usabilityOriginal.rating}%</span>accuracy. </p>



      {data.schedule && <div>
        {/* schedule issue info */}
        <h2>Schedule issue</h2>
        <p>You are {data.schedule.daysLateToday} day{data.schedule.daysLateToday > 1 && 's'} late with your training.</p>
        <p>Usability rating will be changed to <span style={{ fontSize: '2rem' }}>{data.schedule.usability.rating}%</span> .</p>

        {/* schedule update*/}
        <h5>Updating schedule</h5>
        <p>The training you missed will be rescheduled for today and started now. Future trainings will be rescheduled accordingly.</p>
      </div>}

      {data.lastTraining && <div>
        <h2>Issue: Unfinished Training (-10%)</h2>
        <p>As you didn't finish (all the sets of) the previous training, "usability" will be lowered by 10%.</p>
      </div>}


      {/* info end  */}
      <h2>Summary</h2>
      <h6>New "usability" of your data will be <span style={{ fontSize: '2rem' }}>{data.finalUsabilityForDB.rating}%</span>.</h6>
      <h6>({data.finalUsabilityForDB.daysOffSchedule} day{data.finalUsabilityForDB.daysOffSchedule != 1 && 's'} off the schedule changes and {data.finalUsabilityForDB.unfinishedTrainings} unfinished training{data.finalUsabilityForDB.unfinishedTrainings != 1 && 's'}. )</h6>

      <p>If you are under 50%, you may consider committing to a new plan.</p>
      <p>If you can stick to the plan schedule and get 100%, that would be impressive!</p>

      {readAgain === null ? null : <h2>Read again.</h2>}
      <button style={{ margin: '20px' }} onClick={continueToTraining}>Understood</button>
      <button style={{margin:'20px'}}  onClick={() => setReadAgain(true)}>Not Understood</button>
      



      {/* check now day/training: */}
    </div>
  );
};

export default withRouter(UsabilityIssues);