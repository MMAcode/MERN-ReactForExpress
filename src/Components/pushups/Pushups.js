import React, { Component } from 'react';
import UserStatus from './UserStatus';
import PushUpPlans from './PushUpPlans';
import globalStyles from './styles/globalStyles2.scss'
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import PrepareTraining from './Training/PrepareTraining';
import PushupsHome from './Home';
import PushUpsContext  // , { pushUpsState }
  from './state/PushUpsContextState';
import MaxRepsTest from './assessment/MaxRepsTest';
// import { SLink } from '../../App'
import History from './History'
import SignUpInOut from './SignUpInOut';
import AdjustPersonalPushupPlan from './personalPushupPlans/AdjustPersonalPushupPlan';
import CreatingPersonalPushupPlan from './personalPushupPlans/CreatingPersonalPushupPlan';
import RunTraining from './Training/RunTraining';
import ShowSetToDo from './Training/ShowSetToDo';
import PaceMaker from './assessment/PaceMaker';
import PrepareTraining2 from './Training/PrepareTraining';

import Sidebar from "react-sidebar";
import SideBarContent from './SideBarContent';
import FinishPersonalPushupPlan from './personalPushupPlans/FinishPersonalPushupPlan';
import ViewPushupPlan from './pushupPlans/ViewPushupPlan';
import PublishPushupPlan from './personalPushupPlans/PublishPushupPlan';
import { postJsonDataUrlAfterAPIgeneralPushups } from '../../functions/postJsonData';
import styled from 'styled-components';
import Intro from './Intro';
import Community from './Community';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
import UserSettingsCheck from './UserSettingsCheck';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from './ErrorBoundary';
import PlanEvaluation from './PlanEvaluation';
import DeveloperResults from './planEvaluation/DeveloperResults';
import FinishedExecutions from './history/FinishedExecutions';

import IconAndText from './basicComponents/IconAndText';
import { ReactComponent as IconHome } from '../../images/icons/home.svg';
import { ReactComponent as IconAudio } from '../../images/icons/audio.svg';
import {frontEndPushupsUrlRoot} from '../../globalState/globalVariables'

export const SLink = styled(Link)`
margin:auto 5px;
background-color:orange;
padding: 10px;
border-radius:3px;
text-decoration:none;
text-align: center;
&:hover{ 
  background-color:#996b15;
  color:white;
  text-decoration:none;
  /* font-size:20px; */
}
/* transition: background-color, color; */
transition-duration: 0.25s;
`


//stitch:
// import { StitchAuthProvider, useStitchAuth } from "./stitch/ReactStitchAuth";

const PushupsMain = ({ location: { pathname } }) => {
  //React Context
  // let context2 = useContext(PushUpsContext);
  // console.log("XXXXXXXXXXXXXXXXXXXXXX");

  ///get public plans
  // const [publicPlans, setPublicPlans] = React.useState(null);
  let { miroError, publicPlans, updatePublicPlans, allUsers, updateAllUsers } = React.useContext(PushUpsContext);
  // let { allUsers, updateAllUsers } = React.useContext(PushUpsContext);
  const pwaLaunchedInInfo = React.useRef(null);
  const pwaBeforeInstallFired = React.useRef(null);
  const pwaInstalled = React.useRef(null);
  const [pwaReadyToInstall, setPwaReadyToInstall] = React.useState(null);
  const [pwaDisplayMode, setPwaDisplayMode] = React.useState('?view?')


  // const [pwaReadyToInstallTest, setPwaReadyToInstallTest] = React.useState('a');


  //////PWA "save app" handling-----------------------PWA START
  //install PWA prompt/event
  let deferredPrompt;
  const dealWithPWAPrompt = (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e;
    setPwaReadyToInstall(e);
    // setPwaReadyToInstallTest('b');
    // alert("beforeinstallprompt event fired, e(vent) shall be saved");
    // pwaBeforeInstallFired.current.innerHTML = `i.e.Fired`;
    console.log("PWA PWA PWA PWA PWA beforeinstallprompt event fired, e(vent) shall be saved");
    // Stash the event so it can be triggered later.

    // Update UI notify the user they can install the PWA
    // showInstallPromotion();
  }
  window.addEventListener('beforeinstallprompt', dealWithPWAPrompt);
  // app installed event
  const dealWithAppWasInstalledEvent = e => {
    // alert('PWA was installed! well done 👍 :-).');
    pwaInstalled.current.innerHTML = `installed`;
    console.log('PWA was installed! well done 👍 :-).');
  }
  window.addEventListener('appinstalled', dealWithAppWasInstalledEvent);
  //app (PWA) launched from tab vs standalone event
  const registerHowAppWasLaunched = (e) => {
    // console.log("---------------------registerHowAppWasLaunched");
    let displayMode = 'tab';
    if (navigator.standalone) {
      displayMode = 'app-ios';
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      displayMode = 'app';
    }
    // Log launch display mode to analytics
    // alert(`DISPLAY_MODE_LAUNCH: ${displayMode}`);
    // pwaLaunchedInInfo.current.innerHTML = `${displayMode}`;
    // pwaLaunchedInInfo.current.innerHTML = `xx`;
    setPwaDisplayMode(displayMode);
    // console.log('DISPLAY_MODE_LAUNCH:', displayMode);

    //Track when the display mode changes
    // window.matchMedia('(display-mode: standalone)').addListener((evt) => {
    //   let displayMode = 'browser tab';
    //   if (evt.matches) {
    //     displayMode = 'standalone';
    //   }
    //   // Log display mode change to analytics
    //   alert(`DISPLAY_MODE_CHANGED: ${displayMode}`);
    //   console.log(`DISPLAY_MODE_CHANGED: ${displayMode}`);
    // });

  }
  window.addEventListener('DOMContentLoaded', registerHowAppWasLaunched);
  //button to install PWA app
  // buttonInstall.addEventListener('click', (e) => {
  const installPwaButtonClicked = () => {
    // Hide the app provided install promotion
    // hideMyInstallPromotion();
    // Show the install prompt
    if (pwaReadyToInstall === null) {
      alert('Event not available anymore');
      return;
    }
    pwaReadyToInstall.prompt();
    // Wait for the user to respond to the prompt
    pwaReadyToInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setPwaReadyToInstall(null);
    });
  };
  //-----------------------------------------------------PWA END



  // console.log("PUBLIC LANS: ", publicPlans);
  React.useEffect(() => {
    const doAsAsync = async () => {
      // console.log("P app STARTED");
      try {
        // console.log("REQUESTING ALL -PLANS- FROM SERVER");
        // let publicPlans = await postJsonDataUrlAfterAPIgeneralPushups('/getPublicPlan_s', {});
        let publicPlansHereLocally = postJsonDataUrlAfterAPIgeneralPushups('/getPublicPlan_s', {});
        // let publicPlans;
        // console.log("POST - publicPlans received from Server: ", publicPlans);


        // console.log("REQUESTING (All) -USERS- FROM SERVER");
        let allUsersHereLocally = postJsonDataUrlAfterAPIgeneralPushups('/getAllUsers', {});
        // let publicPlans;
        // console.log("POST - publicPlans received from Server: ", publicPlans);
        // updatePublicPlans([...publicPlans]);


        publicPlansHereLocally = await publicPlansHereLocally;
        updatePublicPlans([...publicPlansHereLocally]);
        allUsersHereLocally = await allUsersHereLocally;
        updateAllUsers({ ...allUsersHereLocally });

        // updateUser({ ...updatedUser });
      } catch (err) { console.log(err); };
    }
    doAsAsync();




    return () => {
      // window.removeEventListener('beforeinstallprompt', dealWithPWAPrompt);
      // window.removeEventListener('appinstalled', dealWithAppWasInstalledEvent);
      // window.removeEventListener('DOMContentLoaded', registerHowAppWasLaunched); //one more event listener is inside if this f.

    }
  }, []);



  ///Stitch
  // const { isLoggedIn, actions } = useStitchAuth();
  // const stitchAuth = useStitchAuth();
  // console.log("STITCH: is logged in:", isLoggedIn);
  // console.log("useStitchAuth Response: ", stitchAuth);

  const [sideBarOpen, setSideBarOpen] = React.useState(false);

  const cancelChangesOnUserObject = (url) => {
    let fulUrl = frontEndPushupsUrlRoot + url;
    console.log("reboOOOOOOOOOOOOOOOOOOOOOOoting to: ",fulUrl);
    // window.location.reload();
    window.location.assign(fulUrl); //adds record to the url history

}


  return (
    // <>
    <ErrorBoundary miroError={miroError}>
      <ToastContainer />
      {/* menu-header */}
      <div id='mainNavBar' style={{ backgroundColor: 'black', paddingBottom: '0px', display: 'flex', justifyContent: 'flex-end', position: 'sticky', top: '0', zIndex: '1000' }}>
        {/* <div style={{ backgroundColor: 'black', paddingBottom: '2px', display: 'flex', justifyContent: 'center', position: 'sticky', top: '0', zIndex: '1000' }}> */}
        {/* <div style={{ backgroundColor: 'black', paddingBottom: '2px', display: 'flex', justifyContent: 'flex-start', position: 'sticky', top: '0', zIndex: '1000' }}> */}
        {/* {pathname === '/pushups' ? null : <SLink style={{ float: 'left' }} to='/pushups'>Main Menu</SLink>} */}

        {/* Sidebar */}
        {pathname === '/pushups' ? null
          : <Sidebar
            sidebar={<b>
              <SideBarContent pathname={pathname} setSideBarOpen={setSideBarOpen} />
            </b>}
            open={sideBarOpen}
            onSetOpen={setSideBarOpen}
            styles={{
              // display:"inline",
              sidebar: {
                position: "fixed",
                background: "yellow",
                maxWidth: "80vw",
                transition: "transform .1s ease-out",
                WebkitTransition: "-webkit-transform .1s ease-out",
                background: "lightGray",
              },
              root: {
                position: "undefined",
                // background: "pink",
                display: "inline",
                float: 'left'
              },
              content: {
                position: "undefined",
                top: "undefined",
                left: "undefined",
                right: "undefined",
                bottom: "undefined",
                transition: "left .1s ease-out, right .1s ease-out",
                display: "inline",
                float: 'left'
              },
              overlay: {
                transition: "opacity .1s ease-out, visibility .1s ease-out",
                // display: "inline !important",
              }
            }}
          >
            {pathname === '/pushups/runMyTraining' &&
              <button
                onClick={() => setSideBarOpen(true)}
                style={{ padding: '0', backgroundColor: "lightBlue",borderRadius:'5px' }}
            >
              
              <IconAndText>
                <IconAudio />
                {/* <span>Options</span> */}
                <span></span>
              </IconAndText>
              
              </button>}
          </Sidebar>
        }

        {/* INTALL APP PROMPT and INFO */}
        {/* <p style={{ color: 'yellow' }}>{pwaReadyToInstallTest}</p> */}
        {/* <p ref={pwaBeforeInstallFired} style={{ color: `${pwaReadyToInstall === null ? 'red' : 'lightGreen'}`, paddingRight: '3px' }}>e</p> */}
        {/* {pwaReadyToInstall != null && <button style={{ backgroundColor: 'yellow', paddingBottom: '2px' }} onClick={installPwaButtonClicked}>Install</button>} */}
        {pwaReadyToInstall != null && <button style={{ backgroundColor: 'yellow', borderRadius: '5px' }} onClick={installPwaButtonClicked}>Install App</button>}
        {/* <p ref={pwaInstalled} style={{ color: 'orange', paddingRight: '3px' }}></p>//we don't know if app was installed(?) */}
        {/* <p ref={pwaLaunchedInInfo} style={{ color: 'white' }}>{pwaDisplayMode}</p> */}


        {/* navigation buttons wrapper */}
        {pathname === '/pushups' ? null :
          <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '2px' }}>
            {/* <Route path='/pushups/trainingPlans/' render={() => <SLink to='/pushups/trainingPlans'>Plans</SLink>} /> */}
            {/* <Route path='/pushups/trainingPlans/publish' render={() => <SLink to='/pushups/trainingPlans'>Plans</SLink>} /> */}
            {/* <Route path='/pushups/trainingPlans/view' render={() => <SLink to='/pushups/trainingPlans'>Plans</SLink>} /> */}
            {/* {pathname.includes('/pushups/trainingPlans') ? <><SLink to='/pushups/trainingPlans/public'>Plans</SLink><SLink to='/pushups/trainingPlans/personal'>My Plans</SLink></> : null} */}
            {pathname.includes('/pushups/trainingPlans/public') ? <SLink to='/pushups/trainingPlans/personal'>My Plans</SLink> : null}
            {pathname.includes('/pushups/trainingPlans/personal') ? <SLink to='/pushups/trainingPlans/public'>Plans</SLink> : null}
            {pathname.includes('/pushups/trainingPlans/view') ? <><SLink to='/pushups/trainingPlans/personal'>My Plans</SLink><SLink to='/pushups/trainingPlans/public'>Plans</SLink></> : null}
            {pathname.includes('/pushups/trainingPlans/adjustPersonal') ?
              <>
                <SLink onClick={()=>cancelChangesOnUserObject('/trainingPlans/personal')} to='/pushups/trainingPlans/personal'>My Plans</SLink>
                <SLink onClick={()=>cancelChangesOnUserObject('/trainingPlans/public')} to='/pushups/trainingPlans/public'>Plans</SLink>
              </> : null}
            {/* {pathname ==='/pushups/trainingPlans/public') ? <><SLink to='/pushups/trainingPlans/public'>Plans</SLink><SLink to='/pushups/trainingPlans/personal'>My Plans</SLink></> : null} */}

            <SLink
              to='/pushups'
              onClick={pathname.includes('/pushups/trainingPlans/adjustPersonal') ? ()=>cancelChangesOnUserObject(''):null}
              style={{
              padding: '0',
              // margin: '5px 3px'
            }}>


              <IconAndText>
                <IconHome />
                {/* <span>Main Menu</span> */}
                <span></span>
              </IconAndText>


            </SLink>
          </div>
        }
      </div>



      {/* <Route exact path='/pushups' component={UserStatus} /> */}
      <Route exact path='/' component={UserStatus} />
      <Route path='/pushups' component={UserStatus} />


      {/* <UserStatus /> */}
      {/* <button onClick={actions.handleLogout}>Stitch anonym. logout</button>
      <button onClick={() => actions.handleLogin("anonymous")}>Stitch anonym. login</button>
      <button provider="google" onClick={() => actions.handleLogin("google")}>         Log In with Google      </button> */}

      <Switch>

        <Route exact path='/' component={PushupsHome} />
        <Route exact path='/pushups' component={PushupsHome} />
        <Route exact path='/pushups/Sign-upLog-in' component={SignUpInOut} />
        <Route exact path='/pushups/endOfPlanExecutionEvaluation' component={PlanEvaluation} />
        <Route exact path='/pushups/finishedPlanResults' component={DeveloperResults} />

        <Route exact path='/pushups/intro' component={Intro} />

        {/* <Route exact path='/pushups/trainingPlans' component={PushUpPlans} /> */}
        <Route path='/pushups/trainingPlans/createPersonal' component={CreatingPersonalPushupPlan} />
        <Route exact path='/pushups/trainingPlans/:type' component={PushUpPlans} />

        {/* <Route path='/pushups/trainingPlans/adjustPersonal' component={AdjustPersonalPushupPlan} /> */}
        {/* following 2 can't be swapped as it would not work as each is using different url params */}
        <Route path='/pushups/trainingPlans/adjustPersonal/:positionFrom0/:id' component={AdjustPersonalPushupPlan} />
        <Route path='/pushups/trainingPlans/adjustPersonal/:positionFrom0' component={AdjustPersonalPushupPlan} />

        <Route path='/pushups/trainingPlans/finishPersonal/:positionFrom0' component={FinishPersonalPushupPlan} />
        <Route path='/pushups/trainingPlans/publish/:positionFrom0' component={PublishPushupPlan} />
        <Route path='/pushups/trainingPlans/view/:type/:ID' component={ViewPushupPlan} />

        <Route exact path='/pushups/maxRepsTest' component={MaxRepsTest} />
        <Route exact path='/pushups/paceMaker' component={PaceMaker} />

        <Route exact path='/pushups/startMyTraining' component={PrepareTraining2} />
        <Route exact path='/pushups/runMyTraining' component={RunTraining} />
        <Route exact path='/pushups/showSetToDo' component={ShowSetToDo} />

        <Route exact path='/pushups/userProfile' component={UserProfile} />
        <Route exact path='/pushups/settings' component={UserSettingsCheck} />
        <Route exact path='/pushups/history' component={History} />
        {/* <Route exact path='/pushups/history/finishedExecutions' component={FinishedExecutions} /> */}

        <Route exact path='/pushups/community' component={Community} />

        {/* <Route path='/pushups/trainingPlans/viewAdjustPersonal' component={ViewAdjustPersonalPushupPlan} /> */}

        {/* <Route component={FirstPage} /> catch all other routes */}
      </Switch>

      {/* </> */}
    </ErrorBoundary>
  );
};

const PushupsMainWithRouter = withRouter(PushupsMain);

class PushupsContextsComponent extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      info: 'Pushups context',
      // reRender: 0,
      updateUser: (newUser) => {
        this.setState({ ...this.state, user: newUser }, async () => {
          console.log("'Pushup context' - USER - updated to ", this.state.user);
          console.log("whole 'Pushup context' now: ", this.state);
        });
      },
      publicPlans: null,
      updatePublicPlans: (updatedPlans) => {
        this.setState({ ...this.state, publicPlans: updatedPlans }, async () => {
          console.log("'Pushup context' - PUBLIC PLANS - updated to ", this.state.publicPlans);
          console.log("whole 'Pushup context' now: ", this.state);

        });
      },
      allUsers: null,
      updateAllUsers: (updatedUsers) => {
        this.setState({ ...this.state, allUsers: updatedUsers }, async () => {
          console.log("'Pushup context' - ALL USERS - updated to ", this.state.allUsers);
          console.log("whole 'Pushup context' now: ", this.state);
        });
      },
      miroError: null
    }
  }
  render() {
    return (
      // <PushUpsContext.Provider value={pushUpsState}>
      <PushUpsContext.Provider value={this.state}>
        <PushupsMainWithRouter />
      </PushUpsContext.Provider>
    )
  }
}

// export default withRouter(PushupsContexts);
export default PushupsContextsComponent;





// export default Pushups;