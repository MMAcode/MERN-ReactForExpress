// import React from 'react';
import React from 'react';
import pushupsContext from './state/PushUpsContextState';
import { returnDaysDifference, returnTrueIfDatesHaveTheSameDay, return0IfLastTrainingDoesntExist1IfDateAsToday2IfDifferentDate } from './functions/basics';

import { postJsonDataUrlAfterAPIpushups, postJsonDataUrlAfterAPI } from '../../functions/postJsonData';
import postJsonData from '../../functions/postJsonData';
import getJsonData from '../../functions/getJsonData';
import { urlRoot } from '../../globalState/globalVariables';

import UserStatusDisplay from './UserStatusDisplay';
import { Route, withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';

import MaxRepsButtonInterface from './menu/MaxRepsButtonInterface';

import styled from 'styled-components'

import { ReactComponent as IconIntro } from '../../images/icons/intro.svg';
import { ReactComponent as IconPlan } from '../../images/icons/plan.svg';
import { ReactComponent as IconPlanMy } from '../../images/icons/planMy.svg';
import { ReactComponent as IconPlanCurrent } from '../../images/icons/planCurrent.svg';
import { ReactComponent as IconTrain } from '../../images/icons/train.svg';
import { ReactComponent as IconTrainWhistle } from '../../images/icons/trainWhistle.svg';
import { ReactComponent as IconHistory } from '../../images/icons/history.svg';
import { ReactComponent as IconSettings } from '../../images/icons/settings.svg';
import { ReactComponent as IconNotifications } from '../../images/icons/notifications.svg';

import IconWrapper from './basicComponents/IconWrapper';
import IconAndText, { IconAndTextInColumn } from './basicComponents/IconAndText';
import AccordionMiro from './basicComponents/AccordionMiro';
import PaceMaker from './assessment/PaceMaker';
import AssessmentForm from './assessment/AssessmentForm';




export const SLink = styled(Link)`
display: block;
/* display: inline-block; */
font-size:1.5rem;
margin:10px;
background-color:orange;
/* background:linear-gradient(180deg,orange 60%, red); */
/* background: linear-gradient(180deg,lightGray 60%, white); */

padding: 5px;
color:black;
border-radius:7px;
text-decoration:none;
text-align: center;
&:hover{ 
  /* background-color:#996b15; */
  /* color:white; */
  text-decoration:none;
  /* font-size:20px; */
}
/* transition: background-color, color; */
transition-duration: 0.25s;
`
export const SLinkDiv = styled.div`
display: block;
font-size:1.5rem;
margin:10px;
background-color:orange;
padding: 3px;
border-radius:3px;
text-decoration:none;
text-align: center;
&:hover{ 
  background-color:#996b15;
  /* color:white; */
  text-decoration:none;
  /* font-size:20px; */
}
/* transition: background-color, color; */
transition-duration: 0.25s;
`


export const returnNumberOfDaysMissingCurrentSchedulleOrUndefined = (user) => {
  if (user.pushupPlans.current === null || user.pushupPlans.current === undefined) return undefined;
  let currentPlan = user.pushupPlans.current;
  let dayToDoFrom0 = currentPlan.scheduleDayToDoFrom0;
  if (dayToDoFrom0 === undefined || dayToDoFrom0 === null || user.pushupPlans.current.assessments.initialAssessmentID === null) return undefined;


  // console.log("TESTS:", dayToDoFrom0);
  // console.log("TESTS:", currentPlan.schedule);
  // console.log("TESTS:", currentPlan.schedule[dayToDoFrom0].dueDate);
  // there is current plan with scheduled day; carry on...
  let trainingThisMAnyDaysAhead = returnDaysDifference(new Date(), currentPlan.schedule[dayToDoFrom0].dueDate);


  // console.log("trainingThisMAnyDaysAhead: ", trainingThisMAnyDaysAhead);
  return trainingThisMAnyDaysAhead;
}

const Home = (props) => {
  const { user, updateUser } = React.useContext(pushupsContext);
  const [info, setInfo] = React.useState("loading Data... (Pray everyone:-)");
  let dueDateIsAheadThisMuch;
  // console.log("running home")
  //check if today's date matches the date of the training to do

  // const [testingCORS, setTestingCORS] = React.useState({ testingCORS: 'not started' });
  // React.useEffect(() => {
  // setTestingCORS({ testingCORS: 'useEffectStarted' });
  // (async () => {
  //   setTestingCORS({ testingCORS: 'asyncF started' });

  //   let ansFromServer1 = await postJsonDataUrlAfterAPIpushups('/testCORS', {});
  //   //     // setTestingCORS({ ...testingCORS, ansFromServer });
  //   setTestingCORS(xx => ({ ...xx, ...ansFromServer1 }));

  //   //     let ansFromServer2 = await postJsonDataUrlAfterAPIpushups('/testCORS2', {});
  //   //     // setTestingCORS({ ...testingCORS, ansFromServer });
  //   //     setTestingCORS(xx => ({ ...xx, ...ansFromServer2 }));
  // })()
  // }, []);

  React.useEffect(() => {
    console.log("home -user useEfect");
    if (user) {

      //update schedule day if needed (=if last training happened, but didn't finish and now is different day --> scheduled day needs to be updated to next number (but not counting break days); and consider final assessment day)
      if (user.pushupPlans
        && user.pushupPlans.current
        && user.pushupPlans.current.trainingHistory
        && user.pushupPlans.current.trainingHistory.length > 0
        && user.pushupPlans.current.trainingHistory[0].completed != true
        && user.pushupPlans.current.trainingHistory[0].scheduleDayUpdated != true
        // && user.pushupPlans.current.trainingHistory[0].hovno != true
      ) {
        //if the date is not today, update schedule day

        const dateAsToday = return0IfLastTrainingDoesntExist1IfDateAsToday2IfDifferentDate(user);

        // let dateToday = new Date();
        // let dateOfLastTraining = user.pushupPlans.current.trainingHistory[0].date;
        // let datesAreTheSame = returnTrueIfDatesHaveTheSameDay(dateToday, dateOfLastTraining);
        // console.log("DATE OF THE LAST TR IS TODAY (1yes,2 no)?", dateAsToday);
        // if (!datesAreTheSame) {
        if (dateAsToday === 2) {
          //update sch day on DB
          console.log("update sch day on DB");
          let doItAsAsync = async () => {
            const updatedUser = await postJsonDataUrlAfterAPIpushups('/updateScheduleDay', {});
            // console.log("updatedUser-rescheduled", updatedUser);
            updateUser({ ...updatedUser });
          }
          doItAsAsync();
        }
      }



      dueDateIsAheadThisMuch = returnNumberOfDaysMissingCurrentSchedulleOrUndefined(user);
      // console.log("dueDateIsAheadThisMuch: ", dueDateIsAheadThisMuch);
      let textInfoFirstLineLocalVariable;
      // switch (dueDateIsAheadThisMuch) {
      // case null:
      //   textInfoLocalVariable = 'loading Data... (Pray everyone:-))';
      //   break;

      //check if training was started already
      let continueTraining = false;

      if (return0IfLastTrainingDoesntExist1IfDateAsToday2IfDifferentDate(user) === 1
        && user.pushupPlans.current.trainingHistory[0].completed != true) { continueTraining = true; }

      //final assessment date (if exists)
      //find in how many days is final assessment (if training has goog schedule = on time or traiining waiting in future)
      let finalAssessmentDueIn;
      if (user.pushupPlans.current
        && user.pushupPlans.current.scheduleDayToDoFrom0
        // && user.pushupPlans.current.schedule
        // && user.pushupPlans.current.schedule[13]
        // && user.pushupPlans.current.schedule[13].date
      ) {
        // console.log("XXXXXXXXXXXXXXXXXX");
        finalAssessmentDueIn = 13 - user.pushupPlans.current.scheduleDayToDoFrom0;
      }

      // console.log("XXDD", dueDateIsAheadThisMuch)
      // dueDateIsAheadThisMuch = 1;
      textInfoFirstLineLocalVariable =
        // dueDateIsAheadThisMuch<10 ? 'ahoj' :
        dueDateIsAheadThisMuch === undefined ?
          (user.pushupPlans.current ? (user.pushupPlans.current.assessments.initialAssessmentID === null ? 'Whenever you are ready' : 'no scheduled date')
            : 'Select training Plan First'
          )
          // : dueDateIsAheadThisMuch === 0 ? <>{continueTraining ? 'Continue Started Training' : 'Your training is Due'}{finalAssessmentDueIn !== undefined && <p>Final assessment due in 21 days.</p>}</>
          : dueDateIsAheadThisMuch === 0 ? 'Your training is Due'
            : dueDateIsAheadThisMuch === 1 ? 'tomorrow'
              : dueDateIsAheadThisMuch > 1 ? `in ${dueDateIsAheadThisMuch} days`
                : dueDateIsAheadThisMuch === -1 ? `You are 1 day late.`
                  : dueDateIsAheadThisMuch < -1 ? `You are ${-dueDateIsAheadThisMuch} days late.`
                    : '-...-';

      // console.log("textInfoFirstLineLocalVariable: ", dueDateIsAheadThisMuch, textInfoFirstLineLocalVariable);
      setInfo({
        textLine1: continueTraining, //show only if exists
        textLine2: textInfoFirstLineLocalVariable,
        textLine3: finalAssessmentDueIn, //show only if exists
        days: dueDateIsAheadThisMuch,

      });
      // setTextInfo("Ahoj");
    } else {
      //this is a guest i guess... reset buttons' texts
      setInfo({
        textLine1: undefined, //show only if exists
        textLine2: undefined,
        textLine3: undefined, //show only if exists
        days: undefined,
      });
    }



    /////load final assessment continuation if appropriate
    //1)load log final assessment reps
    let isDayOfLastAssessmentToday = () => {
      let assDate = user.assessments[0].date;
      let today = new Date();
      return returnTrueIfDatesHaveTheSameDay(assDate, today);
    }
    if (user?.pushupPlans?.current?.scheduleDayToDoFrom0 === 13
      && isDayOfLastAssessmentToday()
      && user?.pushupPlans?.current?.assessments?.finalAssessmentID === null
      && returnTrueIfDatesHaveTheSameDay(user?.pushupPlans?.current?.schedule[13].dueDate, new Date())
    ) {
      console.log("continue in Final assessment process... Load component...");
      props.history.push('/pushups/startMyTraining');
    }

    // //2) load evaluation form
    // if (user?.pushupPlans?.current?.scheduleDayToDoFrom0 === 13
    //   && user?.pushupPlans?.current?.assessments?.finalAssessmentID) {
    //   console.log("continue in Final assessment process... Load Eval component...");
    //   // props.history.push('/pushups/startMyTraining');
    // }
  }, [user]);


  // console.log("textInfo: ", info.textLine2);

  const cookieTestButtonClicked = async (getOrPost) => {
    if (getOrPost === 'get') {
      await getJsonData(`${urlRoot}/start`, { credentials: 'include' });
    } else {
      // await postJsonDataUrlAfterAPI('/start', {}); //works to change cookies
      // await postJsonData('/api/start', {});//works to change cookies
      await postJsonData(`${urlRoot}/start`, {});//works to change cookies
      // await postJsonData(`http://localhost:3001/api/start`, {});//works to change cookies
      // await postJsonData(`api/start`, {});//works to change cookies
      // await postJsonData(`http://localhost:3000/api/start`, {});//works to change cookies
    }
  }

  const [currentPlanUrl, currentPlanUrlSET] = React.useState('/');
  React.useEffect(() => {
    if (user?.pushupPlans?.current) {
      let type = user.pushupPlans.current.personal;
      let urlPartType;
      let planId = user.pushupPlans.current.planIDType;
      if (type === 'yes-only') urlPartType = 'inDevelopment';
      if (type === 'yes-finished') urlPartType = 'finished';
      if (type === 'public') urlPartType = 'public';

      let finalUrl = `/pushups/trainingPlans/view/${urlPartType}/${planId}`;
      currentPlanUrlSET(finalUrl);
    }
  }, [user]);

  const viewCurrentPlanButtonClicked = () => {
    console.log(currentPlanUrl);

    // let type = user.pushupPlans.current.personal;
    // let urlPartType;
    // let planId = user.pushupPlans.current.planIDType;
    // if (type === 'yes-only') urlPartType = 'inDevelopment';
    // if (type === 'yes-finished') urlPartType = 'finished';
    // if (type === 'public') urlPartType = 'public';

    // props.history.push({
    //   pathname: `/pushups/trainingPlans/view/${urlPartType}/${planId}`,
    //   // state: {
    //   //   personalPlanPositionFrom0: positionFrom0,
    //   //   plan: user.pushupPlans.personal[positionFrom0]
    //   // }
    // });
  }

  const takeUserToPersonalPlansViewButtonClicked = () => {

  }

  return (
    <div style={{ position: 'relative' }}>
      <h1 style={{ fontSize: '7vw', marginTop: '20px', marginBottom: '0', textAlign: 'center' }}>Tested Pushups Plans</h1>
      <p style={{ fontSize: '4vw', textAlign: 'center', color: 'gray', padding: '0 10px' }}>
        {/* 2 week plans <br /> */}
        {/* to do more pushups. </p> */}
        {/* Whatever happens, PUSH yourself UP. </p> */}
        Fastest way to make more pushups.
        </p>
      {/* <p style={{ fontSize: '4vw', textAlign: 'center', color: 'gray',padding:'0 10px'  }}> */}
      {/* 14 days commitment. <br/>Can you do it?</p><br/> */}

      <Route exact path='/' component={UserStatusDisplay} />
      <Route path='/pushups' component={UserStatusDisplay} />


      {/* onesignal web push notifications */}
      {/* <div class='onesignal-customlink-container'></div> */}

      {/* <p>{JSON.stringify(testingCORS)}</p> */}
      {/* <button onClick={() => cookieTestButtonClicked('get')}>Test cookies GET</button> */}
      {/* <button onClick={() => cookieTestButtonClicked('post')}>Test cookies POST</button> */}
      <div style={{ textAlign: 'center' }}>
        <Link
          className='buttonIconVerticalWrapper'
          style={{
          }} to='/pushups/intro'>

          {/* <IconWrapper flex='0 1 100px'>        <IconIntro />        </IconWrapper>
          <span >Intro/About</span> */}

          <IconAndTextInColumn>
            <IconIntro />
            {/* <span></span> */}
            <span style={{
              // padding: '0',
              // color: 'gray',
              // fontSize: '0.8rem'
            }}>Intro</span>

          </IconAndTextInColumn>

        </Link>
        {/* <span style={{padding:'0', color:'gray',fontSize:'0.8rem'}}>Intro</span> */}
      </div>



      {/* <SLink to='/pushups/maxRepsTest' style={{ fontSize: '1.1rem' }}>
        Update My Max Reps
      {user && user.assessments && ` (${user.assessments[0].reps})`}
      </SLink> */}


      <MaxRepsButtonInterface openByDefault={(user?.assessments?.length > 0) ? false : true}>
        {/* <IconMaxRepsTest/> */}
      </MaxRepsButtonInterface>
      {/* <MaxRepsButtonInterface openByDefault/> */}





      <div style={{
        textAlign: 'center', marginTop: '20px',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between'
      }}>
        {user && user.assessments && (
          user.pushupPlans.current ? <>
            {/* <SLinkDiv
          style={{
            // backgroundColor: 'lightGray',
            background: 'linear-gradient(180deg,lightGray 60%, white)',
            boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
            // display: 'flex', alignItems: 'center', justifyContent: 'space-around'
          }}
        > */}

            <Link
              className='buttonIconVerticalWrapper'
              style={{
              }}
              to='/pushups/trainingPlans/public'>

              <IconAndTextInColumn>
                <IconPlan />
                <span>Training Plans</span>
              </IconAndTextInColumn>

            </Link>

            {/* name of current plan: */}
            {/* <button onClick={viewCurrentPlanButtonClicked} */}
            {user && user.pushupPlans.current &&
              <Link to={currentPlanUrl}
                className='buttonIconVerticalWrapper'
                style={{
                  zIndex: '2',
                  // transform: 'translateY(-10px)',
                }}
              >
                <IconAndTextInColumn width='25'>
                  <IconPlanCurrent />
                  <span style={{ fontSize: '1rem' }}> Current</span>
                </IconAndTextInColumn>
                {/* </button> */}
              </Link>
            }

            <Link

              className='buttonIconVerticalWrapper'
              style={{
              }} to='/pushups/trainingPlans/personal'>

              <IconAndTextInColumn>
                <IconPlanMy />
                <span>My Plans </span>
              </IconAndTextInColumn>
            </Link>
          </>
            : <SLink
              style={{
                background: 'linear-gradient(180deg,#ff6c00 60%, #ff6c0070)',
                animation: `AnimatedButtonMiro 4s infinite 0s ease-in-out`,
              }}
              to='/pushups/trainingPlans/public'>

              <IconAndText>
                <IconPlan />
                <span>Select Training Plan</span>
              </IconAndText>

            </SLink>)}





      </div>


      {/* TRAINING BUTTON START */}

      {
        (user?.pushupPlans?.current?.completed === true && user?.pushupPlans?.current?.evaluation.state != 'finished') ?
          <SLink style={{
            backgroundColor: 'orange',
            boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
          }} to='/pushups/endOfPlanExecutionEvaluation'>Evaluate Finished Plan</SLink>
          :

          ((info.days > 0 || info.textLine2 === 'Select training Plan First')
          ) ?
            //training is in the future (or no plan selected) (=gray button):
            (info.textLine2 === 'Select training Plan First' ? null : <SLink to='/pushups'
              style={{
                backgroundColor: 'gray', fontSize: '1rem',
                color: 'lightBlue',
                cursor: 'not-allowed', boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
              }}
            >
              <IconAndText>
                <IconTrainWhistle />
                <div>
                  {info.textLine2 === 'Select training Plan First' ? 'Start' : 'Next'} Training
                <p style={{ fontSize: '2rem', color: 'white' }}>{info.textLine2}</p>
                </div>
              </IconAndText>
            </SLink>) :
            <SLink to='/pushups/startMyTraining' style={{
              // backgroundColor: '#e86b00',
              background: 'linear-gradient(180deg,#ff6c00 60%, #ff6c0070)',
              animation: `AnimatedButtonMiro 4s infinite 0s ease-in-out`,
            }}>

              <IconAndText>
                {/* <div> */}
                <IconTrainWhistle />
                {/* <IconTrain /> */}
                {/* </div> */}
                <div>
                  {info.textLine1 ? 'Continue training' : 'Start Training'}
                  <p style={{ fontSize: '1rem', color: 'lightGray' }}>{info.textLine2}</p>
                  { //info about final assessment:
                    info.textLine3 < 23 &&
                    <p style={{ fontSize: '1rem', color: 'gray' }}>{info.textLine3 === 0 ? 'Final assessment is Due Today' : `(${info.textLine3} day${info.textLine3 === 1 ? '' : 's'} to Final Assessment)`}</p>}
                </div>
              </IconAndText>


            </SLink>
      }
      <div style={{ textAlign: 'center' }}>

        {/* show only if user exists: */}
        {user && user.assessments && <Link
          className='buttonIconVerticalWrapper'
          style={{
          }} to='/pushups/history'>

          {/* <IconAndText>
          <IconHistory />
          <span style={{ padding: '0 20px' }}>History</span>
        </IconAndText> */}
          <IconAndTextInColumn>
            <IconHistory />
            <span>History</span>
          </IconAndTextInColumn>

        </Link>}


        {/* <SLink to='/pushups/history'>History</SLink> */}
        {/* show only if user exists:<SLink to='/pushups/community'>Community</SLink> */}

        {/* show only if user exists: */}<Link
          className='buttonIconVerticalWrapper'
          style={{
          }} to='/pushups/settings'>

          {/* <IconAndText>
            <IconSettings />
            <span></span>
          </IconAndText> */}
          <IconAndTextInColumn>
            <IconSettings />
            <span>Settings</span>
          </IconAndTextInColumn>
        </Link>

        {user?.name != 'Guest' && <Link
          className='buttonIconVerticalWrapper'
          style={{
          }} to='/pushups/settings'>

          <IconAndTextInColumn>
            <IconNotifications />
            {/* <span>Settings</span> */}
            <span>Reminders</span>
          </IconAndTextInColumn>
        </Link>}
      </div>
      <div style={{ width: '100%' }}>
        <p style={{ color: 'gray', fontSize: '10px', textAlign: 'center' }}>App version: 3.05</p>
        <p style={{ color: 'gray', fontSize: '10px', textAlign: 'center' }}>Whatever happens, PUSH yourself UP.</p>
      </div>
      {user?.authority?.power > 99
        && user?.pushupPlans?.current?.schedule[0]?.dueDate && < div >
          <p>Developer</p>
          <p>scheduleDayToDoFrom0: {user?.pushupPlans?.current?.scheduleDayToDoFrom0}</p>
          <p>schedule dates: </p>
          {user?.pushupPlans?.current?.schedule.map((day, index) => <p key={index}>{index}) trNr: {day.trainingNumber} {day.dueDate}</p>)}
        </div>}
    </div>
  );
};

export default withRouter(Home);