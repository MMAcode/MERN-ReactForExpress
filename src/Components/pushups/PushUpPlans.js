import React, { useContext, useEffect, useState } from 'react';
import { postJsonDataUrlAfterAPIpushups } from '../../functions/postJsonData';
import PushUpsContext from './state/PushUpsContextState';
// import PushUpsContextState from './state/PushUpsContextState'

import TrainingPlanOverview from './TrainingPlanOverview'
import PersonalPushupPlans from './PersonalPushupPlans';
import PublicPlans from './pushupPlans/publicPlans/PublicPlans';
// import { Link, Route, Switch, HashRouter } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const PushUpPlans = (props) => {
  let pushupContext = useContext(PushUpsContext);
  const [currentPlanName, setCurrentPlanName] = useState(null);
  // const [viewPersonalPlans, setViewPersonalPlans] = useState(showPersonalPlans ? true:false);
  
  let plansType = props.match.params.type;
  // console.log("TYPPPPE:", plansType);
  const [viewPersonalPlans, setViewPersonalPlans] = useState(plansType === 'public' ? false : true);
  if (plansType === 'public' && viewPersonalPlans) setViewPersonalPlans(false);
  if (plansType === 'personal' && !viewPersonalPlans) setViewPersonalPlans(true);

  // let ready=true;
  // let ready;

  //display user's current plan name: (get plan's name and display it and cancel button)
  // useEffect(() => {
  //   setCurrentPlanName((pushupContext.user && pushupContext.user.pushupPlans.current) ? pushupContext.user.pushupPlans.current.name : null);
  // }, [pushupContext]);



  const finishCurrentTrainingPlan = async () => {
    //assuming user and his current plan exists
    let updatedUser = await postJsonDataUrlAfterAPIpushups('/endPlan', {});
    pushupContext.updateUser(updatedUser);


  }
  console.log(" PLANS running");
  return (
    <div id='plansViewID' style={{ backgroundColor: 'lightBlue' }}>
      {/* <Link to='/pushups'>Return</Link> */}

      <div style={{ position: 'relative' }} >
        <h2 style={{ textAlign: 'center' }}> {viewPersonalPlans ? 'My Plans' : 'Plans'}</h2>

        <p style={{ color: 'gray', fontSize: '0.7rem', textAlign: 'center' }}>All plans are 14 days long.</p>
        <button
          style={{ display: 'block', borderRadius: '10px 0 10px 0', fontSize: '1.3rem', padding: '0.3rem', margin: '10px 5px 10px auto' }}
          onClick={() => {
            if (viewPersonalPlans) {props.history.push('/pushups/trainingPlans/public')}
            else {props.history.push('/pushups/trainingPlans/personal')}
            // setViewPersonalPlans(previousState => !previousState)
          }}>
          {viewPersonalPlans ? 'Plans' : 'My plans'}
        </button>
      </div>

      {viewPersonalPlans ? <PersonalPushupPlans /> : <PublicPlans />}

    </div>
  );
};

export default PushUpPlans;