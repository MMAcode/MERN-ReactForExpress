import React from 'react';
import TrainingStopWatch from './TrainingStopWatch';
import SetsToDoAllIn from './SetsToDoAllIn';
import SoundAndMusicControls from './SoundAndMusicControls';

const TrainingHeaders = ({ trainingState }) => {
  // console.log("HHH HH H H H :", trainingState);
  return (
   <div>
      <div
        style={{
          backgroundColor: 'lightgreen',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          
        }}>
        {/* <h2>Training Headers</h2> */}
        {/* <SetsStillToDo trainingState={trainingState} /> */}
        <SetsToDoAllIn trainingState={trainingState} />
     
        {/* <TotalTrainingTime /> */}
        {/* <TrainingStopWatch /> */}
        <TrainingStopWatch />
        {/* last row: */}
      </div>
      {/* <SoundAndMusicControls/> */}

   </div>
  );
};

export default TrainingHeaders;