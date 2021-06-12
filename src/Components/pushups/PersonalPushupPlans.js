import React from 'react';
import { SLink } from './Home';
import { withRouter } from 'react-router-dom';
import PushUpsContext from './state/PushUpsContextState';
import { postJsonDataUrlAfterAPIpushups } from '../../functions/postJsonData'
import objectSize from '../../functions/objectSize'
import styled from 'styled-components';

const SPersonalPushupPlans = styled.div`
background-color: yellow;
padding:3%;
margin:3px;
border-radius:10px;
`

const MyExistingPlans = styled.div`
background-color:lightgreen;
padding:15px;
/* margin:3%; */
margin-top:20px;

`
const SPlanLink = styled.div`
margin:5px;
background-color:#56cd56;
padding:10px;
display:flex;
justify-content: space-between;
flex-wrap:wrap;
`
const SButtonWrapper = styled.div`
display:flex;
flex-flow:row wrap;
div{
  flex:1 1 auto;
display:flex;
justify-content:space-around;
}
button{
  margin:10px;
  border-radius:10px;
  width:50%;
  };
`

const PersonalPushupPlans = ({ history}) => {
  let { user, updateUser } = React.useContext(PushUpsContext);

  const personalPlanAction = async (positionFrom0, action) => {

    // console.log("objectSize1", objectSize(user));

    if (action == 'submitAsFinished') {
      console.log("submitAsFinished");
      history.push({
        pathname: `/pushups/trainingPlans/finishPersonal/${positionFrom0}`,
        // state: {
        //   personalPlanPositionFrom0: positionFrom0,
        //   plan: user.pushupPlans.personal[positionFrom0]
        // }
      });

      return;
    }

    if (action == 'view') {
      console.log("view");
      history.push({
        pathname: `/pushups/trainingPlans/view/inDevelopment/${user.pushupPlans.personal[positionFrom0]._id}`,
        state: {
          personalPlanPositionFrom0: positionFrom0,
          plan: user.pushupPlans.personal[positionFrom0]
        }
      });

      return;
    }

    if (action == 'viewAdjust') {
      console.log("adjust");
      // console.log("adjust - props:", props);
      history.push({
        pathname: `/pushups/trainingPlans/adjustPersonal/${positionFrom0}`,
        state: {
          personalPlanPositionFrom0: positionFrom0,
          plan: user.pushupPlans.personal[positionFrom0]
        }
      });

      return;
    }

    if (action == 'delete' && !window.confirm(`Are you sure you want to continue?`)) return;
    if (action == 'commit' && user.pushupPlans.current && !window.confirm(`Are you sure you want to continue? (You are already commit to another plan.)`)) return;

    let objForServer = { planPositionFrom0: positionFrom0, action }
    try {
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/manipulatePersonalPlan', objForServer);
      // console.log("res from server on USERPLAN ACTION BUTTON:", updatedUser);
      updateUser({ ...updatedUser });

      console.log("objectSize1", objectSize(user));

    } catch (err) { console.log(err); };
  }

  const personalFinishedPlanAction = async (positionFrom0, action) => {

    // console.log("objectSize1", objectSize(user));

    // if (action == 'submitAsFinished') {
    //   console.log("submitAsFinished");
    //   history.push({
    //     pathname: `/pushups/trainingPlans/finishPersonal/${positionFrom0}`,
    //     // state: {
    //     //   personalPlanPositionFrom0: positionFrom0,
    //     //   plan: user.pushupPlans.personal[positionFrom0]
    //     // }
    //   });

    //   return;
    // }

    console.log("button action, plan numberFrom0: ", action, positionFrom0);
    if (action == 'publish') {
      console.log("publish clicked");
      history.push({
        pathname: `/pushups/trainingPlans/publish/${positionFrom0}`,
        // state: {
        //   personalPlanPositionFrom0: positionFrom0,
        //   plan: user.pushupPlans.personal[positionFrom0]
        // }
      });

      return;
    }

    if (action == 'view') {
      console.log("view");
      history.push({
        pathname: `/pushups/trainingPlans/view/finished/${user.pushupPlans.personalFinished[positionFrom0]._id}`,
        state: {
          personalFinishedPlanPositionFrom0: positionFrom0,
          plan: user.pushupPlans.personalFinished[positionFrom0]
        }
      });

      return;
    }
    if (action == 'delete' && !window.confirm(`Are you sure you want to continue?`)) return;
    if (action == 'commit' && user.pushupPlans.current && !window.confirm(`Are you sure you want to continue? (You are already commit to another plan.)`)) return;

    //// commit, duplicate, delete actions - on server side:
    let objForServer = { planPositionFrom0: positionFrom0, action }
    try {
      let updatedUser = await postJsonDataUrlAfterAPIpushups('/manipulatePersonalFinishedPlan', objForServer);
      updateUser({ ...updatedUser });
    } catch (err) { console.log(err); };
  }

  return (
    <SPersonalPushupPlans>
      {/* <h3 style={{ display: 'inline' }}> My pushup plans</h3> */}
      <SLink style={{ margin: '10px 0 0 30px', display: 'inline-block', padding: '5px 20px', border: '3px red solid' }} to='/pushups/trainingPlans/createPersonal'>Create new</SLink>


      <MyExistingPlans>
        <h3>Private - Finished (Non-Adjustable)</h3>
        <p>info what are these for...</p>
        {(user && user.pushupPlans && user.pushupPlans.personalFinished && user.pushupPlans.personalFinished.length > 0) ?
          <> {user.pushupPlans.personalFinished.map((plan, indexFrom0) =>
            <SPlanLink key={indexFrom0}>
              <span>{plan.name}</span>
              <SButtonWrapper>
                <div>
                  <button onClick={() => personalFinishedPlanAction(indexFrom0, 'commit')}>Commit</button>
                  <button onClick={() => personalFinishedPlanAction(indexFrom0, 'publish')}>Publish</button>
                </div>
                <div>
                  <button onClick={() => personalFinishedPlanAction(indexFrom0, 'view')}>View</button>
                  <button onClick={() => personalFinishedPlanAction(indexFrom0, 'duplicate')}>Duplicate</button>
                  <button onClick={() => personalFinishedPlanAction(indexFrom0, 'delete')}>Delete</button>
                </div>
              </SButtonWrapper>

            </SPlanLink>)}
          </> : <span>No personal plans made.</span>}
      </MyExistingPlans>

      <MyExistingPlans>
        <h3>Private - In Development (Adjustable)</h3>
        <p>info what are these for...</p>
        {(user && user.pushupPlans && user.pushupPlans.personal && user.pushupPlans.personal.length > 0) ?
          <> {user.pushupPlans.personal.map((plan, indexFrom0) =>
            <SPlanLink key={indexFrom0}>
              <span>{plan.name}</span>
              <SButtonWrapper>
                <div>
                  <button onClick={() => personalPlanAction(indexFrom0, 'commit')}>Commit</button>
                  <button onClick={() => personalPlanAction(indexFrom0, 'submitAsFinished')}>Submit as Finished</button>
                  <button onClick={() => personalPlanAction(indexFrom0, 'view')}>View</button>

                </div>
                <div>
                  <button onClick={() => personalPlanAction(indexFrom0, 'viewAdjust')}>Adjust</button>
                  <button onClick={() => personalPlanAction(indexFrom0, 'duplicate')}>Duplicate</button>
                  <button onClick={() => personalPlanAction(indexFrom0, 'delete')}>Delete</button>
                </div>
                {/* <span>(rearrange)</span> */}
              </SButtonWrapper>

            </SPlanLink>)}
          </> : <span>No personal plans made.</span>}


      </MyExistingPlans>


      {/* <SLink style={{ margin: '10px 0 0 0' }} to='/pushups/trainingPlans/createPersonal'>Create new</SLink> */}


    </SPersonalPushupPlans>
  );
};

export default withRouter(PersonalPushupPlans);