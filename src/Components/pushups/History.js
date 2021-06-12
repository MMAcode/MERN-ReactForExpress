import React from 'react';
import LastTraining from './history/LastTraining';
import pushupsContext from './state/PushUpsContextState';
import CurrentPlan from './history/CurrentPlan';
import AssessmentsHistory from './history/AssessmentsHistory';
import PreviousPlansHistory from './history/PreviousPlansHistory';


const returnPersonalPlanPointerFromPlanID = (user, planID) => {
  let planLocationPointer = user.pushupPlans.personal.find(plan => plan._id === planID);
  return planLocationPointer;
}

const History = () => {

  // const [testTimer, testTimerSET] = React.useState(false);


  React.useEffect(() => {
    // (async () => { await new Promise(resolve => setTimeout(resolve, 350)); })()
    //scroll should be within this async anyway to be delayed
    window.scrollTo(0, 0);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // testTimerSET(true);

  }, []);

  let context = React.useContext(pushupsContext);
  React.useEffect(() => {
    //sort refresh-user loading
    // if (!context.user) { return } else setUserLoading(false);
    // console.log("CONTEXT CHANGED ON HISTORY", context);
    if (!context.user) return;
  }, [context]);

  //render this if user doesn't exists
  if (!context.user) { return (<p>login to see your training history</p>) }
  // if (!context.publicPlans) { return (<p>loading...</p>) }

  return ( //all down here user exists - guaranteed
    <div>
      <h1>History</h1>


      {/* last training */}
      {/* {(context.user.pushupPlans.current != null
        && context.user.pushupPlans.current.trainingHistory.length != 0)
        ? <LastTraining data={context.user.pushupPlans.current.trainingHistory[0]} />

        : context.user.pushupPlans.history
        && context.user.pushupPlans.history.length > 0
        && context.user.pushupPlans.history[0].trainingHistory.length > 0
        && <LastTraining data={context.user.pushupPlans.history[0].trainingHistory[0]} />
      } */}

      {/* assessments */}
      <AssessmentsHistory assessments={context.user.assessments} />

      {/* current plan */}
      
      
 {/* { testTimer ?    <div> */}
 { context.publicPlans ?    <div>
        {context.user.pushupPlans.current && //tested for null
          <CurrentPlan
            trainingSHistory={context.user.pushupPlans.current.trainingHistory.length > 0 ? context.user.pushupPlans.current.trainingHistory : null}
            //assuming personal;not public pushup plan!!
            currentPlanExecution={context.user.pushupPlans.current}
            assessments={context.user.assessments}
            personalPushupPlans={context.user.pushupPlans}
          />
        }
        <PreviousPlansHistory showByDefault={true} />
      </div> : <p>loading...</p>}

    </div>
  );
};

export default History;