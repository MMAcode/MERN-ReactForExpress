import React from 'react';
import { SLink } from '../../../App';

import useSound from 'use-sound';
import soundBeep from '../../sounds/files/facebook/Complete and Success/Complete 2.m4a';
import soundStart from '../../sounds/files/startBlow/airHorn.mp3';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import ChangingProgressProvider from './pacemaker/ChangingProgressProvider';
// import { Link } from 'react-router-dom';

const setMyDots = (setDots, howMany) => {
  let dots = '';
  console.log("howMany ", howMany);
  for (let i = 1; i <= howMany; i++) {
    dots += '.';
  }
  // console.log(dots);
  setDots(dots);
}

const PaceMaker = () => {
  const [counter, setCounter] = React.useState(-5);
  const [dots, setDots] = React.useState('...'); //doesn't matter how many is here

  const [cycleMs, setCycleMS] = React.useState(0);
  const [numberOfReps, setNumberOfReps] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);
  const [soundBeepPlay] = useSound(soundBeep);
  const [soundStartPlay] = useSound(soundStart);


  const [paceMakerStarted, setPaceMakerStarted] = React.useState(false);

  //setDefaultDots
  React.useEffect(() => {
    setMyDots(setDots, counter * -1);
  }, []);

  // // use milliseconds
  React.useEffect(() => {
    let intervalMs;
    if (cycleMs === 0) intervalMs = setInterval(() => setCycleMS(100), 20);
    return () => {
      clearInterval(intervalMs);
    };
  }, [cycleMs]);

  //use 1s timer
  // console.log("pacemaker refreshed, cycleMs: ", cycleMs);
  React.useEffect(() => {
    let interval;
    if (paceMakerStarted) {
      // duration.setBreakDuration(duration.breakDuration + 1);
      if (counter < 0) soundBeepPlay()
      else if (counter === 0) soundStartPlay()
      else if (counter > 0) { }
      interval = setInterval(() => { setCounter(counter + 1) }, 1000);
      //countReps
      if (counter>=0 && counter % 2 === 0) {
        setNumberOfReps(counter / 2 + 1);
        // console.log(numberOfReps);
        // soundBeepPlay();
        setCycleMS(0);
        // console.log("RESET MS");
        counter >= 0 && speechSynthesis.speak(new SpeechSynthesisUtterance(numberOfReps + 1));
      }
    }
    //set dots
    setMyDots(setDots, counter * -1);


    //clear up function
    return () => {
      clearInterval(interval);
    };
  },
    [counter, paceMakerStarted]
  );


  const stopAndLogReps = () => {
    setPaceMakerStarted(false);
    setNumberOfReps(numberOfReps - 1);
    setShowResult(true);
    setCycleMS(0);
    setCounter(1000);
    // console.log("number of reps:", numberOfReps);
    //beep each second (read number)
  }

  const resetPaceMaker = () => {
    setPaceMakerStarted(false);
    setNumberOfReps(0);
    setShowResult(false);
    setCounter(-5);
    // console.log("number of reps:", numberOfReps);
    //beep each second (read number)
  }

  const circleTapped = () => {
    console.log("tap");
    if (!paceMakerStarted && !showResult) {//start
      setPaceMakerStarted(true)
    }
    if (paceMakerStarted) { //stop
      stopAndLogReps();
    }
    if (!paceMakerStarted && showResult) { //reset
      resetPaceMaker();
    }


  }

  return (
    <div style={{ textAlign: 'center' }}>
      {/* <h1>Pace Tracker</h1> */}
      <p>(2 seconds per rep.)</p>
      {/* <h3>{counter < 0 ? counter * -1 : 'Go!'}</h3> */}
      {/* {counter < 0 ? <h1 style={{fontSize:'200px', lineHeight:'100px'}}>{dots}</h1> : <h3>Go!</h3>} */}
      {counter < 0 ? <h1 style={{fontSize:'200px',lineHeight:'0px', display:'inline', marginBottom:'20px'}}>{dots}</h1> : <h3>Go!</h3>}
      {/* {counter >= 0 && */}
      <div
        onClick={circleTapped}
        style={{ width: '80%', margin: 'auto' }}
      >
        <CircularProgressbarWithChildren
          value={cycleMs}
          // text={counter==0 ? 'Go!': `${numberOfReps}`}
          // text={counter<0 ? `${counter}`: counter==0 ? 'Go!': `${numberOfReps}`}
          text={`${numberOfReps}`} //to show 0 too
          background='true'
          styles={buildStyles({
            pathTransition: cycleMs === 0 ? "none" : "stroke-dashoffset 2s linear 0s",
            // textSize: '50px',
            // paddingTop: '2rem',
            // dominantBaseline: 'top'
            // pathColor: `hsl(${numberOfReps * 3}, 100%, 50%)`,
            pathColor: `${(counter < 0 ||counter>=1000) ? 'gray' : 'green'}`,
            textColor: '#f88',
            // trailColor: '#d6d6d6',
            trailColor: `${(counter < 0 ||counter>=1000) ? 'gray' : 'none'}`,

            backgroundColor: `${counter < -1  ? 'red' : counter === -1 ? 'yellow' : paceMakerStarted ? 'lightgreen' : showResult ? 'lightblue' : 'red' }`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            // strokeLinecap: 'butt',
          })}
        >
          <p style={{ marginTop: 100, fontSize: '2rem' }}>
            {/* Tap to */}
            {!paceMakerStarted && !showResult && <span> Start</span>}
            {paceMakerStarted && <span> Stop</span>}
            {!paceMakerStarted && showResult && <span> Reset</span>}
            {/* . */}
          </p>
        </CircularProgressbarWithChildren>
      </div>
      {/* } */}

      {/* 
      {!paceMakerStarted && !showResult && <button onClick={() => setPaceMakerStarted(true)}>Start</button>}
      {paceMakerStarted && <button onClick={stopAndLogReps}>Stop</button>}
      {!paceMakerStarted && showResult && <button onClick={resetPaceMaker}>Reset</button>}
       */}

      {showResult &&
        <div>
          {/* <p>You did {numberOfReps} reps.</p> */}
          {/* <p>Save it as current Max<SLink to='/pushups/maxRepsTest'>Here</SLink></p> */}

        </div>}
      {/* <button onClick={() => setPaceMakerStarted(!paceMakerStarted)}>{paceMakerStarted ? 'Stop' : 'Start'}</button> */}
      {/* {paceMakerStarted && <button onClick={startPaceMaker}>Stop</button>} */}


    </div>
  );
};

export default PaceMaker;