import React from 'react';

import PushUpsContext from '../state/PushUpsContextState';
import { TrainingContext } from './RunTraining';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData'

import { SCounter, SCounterSmall } from '../personalPushupPlans/Set';
import imgMinus from '../img/minus.png';
import imgPlus from '../img/plus.png';
import CounterTool from '../basicComponents/CounterToolOld';
import BreakTimer from './BreakTimer';
import BreakSounds from './BreakSounds';
import CounterAllIn from '../basicComponents/CounterAllIn';
import { returnAssessmentFromAssID } from '../functions/basics';


import useSound from 'use-sound';
import soundBreakBackground from '../../sounds/files/breakMusic/Derek_Clegg_-_09_-_Youre_The_Dummy.mp3';

import { Accordion, Card } from 'react-bootstrap';
import styled from 'styled-components';
const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
background-color: rgba(233, 154, 7, 0.62);
margin: 0 5px 8px 5px;
`
let stopMusic = false;

const StartBreakLogData = ({ saveDefaultData }) => {


  const [breakTimerFinished, setBreakTimerFinished] = React.useState(false);
  let pushupContext = React.useContext(PushUpsContext);
  let trainingContext = React.useContext(TrainingContext);
  let [trainingState, setTrainingState] = trainingContext;
  let set = trainingState.main.set;


  // const [breakDuration, setBreakDuration] = React.useState(-1); //if 0, numbers don't add up elsewhere. don't change!
  const [breakDuration, setBreakDuration] = React.useState(0); //new version

  const [setWasSavedToHistory, setSetSavedToHistory] = React.useState(trainingState.main.set.reps ? false : true);
  const [updatedReps, setUpdatedReps] = React.useState(set.reps);
  const [updatedRepsForChangesInPlan, setUpdatedRepsForChangesInPlan] = React.useState(set.reps);
  const [updatedRepsAsPercentageForChangesInPlan, setUpdatedRepsAsPercentageForChangesInPlan] = React.useState(set.repsAsPercentage ? set.repsAsPercentage : undefined);
  let isLastSet = trainingState.main.setNumberFrom1 >= trainingState.main.training.sets.length ? true : false;

  const [notes, setNotes] = React.useState(trainingState.main.set.repsNotes);
  const [notesForChangesInPlan, setNotesForChangesInPlan] = React.useState(trainingState.main.set.repsNotes);
  const [changePlan, setChangePlan] = React.useState(false);

  //for break2.0
  // const [breakStartedAt, setBreakStartedAt] = React.useState(new Date());
  const [breakStartedAt] = React.useState(new Date());
  // let breakStartedAt;
  // React.useEffect(() => {
  //   console.log("SAVING HISTORY STARTING - use effect running");
  //   breakStartedAt = new Date();
  // }, []);



  // const updateNotes = async () => {
  //   await ;
  // }

  const registerPlanChanges = (number) => {
    setUpdatedRepsForChangesInPlan(number);
    setChangePlan(true);
  }
  //save data
  const saveRepsToHistory = async () => { //onClick function
    console.log("SAVING HISTORY STARTING");
    setSetSavedToHistory(true); //here!?!?

    let setToSave = {
      reps: updatedReps,
      executedRepsAsPercentageOfInitialAssessment: updatedReps / trainingState.main.initialAssessmentRepsNumber * 100, //%$£101
      repsNotes: notes,
      date: new Date(),
      break: { startedAt: breakStartedAt }
    }
    // console.log("setToSave: ", setToSave);

    const add1ToSetsDone = () => {
      trainingState.main.setsDone = trainingState.main.setsDone + 1;
      setTrainingState({ ...trainingState });
    }

    //IF saving FIRST SET
    if (trainingState.main.setsDone === 0 && trainingState.main.continueStartedTraining === false) {
      //create training in user's history
      console.log("Saving first set. create training in user's history...")
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/startNewTraining',
        {
          trainingNumber1IsFirst: trainingState.main.trainingNumber,
          trainingName: trainingState.main.training.name,
          trainingStartedAt: trainingState.main.trainingStartedAt,
          set: setToSave
        });
      pushupContext.updateUser({ ...updatedUser });
      console.log("NEW TRAINING IN HISTORY (with 1 set) was CREATED, sets done updated. (Both user and training context should be refreshed.)");
    } else {
      let thisTrHistory = pushupContext.user.pushupPlans.current.trainingHistory[0];
      thisTrHistory.sets.unshift(setToSave);
      // trainingState.main.trExecution.sets.unshift(setToSave);
      // let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateTrainingExecution', trainingState.main.trExecution);
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateTrainingExecution', thisTrHistory);
    }
    add1ToSetsDone();

    //update changes in the plan?
    console.log("change plan data: ", changePlan, updatedRepsForChangesInPlan, notesForChangesInPlan);
    // console.log("sets done: ", trainingState.main.setsDone);
    if (changePlan) {

      let planDataToUpdate = { reps: updatedRepsForChangesInPlan, repsNotes: notesForChangesInPlan, repsAsPercentage: updatedRepsAsPercentageForChangesInPlan };
      console.log("plan shall be updated", planDataToUpdate);
      const updatedUserX = await postJsonDataUrlAfterAPIpushups('/saveChangesInPersonalPlanContentUsingPlanID', { planDataToUpdate });
      // console.log("dataFromBackend: ", updatedUserX);

      pushupContext.updateUser({ ...updatedUserX });
      // pushupContext.updateUser(updatedUserX);
      // for (let i = 1; i < 100; i++) {

      //         await new Promise(resolve => setTimeout(resolve, 100));
      //         console.log("S0 current training info set1: ", pushupContext.user.pushupPlans.personal[2].trainings[0].sets[0]);
      //         console.log("S0 current training info set2: ", pushupContext.user.pushupPlans.personal[2].trainings[0].sets[1]);
      //       }

      // console.log("S1 current training info set1: ", pushupContext.user.pushupPlans.personal[2].trainings[0].sets[0]);
      // console.log("S1 current training info set2: ", pushupContext.user.pushupPlans.personal[2].trainings[0].sets[1]);
      // console.log("UUUUUU Set In Plan shall be updated.")
      setChangePlan(false);
    }


    // set the next training
    if (isLastSet) {
      console.log("XXXXXX this was L A S T set: ", isLastSet);
      //mark this training as completed

      let updatedUser2 = await postJsonDataUrlAfterAPIpushups('/setTheNextTraining', { markLastTrainingAsSuccessfullyCompleted: true });
      pushupContext.updateUser({ ...updatedUser2 });
    }
    console.log("SAVING HISTORY FINISHING");
    // console.log("Scurrent training info set1: ", pushupContext.user.pushupPlans.personal[2].trainings[0].sets[0]);
    // console.log("Scurrent training info set2: ", pushupContext.user.pushupPlans.personal[2].trainings[0].sets[1]);
  }

  //if user selected to SAVE Predefined Reps (or duration-in the future)
  let hideRepsToSave = false;
  if (saveDefaultData && !setWasSavedToHistory) {
    hideRepsToSave = true;
  }

  React.useEffect(() => {
    if (saveDefaultData) {
      saveRepsToHistory();
    }
  }, []);

  //for music and extending breaks
  // let remindingBreakTime = set.breakAfterInSeconds - breakDuration;
  const [remindingBreakTime, setRemindingBreakTime] = React.useState(set.breakAfterInSeconds);
  const [breakExtensionInSeconds, setBreakExtensionInSeconds] = React.useState(0);

  ///MUSIC
  const [soundBreakBackgroundPlay, BackgroundMusicSettings] = useSound(soundBreakBackground);
  const [backgroundMusicFaded, setBackgroundMusicFaded] = React.useState(false);
  const [backgroundMusicFaded2, setBackgroundMusicFaded2] = React.useState(false);
  const [backgroundMusicStarted, setBackgroundMusicStarted] = React.useState(false);
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = React.useState(false);



  React.useEffect(() => {
    // console.log("musicOn? ", pushupContext.user.settings.training.music);
    // console.log("backgroundMusicPlaying", backgroundMusicPlaying);
    // console.log("backgroundMusicFaded", backgroundMusicFaded);
    if (!pushupContext.user.settings.training.music) {  //don't play music if that is user's setting
      if (backgroundMusicStarted && backgroundMusicPlaying && !backgroundMusicFaded && BackgroundMusicSettings.sound) {// stop music in case it was playing
        // console.log("userFade");
        BackgroundMusicSettings.sound.fade(1, 0, 1000);
        // setBackgroundMusicFaded(true);
        setBackgroundMusicPlaying(false);
      }
      return;
    }

    console.log("remindingBreakTime: ", remindingBreakTime);
    // console.log(BackgroundMusicSettings.sound)

    if (breakDuration >= 2 && BackgroundMusicSettings.sound && !backgroundMusicPlaying && !backgroundMusicFaded) { //smaller number could cause error as music may not be ready
      // console.log("playing-volume up")
      BackgroundMusicSettings.sound.fade(0, 1, 4000);
      setBackgroundMusicPlaying(true);
      if (!backgroundMusicStarted) { soundBreakBackgroundPlay(); console.log("play-Start") }
      setBackgroundMusicStarted(true);
    }
    if (remindingBreakTime <= 13 && backgroundMusicPlaying && !backgroundMusicFaded2 && BackgroundMusicSettings.sound) {
      // console.log("fading prep");

      BackgroundMusicSettings.sound.fade(1, 0.3, 1000);
      setBackgroundMusicFaded2(true);
    }
    if (remindingBreakTime <= 10 && backgroundMusicPlaying && !backgroundMusicFaded && BackgroundMusicSettings.sound) {
      // console.log("fading main");
      BackgroundMusicSettings.sound.fade(0.3, 0, 5000);
      setBackgroundMusicFaded(true);
      setBackgroundMusicPlaying(false);
      // console.log("FADE set to TRUE!!")
    }
  }, [breakDuration, pushupContext])




  const moveToTheNextStage = async () => {
    // console.log("MOVE TO THE NEXT STAGE f.");

    //save currently finished break duration (and notes)...
    if (!isLastSet) {
      let thisTrHistory = pushupContext.user.pushupPlans.current.trainingHistory[0];
      thisTrHistory.sets[0].breakDuration = breakDuration;
      thisTrHistory.sets[0].breakNotes = trainingState.main.set.breakNotes;
      thisTrHistory.sets[0].break.finishedAt = new Date();

      let updatedUser = await postJsonDataUrlAfterAPIpushups('/updateTrainingExecution', thisTrHistory);
      pushupContext.updateUser({ ...updatedUser });

      trainingState.main.setNumberFrom1 = thisTrHistory.sets.length + 1;
      trainingState.main.set = trainingState.main.training.sets[trainingState.main.setNumberFrom1 - 1];
      trainingState.stage = 1;
    } else {
      //move to the next stage...
      trainingState.stage = 10; //on the end by adding 1 to stage it will finish
    }
    console.log("trainingStateXX", trainingState);
    setTrainingState({ ...trainingState });

    //fade music
    console.log("FADE???", backgroundMusicFaded)
    if (backgroundMusicPlaying && backgroundMusicFaded == false && BackgroundMusicSettings.sound) {
      console.log("FADE-YES");
      BackgroundMusicSettings.sound.fade(1, 0, 1000);
    }
  }

  React.useEffect(() => {
    if ((breakTimerFinished || isLastSet) && setWasSavedToHistory) {
      // console.log("set saved and break finished -> time to update page")
      moveToTheNextStage();
    }
  }, [breakTimerFinished, setWasSavedToHistory]);



  //plan with %
  const returnsUpdatedPercentagesValue = (newPercentageValue) => {
    setUpdatedRepsAsPercentageForChangesInPlan(newPercentageValue);
    let initialAssesmentReps = returnAssessmentFromAssID(pushupContext.user, pushupContext.user.pushupPlans.current.assessments.initialAssessmentID).reps;
    // console.log("initialAssesmentReps:", initialAssesmentReps);
    // setUpdatedRepsForChangesInPlan;
    let calculatedReps = Math.round(newPercentageValue / 100 * initialAssesmentReps);
    setUpdatedRepsForChangesInPlan(calculatedReps);
    setChangePlan(true);
  }

  const returnupdatedRepsAsPartOfPercentagesValue = (newRepValue) => {
    setUpdatedRepsForChangesInPlan(newRepValue);
    let initialAssesmentReps = returnAssessmentFromAssID(pushupContext.user, pushupContext.user.pushupPlans.current.assessments.initialAssessmentID).reps;
    // console.log("initialAssesmentReps:", initialAssesmentReps);
    // setUpdatedRepsForChangesInPlan;
    let calculatedPercentages = Math.round(newRepValue / initialAssesmentReps * 100);
    setUpdatedRepsAsPercentageForChangesInPlan(calculatedPercentages);
    setChangePlan(true);
  }

  // if (pushupContext.user) console.log("set.repsAsPercentage: ", set.repsAsPercentage);


  //extend break time
  // const [remindingBreakTime, setRemindingBreakTime] = React.useState(trainingState.main.set.breakAfterInSeconds);

  const extendBreakBy = secondsToExtend => {
    setBreakExtensionInSeconds(previousState => previousState + 30);
  }

  return (
    <div>

      {!isLastSet && <BreakSounds soundsOn={pushupContext.user.settings.training.sound} breakDuration={breakDuration} breakLength={set.breakAfterInSeconds} remindingBreakTime={remindingBreakTime} />}
      {!isLastSet ? <span>Break: <BreakTimer external={{ breakTimerFinished, setBreakTimerFinished }} duration={{ breakDuration, setBreakDuration }} timeLeft={{ remindingBreakTime, setRemindingBreakTime }} breakExtensionInSeconds={breakExtensionInSeconds} breakStartedAt={breakStartedAt} /> </span> : <span>This is the last set.</span>}
      <button onClick={() => extendBreakBy(30)}>+30 seconds</button>
      {/* Skip break btn. */}  {setWasSavedToHistory && <button onClick={moveToTheNextStage}>Skip break</button>}

      {/* LOGGING DATA */}
      {set.reps && !setWasSavedToHistory && hideRepsToSave == false &&
        <div>
          {/* reps history */}
          <div style={{ backgroundColor: 'brown', padding: '5px', margin: '5px' }}>
            <h1>Save to training history...</h1>
            <p>(assuming reps needs to be logged, not time)</p>
            <p>Reps done: </p>

            {/* <CounterTool small={1} big={5} value={updatedReps} setValue={setUpdatedReps} /> */}
            <CounterTool small={1} big={5} value={updatedReps} setValue={setUpdatedReps} />

            {/* notes */}

            <p>{notes ? 'Adjust' : 'Add'} note:</p>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ height: '100px', width: '100%' }} ></textarea>
            <br />
            {/* <button style={{ margin: '10px' }} onClick={saveRepsToHistory}>{isLastSet ? 'Save set and finish training' : 'Save set'}</button> */}
          </div>

          {/* Adjust this set in the plan (if it is personal adjustable plan) */}
          {trainingState.main.plan.personal && trainingState.main.plan.personal === 'yes-only' &&
            <Accordion className='p-3' style={{ backgroundColor: 'orange' }}>
              <Card >
                <Accordion.Toggle as={Card.Header} eventKey="1" className="p-3 mb-2 bg-info text-white MMpointer  text-center btnOpacity">
                  Adjust this set also in my pushup plan
              </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <SCard>
                    <p>(assuming reps needs to be logged, not time)</p>

                    {!set.repsAsPercentage && <div>
                      <p>Reps to do: </p>
                      <CounterTool small={1} big={5} value={updatedRepsForChangesInPlan} setValue={registerPlanChanges} />

                    </div>}

                    {set.repsAsPercentage &&
                      <div>
                        <CounterAllIn settings={[1, 5, returnsUpdatedPercentagesValue, updatedRepsAsPercentageForChangesInPlan, '%', 'of Max Reps']} />
                        {/* <p style={{ textAlign: 'center' }}>makes... </p> */}
                        <p style={{ textAlign: 'center' }}>= </p>
                        <CounterAllIn settings={[1, 5, returnupdatedRepsAsPartOfPercentagesValue, updatedRepsForChangesInPlan, 'reps']} />
                      </div>}

                    <p>{notes ? 'Adjust' : 'Add'} note:</p>
                    <textarea value={notesForChangesInPlan} onChange={(e) => { setNotesForChangesInPlan(e.target.value); setChangePlan(true) }} style={{ height: '100px', width: '100%' }} ></textarea>
                    <br />
                  </SCard>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          }


          <button style={{ display: 'block', width: '80%', margin: '10px 10%', fontSize: '2rem', textAlign: 'center' }} onClick={saveRepsToHistory}>{isLastSet ? 'Save and finish training' : 'Save'}</button>
        </div>}

      {/* show BREAK info if it exists: */}
      {
        !isLastSet && setWasSavedToHistory && trainingState.main.set.breakNotes &&
        <div>
          <h2>Break info:</h2>
          <p>{trainingState.main.set.breakNotes}</p>
        </div>
      }

      {/* show next set info if it exists: */}
      {
        !isLastSet && setWasSavedToHistory &&
        <div style={{textAlign: 'center', background: 'red', background:'linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(255,163,0,1) 7%, rgba(255,145,0,1) 94%, rgba(193,255,0,0.00017507002801120386) 100%)'}}>
          <br />
          <h2 style={{ textAlign: 'center' }}>Next set:</h2>
          <p style={{ fontSize: '20vw' }}>{trainingState.main.training.sets[trainingState.main.setNumberFrom1].reps ?
            trainingState.main.training.sets[trainingState.main.setNumberFrom1].reps + 'reps'
            : trainingState.main.training.sets[trainingState.main.setNumberFrom1].duration + 'seconds'}
          </p>
          <p style={{ fontSize: '10vw', paddingBottom:'20px'}}>{trainingState.main.training.sets[trainingState.main.setNumberFrom1].repsNotes && trainingState.main.training.sets[trainingState.main.setNumberFrom1].repsNotes}</p>
        </div>
      }



    </div >
  );
};

export default StartBreakLogData;