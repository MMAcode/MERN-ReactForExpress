import React from 'react';
import Toggle from 'react-toggle';
import Counter from '../basicComponents/CounterAllIn';

const TrainingTodayNotification = ({ todayNotificationsHandler, index }) => {
  const { todayNotifications, setTodayNotifications } = todayNotificationsHandler;
  let thisNotification = todayNotifications[index];
  // console.log("thisNotification: NNNN N NNN", thisNotification);




  const handleTrainingTodayNotificationChangeClick = async ({ target: { checked } }) => {
    setTodayNotifications(todayNotifications => {
      todayNotifications[index].on = checked;
      return [...todayNotifications];
    });

    // let forWhen = time;
    // let what = 'TrainingTodayNotifications';
    // // let how = checked; //true or false
    // let how = [{ on: checked, time }]; //true or false
    // try {
    //   let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, forWhen });
    //   updateUser(updatedUser);
    // } catch (err) { console.log("e1", err) }
  }

  const setTime = (hoursOrMinutes, newValue) => {
    setTodayNotifications(todayNotifications => {
      todayNotifications[index].time[hoursOrMinutes] = newValue;
      return [...todayNotifications];
    });
  }

  const deleteThisNotificationClicked = () => {
    // console.log("TT ", todayNotifications);

    setTodayNotifications(todayNotifications => {
      console.log("index:", index);
      todayNotifications.splice(index, 1);
      // console.log("xx: ", xx);
      return [...todayNotifications];
    });
    //   // todayNotifications[index].time[hoursOrMinutes] = newValue;
    //   // return [...todayNotifications];
    // });
  }

  return (
    // <div style={{backgroundColor:'yellowGreen', borderBottom:'3px solid black'}}>
    <div style={{ backgroundColor: 'yellowGreen', margin: '10px',padding:'10px' }}>
      <h5>Training Reminder {index + 1}</h5>
      <div style={{display:'flex', alignItems:'center',justifyContent:'space-evenly'}}>
        <Toggle
          defaultChecked={thisNotification.on}
          onChange={handleTrainingTodayNotificationChangeClick}
        />
        <button style={{backgroundColor:'red',borderRadius:'15px' }}onClick={deleteThisNotificationClicked}>Delete</button>
      </div>
      <br />
      <Counter settings={[1, 5, (newValue) => setTime('hours', newValue), todayNotifications[index].time.hours, '', 'hours', 0, 23  ,'borderBeautiful']} />
      {/* <br /> */}
      <Counter settings={[1, 10, (newValue) => setTime('minutes', newValue), todayNotifications[index].time.minutes, '', 'minutes', 0, 59,'borderBeautiful']} />
      <br />
    </div>
  );
};

export default TrainingTodayNotification;