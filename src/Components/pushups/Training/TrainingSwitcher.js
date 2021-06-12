import React from 'react';
import { TrainingContext } from './RunTraining';
import CurrentTrainingInfo from './CurrentTrainingInfo';
import ShowSetToDo from './ShowSetToDo';
import StartBreakLogData from './StartBreakLogData';
import BreakContinued from './BreakContinued';
import TrainingFinished from './TrainingFinished';
import {frontEndPushupsUrlRoot} from '../../../globalState/globalVariables'


import pushupsContext from '../state/PushUpsContextState';


const TrainingSwitcher = () => {
  let pushupContext = React.useContext(pushupsContext);

  let trainingContext = React.useContext(TrainingContext);
  // console.log("TC: ", trainingContext);
  let [trainingState, setTrainingState] = trainingContext;
  // console.log("trainingState main: ", trainingState.main);
  // console.log("stage: ", trainingState.stage);
  

  switch (trainingState.stage) {
    case 0: {return <CurrentTrainingInfo/>; break;}
    case 1: {return <ShowSetToDo/>; break;}
    case 2: { return <StartBreakLogData />; break;}
    case 2.5: { return <StartBreakLogData saveDefaultData/>; break;}
    // case 3: { return <BreakContinued/>; break;}
    case 10: {return <TrainingFinished soundOn={pushupContext.user.settings.training.sound} />; break;}
    default: return <p>TrainingSwitcher - Training stage not found.</p>
  }
};

export default TrainingSwitcher;