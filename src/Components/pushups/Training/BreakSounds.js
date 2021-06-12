import React from 'react';

import useSound from 'use-sound';
import soundGetReady from '../../sounds/files/getReady/taffFemale.mp3';
import soundBeep from '../../sounds/files/facebook/Complete and Success/Complete 2.m4a';
import soundStart from '../../sounds/files/startBlow/airHorn.mp3';

const BreakSounds = ({
  breakLength,
  breakDuration,
  soundsOn,
  remindingBreakTime
}) => {
  const [soundBeepPlay] = useSound(soundBeep);
  const [soundGetReadyPlay] = useSound(soundGetReady);
  const [soundStartPlay] = useSound(soundStart);


  React.useEffect(() => {
    if (!soundsOn) return;//don't play sounds if that is the user's setting
    // let remindingBreakTime = breakLength - breakDuration; //new from outside - considering also extended breaks
    if (remindingBreakTime === 10) soundGetReadyPlay();
    if (remindingBreakTime < 4 && remindingBreakTime > 0) soundBeepPlay();
    if (remindingBreakTime === 0) soundStartPlay();
  }, [breakDuration])

  return (
    <></>
  );
};

export default BreakSounds;