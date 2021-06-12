import React from 'react';

import useSound from 'use-sound';
import soundTrainingFinished from '../../sounds/files/trainingFinishedCelebration/Trumpets8s.mp3';
import {frontEndPushupsUrlRoot} from '../../../globalState/globalVariables'


const TrainingFinished = ({ soundOn }) => {
  const [soundTrainingFinishedPlay] = useSound(soundTrainingFinished);

  React.useEffect(() => {
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // window.open(frontEndPushupsUrlRoot, "_self");
      window.location = frontEndPushupsUrlRoot;

    })()

   
    //window.location.reload(true);

  },[])

  React.useEffect(() => {
    if (!soundOn) return; //don't play sound if that is user's setting
    soundTrainingFinishedPlay();
  }, [soundTrainingFinishedPlay]);

  return (
    <div>
      <h1>Training finished. Well done!</h1>
    </div>
  );
};

export default TrainingFinished;