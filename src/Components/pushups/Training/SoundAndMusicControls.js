import React from 'react';
import "react-toggle/style.css";
import Toggle from 'react-toggle';

import pushupsContext from '../state/PushUpsContextState';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData'

const SoundAndMusicControls = () => {
  let context = React.useContext(pushupsContext);

  const updateUserTrainingSettings = async (what, how) => {
    try {
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateTrainingSettings', { what, how });
      // context.user.settings.training[what] = how;
      // console.log("user's training music/sound settings updated.");
      // console.log("user with new training set-up: ,", updatedUser);
      // console.log("date now:", new Date());
      // console.log("user with new training set-up: ,", updatedUser.pushupPlans.current.trainingHistory[0]);
      context.updateUser(updatedUser);
    } catch (err) { console.log("e1", err) }
    // context.updateUser({ ...updatedUser });
  }


  let handleTrainingSoundsToggle = ({ target: { checked } }) => {
    // console.log("toggle :", checked);
    updateUserTrainingSettings('sound', checked);
  }
  let handleTrainingMusicToggle = ({ target: { checked } }) => {
    // console.log("toggle :", checked);
    updateUserTrainingSettings('music', checked);
  }
  // console.log("CONTEXT MUSIC ISSUE", context);
  console.log("MUSIC context user ", context);
  return (
    <div style={{backgroundColor:'orange', padding:'5px'}}>
      <p style={{textAlign:'center'}}>Training Audio:</p>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {/* <div> */}
        <div style={{padding:'5px', display:'flex',flexFlow:'column'}}>
          <Toggle
            id='trainingSoundsToggle'
            defaultChecked={context.user ? context.user.settings.training.sound : true}
            // defaultChecked={context.user ? false : true}
            onChange={handleTrainingSoundsToggle}
          />
          <label htmlFor='trainingSoundsToggle'>Sounds</label>
        </div>
        <div style={{ padding: '5px', display:'flex',flexFlow:'column' }}>
          <Toggle
            id='trainingMusicToggle'
            // defaultChecked={this.state.cheeseIsReady}
            // defaultChecked={true}
            defaultChecked={context.user ? context.user.settings.training.music : true}
            // defaultChecked={context.user ? false : true}
     
     
            onChange={handleTrainingMusicToggle}
          />
          <label htmlFor='trainingMusicToggle'>Music</label>
        </div>
      </div>
   </div>
  );
};

export default SoundAndMusicControls;