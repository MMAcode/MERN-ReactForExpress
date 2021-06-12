import React from 'react';
import pushupsContext from '../state/PushUpsContextState';
import { returnTrueIfDatesHaveTheSameDay } from '../functions/basics';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData';
import { withRouter } from 'react-router-dom';
import MaxRepsButtonInterface from '../menu/MaxRepsButtonInterface';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop'


const DayOfFinalAssessment = ({ history }) => {
  let { user, updateUser } = React.useContext(pushupsContext);
  let initAss = user.assessments.find(ass => ass._id === user.pushupPlans.current.assessments.initialAssessmentID);

  let isDayOfLastAssessmentToday = () => {
    let assDate = user.assessments[0].date;
    let today = new Date();
    return returnTrueIfDatesHaveTheSameDay(assDate, today);
  }

  const buttonClickedUseLastAssessmentAsFinal = async () => {
    //%$£03
    console.log("click #0071");
    const updatedUser = await postJsonDataUrlAfterAPIpushups('/setCoreAssessment', { type: 'final' }); //and final as other option
    //redirect to main menu, + alert user
    // history.push('/pushups');
    
    
    updateUser({ ...updatedUser });
    history.push('/pushups/endOfPlanExecutionEvaluation');
    alert('Congrats. You finished 14-days cycle! Now, take coupe of days break or pick a new (or the same) plan to follow.');


  }
  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ textAlign: 'center' }}>Final assessment</h1>

      {!isDayOfLastAssessmentToday() && <div>
        <p>Today is Day of Final assessment. Today we will see, how much you improved in last 14 days.</p>
        <br />
        <p>
          In your initial assessment you managed to do <br />
          <p
            style={{
              // fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          > {initAss.reps} reps</p>
          {initAss.notes && <span> with following notes: "{initAss.notes}"</span>}
          <span>.</span>
        </p>
      </div>}


      {/* user.pushupPlans.current.assessments */}
      <br />
      <div
        style={{
          // backgroundColor: 'red',
          fontSize: '1.3rem'
        }}>
        {!user.pushupPlans.current.assessments.finalAssessment ?
          (!isDayOfLastAssessmentToday() ? //marked NOT done
            <p>Please, test and update your max reps... </p> //reps test not done yet
            : <div>
              {/* //reps test done, but not marked as final assessment */}
              {/* <p>You did {user.assessments[0].reps} reps in today's assessment.</p> */}
              <p>You did <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'red' }}>{user.assessments[0].reps}</span> reps in your last (today's) assessment.</p>
              <br />

              {/* To use/log this data as your final assessment, click */}
              <button onClick={buttonClickedUseLastAssessmentAsFinal}>Mark this as my Final Assessment</button>
              <br/><br/>
              <p style={{fontSize:'1rem'}}> Otherwise, test your max reps again...</p>
            </div>)
          : null //final ass marked done
        }
      </div>
      <br />
      <div
      // style={{ color: 'red' }}
      >
        <MaxRepsButtonInterface />
      </div>
    </div>
  );
};

export default withRouter(DayOfFinalAssessment);