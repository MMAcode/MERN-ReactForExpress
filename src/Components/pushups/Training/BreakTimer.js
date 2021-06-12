import React from 'react';
import { TrainingContext } from './RunTraining';
import PushUpsContext from '../state/PushUpsContextState';


const BreakTimer = ({ external, duration, timeLeft,breakExtensionInSeconds, breakStartedAt }) => {
  let trainingContext = React.useContext(TrainingContext);
  // let pushupContext = React.useContext(PushUpsContext);
  // let {user} = React.useContext(PushUpsContext);

  let [trainingState, setTrainingState] = trainingContext;

  // const [remindingBreakTime, setRemindingBreakTime] = React.useState(trainingState.main.set.breakAfterInSeconds);
  const { remindingBreakTime, setRemindingBreakTime } = timeLeft;



  // React.useEffect(
  //   () => {
  //     // duration.setBreakDuration(duration.breakDuration + 1);
  //     duration.setBreakDuration(durationBefore=> durationBefore + 1);

  //     if (remindingBreakTime < 1) {
  //       // console.log("time is UP!");
  //       if (!external.breakTimerFinished) {
  //         console.log("firing timer FINISHEd");
  //         external.setBreakTimerFinished(true);
  //       };
  //     };
  //     const id = setInterval(() => setRemindingBreakTime(remindingBreakTime - 1), 1000);
  //     return () => {
  //       clearInterval(id);
  //     };
  //   },
  //   [remindingBreakTime]
  // );

   //break 2.0
  React.useEffect(
    () => {
      if (remindingBreakTime < 1) {
        // console.log("time is UP!");
        if (!external.breakTimerFinished) {
          console.log("firing timer FINISHEd");
          external.setBreakTimerFinished(true);
        };
      };

      // console.log("break duration 2.0: reminding time:", remindingBreakTime);
      // console.log("break duration 2.0: ", duration.breakDuration);

      let difference = Math.round((Date.now() - breakStartedAt.getTime()) / 1000)+1; //has to start with 1, otherwise other value wouldn't update
      // console.log("difference: ", difference);
      duration.setBreakDuration(difference);
      const id = setInterval(() => setRemindingBreakTime(trainingState.main.set.breakAfterInSeconds - difference + breakExtensionInSeconds), 1000);
      // console.log(remindingBreakTime);
      return () => { clearInterval(id); };
    }, [remindingBreakTime]);

  return (
    <span style={{ fontSize: '4rem' }}>{remindingBreakTime}</span>
  );
};

export default BreakTimer;