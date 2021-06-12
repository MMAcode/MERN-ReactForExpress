import React from 'react';
import styled from 'styled-components';

// import PushUpsContext from './state/PushUpsContextState';
import PushUpsContext from '../../state/PushUpsContextState';
import { postJsonDataUrlAfterAPIpushups } from '../../../../functions/postJsonData'
import { withRouter } from 'react-router-dom';

import ViewPushupPlan from '../../pushupPlans/ViewPushupPlan';
import { Accordion, Card } from 'react-bootstrap';
import TextEditorReactQuill from '../../basicComponents/richTextEditing/TextEditorReactQuill';



import positionElementToTheTop from '../../functions/styling/positionElementToTheTop'



const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
background-color: rgba(233, 154, 7, 0.62);
/* margin: 0 5px 8px 5px; */
`


const SPlanLink = styled.div`
/* margin:5px; */
background-color:#56cd56;
padding:10px;
/* display:flex; */
/* justify-content: space-between; */
/* flex-wrap:wrap; */
`
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



// const PublicPlanToList = ({ plan, history,viewSetting:v }) => {
// const PublicPlanToList = ({ plan: planToUse, history, viewSetting: v, index }) => {
  const PublicPlanToList = ({ plan, history, viewSetting: v, index }) => {
  let { user, updateUser, updatePublicPlans } = React.useContext(PushUpsContext);

  // let [plan, setPlan] = React.useState(planToUse);
  // React.useEffect(() => { setPlan(planToUse) }, [planToUse]);

  if (!v) v = { summary: true, targetGroup: true }
  // console.log("viewSetting: ", v);

  // const {summary,description,trainings,schedule } = viewSetting;

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





  // return (
  // <div style={{ backgroundColor: 'white', margin: '3% 3px', padding: '3%' }}>
  // <div style={{ backgroundColor: 'white', margin: '3% 3px', padding: '0' }}>
  {/* <p>Name: {plan.name}</p> */ }

  {/* <SPlanLink key={plan._id}> */ }


  {/* </SPlanLink> */ }



  {/* <Accordion className='p-1' style={{ margin: '0px 10px 0px 20px', background: 'transparent' }}> */ }
  {/* <Accordion className='p-1' style={{ margin: '0', background: 'orange' }}> */ }
  // <Accordion className='p-1' style={{ margin: '0', background: 'none',border:'none' }}>
  {/* <Card style={{background:'transparent', border:'none'}} > */ }



  return (
    // <Card>
    <Card style={{ background: 'transparent', border: 'none', margin: '3px', borderRadius: '0px' }} >
      {/* <Card style={{background:'transparent', border:'2px solid yellow', margin:'3px'}} > */}
      {/* // <Card style={{background:'white', border:'none'}} > */}
      <Accordion.Toggle
        as={Card.Header}
        eventKey={index}
        id={`publicPlansAccordionCard${index}`}
        // className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
        // className="p-1 m-1 bg-none MMpointer btnOpacity"
        className="bg-none MMpointer btnOpacity"
        // style={{background:'white',margin:'0px 60px 0px 60px'}}
        // style={{background:'yellow',margin:'0px 60px 0px 60px'}}
        style={{ background: 'yellow' }}
        onClick={() => positionElementToTheTop(document.getElementById(`publicPlansAccordionCard${index}`), 330)}
      >
        {/* Your Notes 🔽 */}
        {/* <button style={{ float: 'right' }} onClick={() => publicPlanButtonClickAction(plan._id, 'view')}>View</button> */}
        <p style={{ float: 'right' }}>🔽</p>
        <p style={{ fontWeight: 'bold' }}>{plan.name}</p>

        {/* {(v.summary && plan.summary) && <div> */}
        {v.summary && <div>
          {/* <inline>Summary:</inline> */}
          {plan.summary ?
            <TextEditorReactQuill initialValue={plan.summary} hideToolbar customStyles={{ backgroundColor: 'none' }} />
            : <p style={{ color: 'gray', fontSize: '0.7rem', paddingLeft: '15px', opacity: '0.5' }}>No summary</p>}
        </div>}
        {v.description && <div>
          <h5>Description:</h5>
          <p>{plan.description}</p>            </div>}

        {v.targetGroup && <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* {v.targetGroup && <div> */}
          {/* <p><span style={{fontSize:'2rem', lineHeight:'0.2',overflow:'hidden'}}>➳</span> {plan.targetGroup.initialMaxReps.rangeAsReps[0]} to {plan.targetGroup.initialMaxReps.rangeAsReps[1]} reps.</p>            </div>} */}
          {/* <span style={{fontSize:'2rem',lineHeight:'0.2',overflow:'hidden'}}>➳</span>  */}
          <span style={{ fontSize: '2rem', lineHeight: '0.5', position: 'relative', top: '-2px' }}>➳</span>
          <span> {plan.targetGroup.initialMaxReps.rangeAsReps[0]}..{plan.targetGroup.initialMaxReps.rangeAsReps[1]} reps.</span>            </div>}
        {v.resultsFinished && <div>
          <p>Finished: {plan.executions.summary.uncompleted}, length: {plan.executions.uncompleted.length}</p>            </div>}
        {v.resultsUnfinished && <div>
          <p>Unfinished: {plan.executions.summary.completed}, length: {plan.executions.completed.length}</p>            </div>}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index}>
        <SCard style={{ overflowY: 'auto', backgroundColor: '#ffd400', paddingTope: '0' }}>
          {/* <div style={{ backgroundColor: 'red' }}> */}
          <div style={{ backgroundColor: 'transparent' }}>
            {/* <button style={{ display: 'block', width: '80%' }} onClick={() => publicPlanButtonClickAction(plan._id, 'commit')}>Use this plan to train</button> */}
            {/* <SButtonWrapper>
              <button onClick={() => publicPlanButtonClickAction(plan._id, 'duplicate')}>Adjust</button>
              <button onClick={()=>sharePublicPlanButtonClicked(plan._id)}>Share</button>
              {user && user.email && user.authority && user.authority.power >= 10 &&
                <>
                  <button style={{ backgroundColor: 'red' }} onClick={() => publicPlanButtonClickAction(plan._id, 'adjust')}>Adjust(dev)</button>
                  <button style={{ backgroundColor: 'red' }} onClick={() => publicPlanButtonClickAction(plan._id, 'delete')}>Delete</button>
                </>
              }
            </SButtonWrapper> */}
            <ViewPushupPlan plan={plan} view='publicPlansList' />
          </div>
        </SCard>
      </Accordion.Collapse>
    </Card>
  );
  {/* </Accordion> */ }


  // </div>
  // );
};

export default withRouter(PublicPlanToList);