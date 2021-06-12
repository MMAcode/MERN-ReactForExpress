import React from 'react';
// import { TestContext } from '../ShowPersonalPlanToUserToAdjust'
import PlanContext from '../ContextDefaults';

import styled from 'styled-components';
import CounterAllIn from '../../basicComponents/CounterAllIn';
export const SSchedule = styled.div`
background-color: lightgreen;
padding:3%;
margin-top:35px;
`


const Schedule = ({ children }) => {
  const { plan, updatePlan } = React.useContext(PlanContext);

  ///////update schedule if needed (if old version without objects or if not 14 days)
  if (plan) {
    // console.log("plan.schedule before update:", plan.schedule, plan.schedule.length);

    //if schedule is not in object type, update that
    if (plan.schedule.length > 0 && typeof plan.schedule[0] != 'object') {
      for (let i = 0; i < plan.schedule.length; i++) {
        plan.schedule[i] = { trainingNumber: plan.schedule[i] };
      }
    }

    //if plan is shorter fill it
    if (plan.schedule.length < 14) {
      let extra = 14 - plan.schedule.length;
      let posFromSchedule = 0;
      for (let i = 1; i <= extra; i++) {
        plan.schedule.push(plan.schedule.length > 10 ? { trainingNumber: 0 } : { trainingNumber: plan.schedule[posFromSchedule].trainingNumber });
        posFromSchedule++;
      }
      console.log("plan.schedule after update:", plan.schedule, plan.schedule.length);
    }
  }



  const runSubmit = async (e, indexFrom0) => {
    console.log(e.target.value);
    plan.schedule[indexFrom0].trainingNumber = Number(e.target.value);
    updatePlan({ ...plan });
    console.log(plan);
  }


  return (
    <SSchedule>
      <h1>Trainings SCHEDULE</h1>
      {/* OLD STYLE SCHEDULE: */}
      {/* <div>
        <h5>How many days will be one Cycle?:</h5>
        <input onChange={getNumberOfDays} id='numberOfDays' type='number'></input>
      </div>
      <br></br>
      {plan.schedule &&
        <div>
          <h5>Add trainings into the schedule (0 is default):</h5>
          {plan.schedule.map((day, index) => {
            return (
              <div key={index}>
                <span>Day {index + 1}:</span>
                <input onChange={(e) => runSubmit(e, index)} value={plan.schedule[index]}></input>
              </div>)
          })}
        </div>} */}

      <div>
        {/* <h3>Whole cycle view:</h3> */}
        {/* {daysOfSchedule.map((day, index) => */}
        {/* <h5>Add trainings into the schedule (1 represents 'training 1', 2 'training 2',... 0 represents day off.)</h5> */}
        <h5>Decide which day to do which training. </h5>
        <p> - As default, "training number 1" is scheduled for each day.</p>
        <p> - If there should be no training on certain day, set the training number to 0.</p>
        <p> - For example, if you created 3 trainings, you can select number from 0 to 3 for each day.</p>
        {plan.schedule.map((scheduleDay, index) =>
          <div key={index}
            style={{
              backgroundColor: `${index > 10 ? (index === 13 ? 'red' : (index === 12 ? 'orange' : 'yellow')) : (scheduleDay.trainingNumber === 0 ? 'gray' : 'green')}`,
              margin: '3px', padding: '3px',

            }}>

            {index > 10 && <p style={{ textAlign: 'center', margin: '0', padding: '0', fontSize: '10px' }}>{index === 13 ? "Day of final assessment. Don't train before the assessment!!!" : 'Recovery day recommended.'}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {/* <span>Day {index<9 ? ('0'+(index+1)) : index+1}:</span> */}
              {/* <div style={{display:'flex',flexFlow:'column'}}> */}
              <span>Day {index < 9 && <span style={{ color: '#ffffff00' }}>0</span>}{index + 1}:</span>
              {/* </div> */}
              {/* <input
              key={index}
              id={'idScheduleInput' + index}
              value={day}
              onChange={({ target: { value } }) => { plan.schedule[index] = Number(value); updatePlan({ ...plan }) }}
              >
              </input> */}
              {/* const [p1counterSmall, p1counterBig, onChangeFunctionReceivingNewValueAsParameter, initialValue, sideText, smallTextUnderTheNumber, minValue, MaxValue] = settings; */}

              <CounterAllIn settings={[
                0,
                index === 13 ? 0 : 1,
                (value) => { plan.schedule[index].trainingNumber = Number(value); updatePlan({ ...plan }) },
                scheduleDay.trainingNumber,
                '',
                '',
                0,
                index === 13 ? 0 : plan.trainings.length
              ]} />
            </div>


          </div>
        )}
      </div>
      {/* <input onChange={({ target: { value } }) => { daysOfSchedule[index] = value; setDaysOfSchedule(daysOfSchedule) }}>hi</input> */}

    </SSchedule>
  );
};


export default Schedule;