import React from 'react';

const TrainingStopWatch = () => {
  const [trainingTime, setTrainingTime] = React.useState({seconds:0,minutes:0});
  React.useEffect(
    () => {
      let id;
      if (trainingTime.seconds === 59) {
        id = setInterval(() => setTrainingTime({ seconds:0, minutes:trainingTime.minutes+1 }), 1000);
      } else {
        id = setInterval(() => setTrainingTime({ ...trainingTime, seconds: (trainingTime.seconds + 1)}), 1000);
      }
      return () => clearInterval(id);
    },
    [trainingTime]
  );


  return (
    <span style={{ marginRight: '15px', padding: '7px', backgroundColor: 'lightBlue' }}>{trainingTime.minutes}m {trainingTime.seconds}s</span>

  );
};

export default TrainingStopWatch;