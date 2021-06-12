import React from 'react';
import { withRouter } from 'react-router-dom';
import PushUpsContext from '../state/PushUpsContextState';
import ViewTraining from './view/ViewTraining';
import ViewSchedule from './view/ViewSchedule';
// import QuillReactTextEditor from './richTextEditing/QuillReactEditor';
import TextEditorReactQuill from '../basicComponents/richTextEditing/TextEditorReactQuill';

// import { postJsonDataUrlAfterAPIpushups } from '../../../../functions/postJsonData'
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData'
import styled from 'styled-components';

// import {sharePublicPlanButtonClicked} from './publicPlans/PublicPlanToList'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { frontEndPushupsUrlRoot } from '../../../globalState/globalVariables'
const sharePublicPlanButtonClicked = (publicPlanID) => {
  const urlTextToCopy = `${frontEndPushupsUrlRoot}/trainingPlans/view/public/${publicPlanID}`;
  console.log("love");
  const el = document.createElement('textarea');
  el.value = urlTextToCopy;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  // toast(`Url (${urlTextToCopy})copied to clipboard.`, {
  toast(`Link to this plan copied. Paste it into your favorite messaging app.`, {
    position: "top-center",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  // window.alert(`Url of this plan ('${urlTextToCopy}')was copied to the clipboard.`);

  // function tempAlert(msg,duration)
  // {
  //  var el = document.createElement("div");
  //  el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;z-index:1000");
  //  el.innerHTML = msg;
  //  setTimeout(function(){
  //   el.parentNode.removeChild(el);
  //  },duration);
  //  document.body.appendChild(el);
  // }
  // tempAlert(`Url of this plan ('${urlTextToCopy}')was copied to the clipboard.`,5000);

}
// export let planViewDefaultContext = {};
// export const planViewContext = React.createContext(planViewDefaultContext);
export const planViewContext = React.createContext();

// export const sharePublicPlanButtonClicked = ({ target }) => {


const SButtonWrapper = styled.div`
display:flex;
/* flex-flow:row wrap; */
div{
  /* flex:1 1 auto; */
/* display:flex; */
/* justify-content:space-around; */
}
button{
  margin:10px;
  border-radius:10px;
  /* width:50%; */
  };
`

const ViewPushupPlan = ({ match: { params }, location: { state }, history, plan, view }) => {
  // console.log("------view pushup plan------");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showNotes, setShowNotes] = React.useState(false);
  let planLinks = { type: params.type, id: params.ID };
  const { user, updateUser, publicPlans, updatePublicPlans } = React.useContext(PushUpsContext);
  let personalPlans = user ? user.pushupPlans : null;

  // console.log("params: ", params);
  // console.log("state: ", state);
  // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 1");
  // let plan;
  let repsAsPercentages;
  let maxReps = { reps: 0, source: 'none' };
  let percentages;
  if (!plan) {
    if (state) { plan = state.plan } //=plan from url
    else if (user) { //get plan from user:
      if (planLinks.type === 'finished') {
        plan = personalPlans.personalFinished.find(plan => plan._id === planLinks.id);
      } else if (planLinks.type === 'public' && publicPlans) {
        plan = publicPlans.find(plan => plan._id === planLinks.id);
      } else if (planLinks.type === 'inDevelopment') {
        plan = personalPlans.personal.find(plan => plan._id === planLinks.id);
      }
    }
  }

  //sort max reps if plan as %
  // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 2");

  // console.log("plan just before %: ", plan);

  if (plan && plan.repsAsPercentages) {
    // console.log("PLAN AS %");
    repsAsPercentages = true;

    //using initial assessment for default reps from % frozen
    // if (user.pushupPlans.current && user.pushupPlans.current.assessments.initialAssessmentID) {
    //   maxReps.reps = user.assessments.find(ass => ass._id === user.pushupPlans.current.assessments.initialAssessmentID).reps;
    //   maxReps.source = 'initial';
    //   // console.log("MAX REPS from INIT ASS",maxReps);
    // } else
    if (user.assessments && user.assessments.length > 0) {
      maxReps.reps = user.assessments[0].reps;
      maxReps.source = 'latest';
    }
    percentages = { repsAsPercentages, maxReps }
  }


  // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 3");

  if (!plan) return (<p>loading data...</p>);
  const { name, trainings, schedule } = plan;

  // 
  const adjustPlan = () => {
    console.log("adjust");
    history.push({
      pathname: `/pushups/trainingPlans/adjustPersonal/N/${plan._id}`,
      state: {
        plan //i am not going to use right now
      }
    });

  }

  // console.log("percentages: ", percentages);
  // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 4");

  if (view === 'publicPlansList') {
    //don't show summary again etc
  }


  const publicPlanButtonClickAction = async (publicPlanID, action) => {

    console.log("button action, plan id: ", publicPlanID, action);

    if (action == 'view') {
      // console.log("view");
      history.push({
        pathname: `/pushups/trainingPlans/view/public/${publicPlanID}`,
        // state: {
        //   personalFinishedPlanPositionFrom0: positionFrom0,
        //   plan: user.pushupPlans.personalFinished[positionFrom0]
        // }
      });

      return;
    }

    if (action == 'adjust') {
      // <Route path='/pushups/trainingPlans/adjustPersonal/:positionFrom0/:id' component={AdjustPersonalPushupPlan} />

      history.push({
        pathname: `/pushups/trainingPlans/adjustPersonal/-125/${publicPlanID}`,
        // state: {
        //   personalFinishedPlanPositionFrom0: positionFrom0,
        //   plan: user.pushupPlans.personalFinished[positionFrom0]
        // }
      });

      return;
    }

    //// commit, duplicate, delete actions - on server side:
    if (action == 'delete' && !window.confirm(`Are you sure you want to continue?`)) return;
    if (action == 'commit' && user.pushupPlans.current && !window.confirm(`Are you sure you want to continue? (You are already commit to another plan.)`)) return;


    try {
      // if (action === 'duplicate') alert('Adjustable copy of public plan will appear in your "Private plans in development" section')

      let objForServer = { publicPlanID, action }
      let updatedUserOrPlans = await postJsonDataUrlAfterAPIpushups('/interactWithPublicPlan', objForServer);

      if (action === 'delete') {
        updatePublicPlans([...updatedUserOrPlans]);
        if (user.pushupPlans.current && user.pushupPlans.current.planIDType === publicPlanID) {
          user.pushupPlans.current = null; //this was done on backend too but was not send to front end
          updateUser({ ...user });
          // window.location.reload(true);
        }
      } else { updateUser({ ...updatedUserOrPlans }); }

      if (action === 'commit') history.push({ pathname: `/pushups` });
      if (action === 'duplicate') {
        //load that personal plan
        let planToAdjustId = updatedUserOrPlans.pushupPlans.personal[updatedUserOrPlans.pushupPlans.personal.length - 1]._id;

        history.push({ pathname: `/pushups/trainingPlans/adjustPersonal/N/${planToAdjustId}` });
        alert('Adjustable copy of public plan was created in "Your plans". Now you can adjust this copy...');
        // toast(`Adjustable copy of public plan was created in "Your plans". Now you can adjust this copy...`, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });


      }


    } catch (err) { console.log(err); };
  }


  return (
    <div>

      <planViewContext.Provider value={{ percentages, showNotes }}>

        {/* BUTTONS for public plan */}
        {(view === 'publicPlansList' || planLinks.type === 'public') &&
          <>
            <button style={{ display: 'block', width: '80%' }} onClick={() => publicPlanButtonClickAction(plan._id, 'commit')}>Use this plan to train</button>
            <SButtonWrapper>
              <button onClick={() => publicPlanButtonClickAction(plan._id, 'duplicate')}>Adjust</button>
              <button onClick={() => sharePublicPlanButtonClicked(plan._id)}>Share</button>
              <ToastContainer />
              {user && user.email && user.authority && user.authority.power >= 10 &&
                <>
                  <button style={{ backgroundColor: 'red' }} onClick={() => publicPlanButtonClickAction(plan._id, 'adjust')}>Adjust(dev)</button>
                  <button style={{ backgroundColor: 'red' }} onClick={() => publicPlanButtonClickAction(plan._id, 'delete')}>Delete</button>
                </>
              }
            </SButtonWrapper>
          </>}

        <div>

          {plan.personal === 'yes-only' && <button style={{ display: 'block', width: '80%', margin: '10px auto' }} onClick={adjustPlan}>Adjust plan</button>}
          <h5 style={{ textAlign: 'center' }}>{name}</h5>

          {/* {plan.description && */}
          {/* <div>        {plan.description}      </div>} */}
          {view != 'publicPlansList' && <div>
            <h5>Summary</h5>
            {(plan.summary) && <TextEditorReactQuill initialValue={plan.summary} hideToolbar />}
          </div>}

          <h5>Description</h5>
          {(plan.description || plan.descriptionRich) && <TextEditorReactQuill initialValue={plan.descriptionRich ? plan.descriptionRich : plan.description} hideToolbar />}
          {/* {percentages && <div>
            <h3>% usage</h3>
            <p> - how % are used ... explain here, example here; what is used as 100 also here - exandable button?</p>
          </div>} */}

          <div style={{ padding: '10px' }}>
            <h3>Trainings</h3>
            <button onClick={() => setShowNotes((showNotes) => !showNotes)}>Show/Hide Notes</button>
            {trainings.map((training, i) => <ViewTraining training={training} number={i + 1} key={i} percentages={percentages} showNotes={showNotes} />)}
          </div>

          <ViewSchedule schedule={schedule} />

        </div>
      </planViewContext.Provider>

      

    </div>
  );
};

export default withRouter(ViewPushupPlan);