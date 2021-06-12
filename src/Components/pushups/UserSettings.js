import React from 'react';
import { withRouter } from 'react-router-dom';
// import PushUpsContext from '../../state/PushUpsContextState';
import PushUpsContext from './state/PushUpsContextState';

import "react-toggle/style.css";
import Toggle from 'react-toggle';

import Counter from './basicComponents/CounterAllIn';

// import pushupsContext from '../state/PushUpsContextState';
import pushupsContext from './state/PushUpsContextState';
// import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData'
import postJsonData, { postJsonDataUrlAfterAPIpushups } from '../../functions/postJsonData'
import { urlRoot } from '../../globalState/globalVariables';


// import { setNotificationWithAgenda } from '../../../../server-express-project/mongoDB/notificationsController';

// import { subscribeUser } from '../src/subscription';
import { subscribeUser } from '../../subscription';
import TrainingTodayNotification from './userSettings/TrainingTodayNotification';
import Logout from './userSettings/Logout';

import { SLink } from './Home';
import errorToast, { normalToast } from './functions/errorToast'







const UserSettings = ({ history }) => {
  React.useEffect(() => {
    // (async () => { await new Promise(resolve => setTimeout(resolve, 350)); })()
    //scroll should be within this async anyway to be delayed
    window.scrollTo(0, 0);
  }, []);

  let { user, updateUser, publicPlans, allUsers } = React.useContext(PushUpsContext);

  //.............................PWA push notifications SETUP START
  const [notificationSupportedInfo, setNotificationSupportedInfo] = React.useState(`${("serviceWorker" in navigator && "PushManager" in window) ? 'Notifications are supported by your browser.' : 'Notifications are NOT supported by this browser!'}` + `${' Permission to display notification: ' + Notification.permission}`);

  const checkPWAWebPushNotifications = async () => {
    console.log("click");
    // alert(`${"serviceWorker" in navigator && "PushManager" in window}`);
    // alert("serviceWorker" in navigator && "PushManager" in window);
    // let xx = await Notification.requestPermission();
    Notification.requestPermission()
      .then(xx => {
        console.log(xx);
        setNotificationSupportedInfo(xx);
        // alert(xx);  
      })

  }
  // setHtmlInfo(Notification.permission);
  function sendNotification(title = "NotificationTest", text = "success") {
    // const img = "/PushupMediumSquare192.png";
    const img = "PushupMediumSquare192.png";

    // const text = "Take a look at this brand new t-shirt!";
    // const title = "New Product Available";
    const options = {
      body: text,
      // icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
      icon: "PushupMediumSquare192.png", //otherwise bell icon i guess
      vibrate: [200, 100, 200],
      tag: "new-product",
      image: img,
      badge: "https://spyna.it/icons/android-icon-192x192.png",
      actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
    };
    navigator.serviceWorker.ready.then(function (serviceWorker) {
      serviceWorker.showNotification(title, options);
    });
  }
  const showPWAWebPushNotification = () => {
    // console.log("MMA0: ", navigator);
    console.log("MMA: ", navigator.serviceWorker);
    // console.log("MMA2: ", 'serviceWorker' in navigator);

    //following 2 lines bring sme positive result but .ready will never stop waiting, while .getRegistration can return undefined after short while
    navigator.serviceWorker.ready.then(sw => {
      console.log("MMB1", sw);
      // sw.showNotification('Hi2.1');
    });
    // navigator.serviceWorker.getRegistration()
    //   .then(sw => {
    //     console.log("MMB2", sw);
    //     if (sw) sw.showNotification('Hi');
    //   })
    sendNotification();
  }
  //.............................PWA push notifications SETUP END

  const [deviceName, setDeviceName] = React.useState('unnamed_device');

  let supportVarNotificationOn = false;
  let supportVarNotificationTime;
  let trainingTodayNotificationsSupportVar = [];
  // React.useEffect(() => {

  if (user.settings
    && user.settings.notifications
    && user.settings.notifications.specific
    && user.settings.notifications.specific.TrainingTodayNotifications) {
    // console.log("BUTTON SHOULD BE GREEN");
    // setTrainingTodayNotification(user.settings.notifications.specific.TrainingTodayNotification);
    supportVarNotificationOn = user.settings.notifications.specific.TrainingTodayNotifications[0].on;
    supportVarNotificationTime = user.settings.notifications.specific.TrainingTodayNotifications[0].time;
    trainingTodayNotificationsSupportVar = user.settings.notifications.specific.TrainingTodayNotifications;
  }
  // }, [user]);
  // console.log("BUTTON SHOULD BE GREEN ,", supportVarNotificationOn);
  const [trainingTodayNotification, setTrainingTodayNotification] = React.useState(supportVarNotificationOn);
  let [time, setTime] = React.useState(supportVarNotificationTime ? supportVarNotificationTime : { hours: 20, minutes: 0 });

  const [todayNotifications, setTodayNotifications] = React.useState(trainingTodayNotificationsSupportVar);
  React.useEffect(() => { console.log("todayNotifications CHANGED TO:", todayNotifications) }, [todayNotifications]);
  const todayNotificationsHandler = { todayNotifications, setTodayNotifications };
  console.log("todayNotifications------:", todayNotifications);

  const handleTrainingTodayNotificationChangeClick = async ({ target: { checked } }) => {

    setTrainingTodayNotification(checked);
    let forWhen = time;
    let what = 'TrainingTodayNotifications';
    // let how = checked; //true or false
    let how = [{ on: checked, time }]; //true or false
    try {
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, forWhen });
      updateUser(updatedUser);
    } catch (err) { console.log("e1", err) }
  }

  // const updateNotificationTimeButtonAction = async (notificationNumber) => {
  //   ///TIMES
  //   let x = new Date();
  //   console.log(x)
  //   let y = x.toUTCString();
  //   console.log(y);
  //   let z = new Date(`${y} UTC`);
  //   console.log(z);
  //   // let xx = new Date.toUTCString();
  //   // console.log(xx);
  //   let x1 = x.getTimezoneOffset() / -60;
  //   console.log("x1:", x1);

  //   // let x2 = Date.UTC();
  //   // console.log("x2:", x2);
  //   // console.log(Date.UTC());
  //   // console.log(Date.now());
  //   let supportVarLocalTime = new Date();
  //   let localTimeExtraHours = supportVarLocalTime.getTimezoneOffset() / -60;

  //   let forWhen = time;
  //   // let what = 'TrainingTodayNotification';
  //   // let how = true; //true or false
  //   let what = 'TrainingTodayNotifications';
  //   // let how = checked; //true or false
  //   let how = [{ on: trainingTodayNotification, time }]; //true or false
  //   try {
  //     let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, forWhen, localTimeExtraHours });
  //     updateUser(updatedUser);
  //   } catch (err) { console.log("e1", err) }
  // }

  const updateTodayNotificationsButtonAction = async () => {
    ///TIMES
    let x = new Date();
    console.log(x)
    let y = x.toUTCString();
    console.log(y);
    let z = new Date(`${y} UTC`);
    console.log(z);
    // let xx = new Date.toUTCString();
    // console.log(xx);
    let x1 = x.getTimezoneOffset() / -60;
    console.log("x1:", x1);

    // let x2 = Date.UTC();
    // console.log("x2:", x2);
    // console.log(Date.UTC());
    // console.log(Date.now());
    let supportVarLocalTime = new Date();
    let localTimeExtraHours = supportVarLocalTime.getTimezoneOffset() / -60;

    let forWhen = time;
    // let what = 'TrainingTodayNotification';
    // let how = true; //true or false
    let what = 'TrainingTodayNotifications';
    // let how = checked; //true or false
    // let how = [{ on: trainingTodayNotification, time }]; //true or false
    let how = todayNotifications;
    try {
      // let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, forWhen, localTimeExtraHours });
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, localTimeExtraHours });
      updateUser(updatedUser);
    } catch (err) { console.log("e1", err) }
  }


  const setThisDeviceForNotificationsButtonClicked = async () => {
    console.log("useThisDeviceForNotificationsButtonClicked clicked, deviceName: ", deviceName);
    let result = await subscribeUser(deviceName);
    console.log("RESULTTTTTT of subscribing user: ", result);
    // subscribeUser(deviceName);
  }

  // const checkDeviceName = () => {
  // }

  const addTrainingTodayNotificationClicked = () => {

    console.log("addTrainingTodayNotificationClicked");

    setTodayNotifications(todayNotifications => {
      todayNotifications.push({ on: true, time: { hours: 12, minutes: 30 } })
      // todayNotifications[index].on = checked;
      return [...todayNotifications];
    });

    // setTodayNotifications(todayNotifications => {
    //   todayNotifications[index].time[hoursOrMinutes] = newValue;
    //   return [...todayNotifications];
    // });

  }


  const resetGuestButton = async () => {
    let data = await postJsonData(`${urlRoot}/guest/resetGuest`, {});
    console.log("reset guest DDDDDDDDDDDDDDData:", data);
    updateUser({ ...data.guest });
    history.push('/');
  }

  const handleNotificationStatusChangeClick = async ({ target: { checked } }) => {
    console.log("handleNotificationStatusChangeClick: ", checked);
    let what = 'status';
    let how = checked;

    let localTimeExtraHours = new Date().getTimezoneOffset() / -60;
    try {
      // let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, forWhen, localTimeExtraHours });
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, localTimeExtraHours });
      updateUser({ ...updatedUser });

      // if (checked) setThisDeviceForNotificationsButtonClicked();
      if (updatedUser.settings.notifications.status === true) setThisDeviceForNotificationsButtonClicked()
      else normalToast('Notification may still run for few days.')


    } catch (err) { console.log("e1", err); errorToast(err); }
  }

  const [wantedUser, setWantedUser] = React.useState('');
  const loadWantedUserForDeveloper = async () => {
    console.log(wantedUser);

    try {
      // let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateNotificationsSettings', { what, how, forWhen, localTimeExtraHours });
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/loadWantedUser', { dataForServer: { wantedUser } });
      updateUser({ ...updatedUser });
    } catch (err) { console.log("e1", err) }
  }

  const [generalNotificationsStatusFromUserObject, setGeneralNotificationsStatusFromUserObject] = React.useState()
  React.useEffect(() => {
    if (user) setGeneralNotificationsStatusFromUserObject(user.settings.notifications.status)
    console.log("NOTif. STATUS changed on user object");
  }, [user]);

  return (
    <div>
      <h1>Settings</h1>
      {/* <SLink to='/pushups/userProfile'>My profile</SLink> */}

      {(user.name === 'Guest') ? <button onClick={resetGuestButton}>Reset Guest profile</button> : <Logout />}
      {/* {user.authority.power > 99 &&
        <div>
        <p>login as...</p>
        <input onChange={({ target: { value } })=>setWantedUser(value)}></input>
        <button onClick={loadWantedUserForDeveloper}>Submit</button>
        </div>} */}



      <div style={{ backgroundColor: 'lightGray' }}>
        <h3>Notifications</h3>
        {/* PWA Push Notifications */}
        <p style={{ color: 'bray', fontSize: '10px', paddingLeft: '4px' }}>Info: {notificationSupportedInfo}</p>
        {Notification.permission === 'default' &&
          <button onClick={checkPWAWebPushNotifications} style={{ backgroundColor: 'yellow' }}>Activate Notifications</button>}
        {Notification.permission === 'granted' &&
          <div>
            {/* <button onClick={showPWAWebPushNotification} style={{ backgroundColor: 'yellow' }}>Test Notifications</button> */}
            {/* {user.authority.power > 1 && <button onClick={useThisDeviceForNotificationsButtonClicked}>Activate sending notifications to this device for this account (if test didn't work).</button>} */}
            {/* <button onClick={useThisDeviceForNotificationsButtonClicked}>Activate sending notifications to this device for this account (if test didn't work).</button> */}
            {/* {user.settings.notifications.subscription && user.settings.notifications.subscription.deviceName}<p>Your notifications are currently delivered to this device: {user.settings.notifications.subscription.deviceName}</p> */}

            {user.authority.power > 1 && <div style={{ backgroundColor: 'red', margin: '5px', padding: '5px' }}>
              <p>Developer's section:</p>
              {(user.settings.notifications && user.settings.notifications.subscription && user.settings.notifications.subscription.deviceName) && <p>Your notifications are currently delivered to device called "{user.settings.notifications.subscription.deviceName}"</p>}
              <span>Name this device: </span>
              <input onChange={(e) => setDeviceName(e.target.value)} value={deviceName}></input>
              <button onClick={setThisDeviceForNotificationsButtonClicked}>Subscribe this account to notifications on this device.</button>
            </div>}
            
            <div>
              Notifications:
              <Toggle
                defaultChecked={user.settings.notifications.status}
                onChange={handleNotificationStatusChangeClick}
              />
            </div>
          </div>
        }
        {Notification.permission === 'denied' && <h3 style={{ color: 'red' }}>Notifications are blocked on this device.</h3>}






        <br /><br />


        {/* notifications content */}

        {/* {user.settings.notifications.status && */}
        {generalNotificationsStatusFromUserObject &&
          <div >
            {/* <div style={{ backgroundColor: 'brown', margin:'5px' }}> */}
            {/* <h2>Specific Reminders</h2> */}
            <div style={{ backgroundColor: 'lightGreen', margin: '5px', padding: '5px' }}>
              <h3>Training Reminders:</h3>
              <p>Notify me on the day of training at...</p>
              {/* <div style={{ padding: '20px', backgroundColor: 'lightGray' }}> */}
              {/* <div style={{ backgroundColor: 'lightGray' }}> */}
              <div>
                {todayNotifications.map((not, i) => (<TrainingTodayNotification key={i} index={i} todayNotificationsHandler={todayNotificationsHandler} />))}
                <button onClick={addTrainingTodayNotificationClicked}>Add "Training Reminder"</button>
              </div>
              <button onClick={updateTodayNotificationsButtonAction}> SAVE CHANGES <br />(Update "Training Today Notifications" settings)</button>

            </div>
          </div>}

      </div>
      <p style={{ color: 'gray', fontSize: '10px', textAlign: 'center' }}>React version:{React.version}</p>
      {user?.authority?.power > 99 && <div style={{backgroundColor:'purple',margin:'5px',borderRadius:'10px 0 10px 0',padding:'10px', border:'3px dotted white'}}>
        {/* <br/> */}
        <h5 style={{color:'white',textAlign:'center'}}>Developer's playground</h5>
        <SLink style={{ backgroundColor: 'lightGray', fontSize: '1.2rem' }} to='/pushups/endOfPlanExecutionEvaluation'>Evaluate Finished Plan</SLink>
        <SLink style={{ backgroundColor: 'lightGray', fontSize: '1.2rem' }} to='/pushups/finishedPlanResults'>Publish Finished Plan results</SLink>
        
      </div>}
    </div>
  );
};

export default withRouter(UserSettings);