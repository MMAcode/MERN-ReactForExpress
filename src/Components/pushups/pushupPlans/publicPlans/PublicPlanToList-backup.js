import React from 'react';
import styled from 'styled-components';

// import PushUpsContext from './state/PushUpsContextState';
import PushUpsContext from '../../state/PushUpsContextState';
import { postJsonDataUrlAfterAPIpushups } from '../../../../functions/postJsonData'
import { withRouter } from 'react-router-dom';

import ViewPushupPlan from '../../pushupPlans/ViewPushupPlan';
import { Accordion, Card } from 'react-bootstrap';

const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
background-color: rgba(233, 154, 7, 0.62);
margin: 0 5px 8px 5px;
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
const PublicPlanToList = ({ plan, history, viewSetting: v }) => {
  let { user, updateUser, publicPlans, updatePublicPlans } = React.useContext(PushUpsContext);


  if (!v) v = { summary: true }
  console.log("viewSetting: ", v);

  // const {summary,description,trainings,schedule } = viewSetting;

  const publicPlanButtonClickAction = async (publicPlanID, action) => {

    console.log("button action, plan id: ", publicPlanID, action);

    if (action == 'view') {
      console.log("view");
      history.push({
        pathname: `/pushups/trainingPlans/view/public/${publicPlanID}`,
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
      if (action === 'duplicate') alert('Adjustable copy of public plan will appear in your "Private plans in development" section')
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


    } catch (err) { console.log(err); };
  }

  return (
    // <div style={{ backgroundColor: 'white', margin: '3% 3px', padding: '3%' }}>
    <div style={{ backgroundColor: 'white', margin: '3% 3px', padding: '0' }}>
      {/* <p>Name: {plan.name}</p> */}

      {/* <SPlanLink key={plan._id}> */}


      {/* </SPlanLink> */}



      {/* <Accordion className='p-1' style={{ margin: '0px 10px 0px 20px', background: 'transparent' }}> */}
      {/* <Accordion className='p-1' style={{ margin: '0', background: 'orange' }}> */}
      <Accordion className='p-1' style={{ margin: '0', background: 'none',border:'none' }}>
        {/* <Card style={{background:'transparent', border:'none'}} > */}
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="1"
            className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
          // style={{background:'white',margin:'0px 60px 0px 60px'}}
          >
            {/* Your Notes 🔽 */}
            {/* <button style={{ float: 'right' }} onClick={() => publicPlanButtonClickAction(plan._id, 'view')}>View</button> */}

            <h3>{plan.name}🔽</h3>
            {v.description && <div>
              <h5>Description:</h5>
              <p>{plan.description}</p>            </div>}
            <br />
            {v.targetGroup && <div>
              <p>Target group - reps range: Users able to do from {plan.targetGroup.initialMaxReps.rangeAsReps[0]} to {plan.targetGroup.initialMaxReps.rangeAsReps[1]} reps.</p>            </div>}
            {v.resultsFinished && <div>
              <p>Finished: {plan.executions.summary.uncompleted}, length: {plan.executions.uncompleted.length}</p>            </div>}
            {v.resultsUnfinished && <div>
              <p>Unfinished: {plan.executions.summary.completed}, length: {plan.executions.completed.length}</p>            </div>}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <SCard style={{ maxHeight: '100vh', overflowY: 'auto', backgroundColor: 'white' }}>
              <div style={{ backgroundColor: 'red' }}>
                <SButtonWrapper>
                  {/* <div> */}
                  <button onClick={() => publicPlanButtonClickAction(plan._id, 'commit')}>Commit</button>
                  {/* </div> */}
                  {/* <div> */}
                  {/* <button onClick={() => publicPlanButtonClickAction(plan._id, 'view')}>View</button> */}
                  <button onClick={() => publicPlanButtonClickAction(plan._id, 'duplicate')}>Duplicate</button>
                  {user && user.email && user.authority && user.authority.power >= 10 &&
                    <button style={{ backgroundColor: 'red' }} onClick={() => publicPlanButtonClickAction(plan._id, 'delete')}>Delete</button>
                  }
                  {/* </div> */}
                </SButtonWrapper>
                <ViewPushupPlan plan={plan} view='publicPlansList' />
              </div>
            </SCard>
          </Accordion.Collapse>
        </Card>
      </Accordion>


    </div>
  );
};

export default withRouter(PublicPlanToList);