import React from 'react';
import PushUpsContext from '../state/PushUpsContextState';

import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import { withRouter } from 'react-router-dom';
import MaxRepsTest from './MaxRepsTest';
import MaxRepsButtonInterface from '../menu/MaxRepsButtonInterface';

// import { returnPersonalPlanFromPlanID } from '../functions/basics';

const InitialAssessment = ({ history }) => {
  const { user, updateUser } = React.useContext(PushUpsContext);
  const [assNotDoneOrDoneLateOrOk, SETassNotDoneOrDoneLateOrOk] = React.useState(null);

  React.useEffect(() => {
    const getLastAssessmentInfo = () => {
      if (user.assessments) {
        const { date, reps, notes } = user.assessments[0];
        const differenceInDays = (dateNewerNormal, dateOlderSpecialFromMongoose) => {
          const dateOlder = new Date(dateOlderSpecialFromMongoose);
          var Difference_In_Time = dateNewerNormal.getTime() - dateOlder.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          return Difference_In_Days;
        }
        let daysInPast = differenceInDays(new Date(), date);
        daysInPast = Math.round(daysInPast);
        SETassNotDoneOrDoneLateOrOk({ daysInPast, reps, notes })
      } else {
        SETassNotDoneOrDoneLateOrOk(null);
        //dont even show this option
        // setsstate();

      }
    }
    getLastAssessmentInfo();
  }
    //activate on every re-render if empty
    //, []   ///now runs on every rerender, with [] runs only on first
    , [user.assessments]   ///to prevent warning message - rerender also if this changes
  )


  const useThisAssessmentAsInitial = async () => {
    console.log("click cc");

    //populate schedule with dates
    let currentScheduleToUpdate = user.pushupPlans.current.schedule;
    let timeNowInMs = new Date().getTime();
    for (let i = 0; i < currentScheduleToUpdate.length; i++){
      currentScheduleToUpdate[i].dueDate = new Date(timeNowInMs + 24 * 60 * 60 * 1000 * i); //i adds 1 day extra starting with nothing for today
      currentScheduleToUpdate[i].dueDate = currentScheduleToUpdate[i].dueDate.toString();
      
    }
    console.log("updated schedule: ", currentScheduleToUpdate);


    const updatedUser = await postJsonDataUrlAfterAPIpushups('/setCoreAssessment', { type: 'initial',updateCurrentSchedule:true,currentScheduleToUpdate }); //and final as other option
    console.log("max reps user update to: ", updatedUser);
    updateUser({ ...updatedUser });

    // history.push('/pushups/startMyTraining');
    // history.push('/pushups');
    //update in db: 
    //  user - this plan - assess initial - done
    //  aseess - update the one with this ID
    //   update also assesss history track in user current plan? NO

  }

  // <Route exact path='/pushups/maxRepsTest' component={MaxRepsTest} />


  return (
    <div style={{padding:'10px',backgroundColor:'yellow',color:'black',minHeight:'100vh'}}>
      <h2 style={{ textAlign: 'center' }}>Initial assessment</h2>
      <br/>
      <p style={{ fontSize: '1.2rem' }}>On the beginning and end of each plan, we need to assess, what is your current max.</p>
      <p style={{fontSize:'0.8rem',color:'gray'}}>(Otherwise we will not be later able to say, whether and how much did you improve and how effective this plan was.)</p>

      <div style={{ backgroundColor: 'orange', padding: '10px', margin: '10px 0', textAlign:'center' }}>
        {!assNotDoneOrDoneLateOrOk ? <div>
          <p>You didn't do any assessment yet... Please, do it now.</p>
          {/* <MaxRepsTest/> */}
        </div> :
          assNotDoneOrDoneLateOrOk.daysInPast > 8 ? <p>it is too old ({assNotDoneOrDoneLateOrOk.daysInPast} days). Test yourself now - In main menu select "Test Your Max Reps" </p>
            : <div>
              <p style={{ fontSize: '1.2rem',fontWeight:'bold' }}>You did {assNotDoneOrDoneLateOrOk.reps} reps {assNotDoneOrDoneLateOrOk.daysInPast} days ago.</p>
              {assNotDoneOrDoneLateOrOk.notes.length > 0 &&
                <p style={{fontSize:'0.8rem',color:'gray'}}>
                  (You also made following notes:<br></br>{assNotDoneOrDoneLateOrOk.notes})</p>}
                {/* <br/> */}
                {/* <p>Use this data as your initial assessment, click</p> */}
              {/* <button onClick={useThisAssessmentAsInitial}>Use This Data and Start the Training</button> */}
              <button style={{padding:'10px',margin:'10px 0', fontWeight:'bold'}} onClick={useThisAssessmentAsInitial}>Use This Data as my 'Initial assessment'</button>
              {/* <p>Otherwise check your current "max" now - In main menu select "Test your max reps"</p> */}
              <p>Alternatively, you can update your current max here...</p>
              <MaxRepsButtonInterface/>
            </div>}
      </div>
      {/* <p>once YES is clicked, training will </p> */}


    </div>
  );
};

export default withRouter(InitialAssessment);