import React from 'react';
import pushupsContext from '../state/PushUpsContextState';
import InitialAssessment from '../assessment/InitialAssessment';
import { withRouter } from 'react-router-dom';
import { postJsonDataUrlAfterAPIpushups } from '../../../functions/postJsonData'




// import PushupsContext from '../state/PushUpsContextState'

const PrepareTraining = ({ history }) => {
  let context = React.useContext(pushupsContext);
  const [trainingWasCreatedAlready, setTrainingWasCreatedAlready] = React.useState(false); //to prevent creating more trainings upon component's re-rendering
  console.log("prepareTrainingRuningXXX", trainingWasCreatedAlready);
  //if all conditions are ok, redirect upon mounting (not sooner to prevent warning messages)
  React.useEffect(() => {
    if (context.user && context.user.pushupPlans.current && context.user.pushupPlans.current.assessments.initialAssessmentID && !trainingWasCreatedAlready) {

      // console.log("new training will be CREATED here");

      //create new training = addNewTrainingExecutionToUsersCurrentPlanTrainingHistory
      const addNewTrainingExecutionToUsersCurrentPlanTrainingHistory = async () => {
        try {
          // let updatedUser = await postJsonDataUrlAfterAPIpushups('/startNewTraining', {});
          console.log("user with new training set-up:");
          // console.log("user with new training set-up: ,", updatedUser);
          // console.log("date now:", new Date());
          // console.log("user with new training set-up: ,", updatedUser.pushupPlans.current.trainingHistory[0]);
          setTrainingWasCreatedAlready(true); //this has to be updated before context, otherwise 2 trainings would be created
          // context.updateUser(updatedUser);
        } catch (err) { console.log("e1", err) }

        // const trainingExecution = {
        //   times: {
        //     started: new Date()
        //   }
        // }
      }
      // console.log("XXXXXXXXXXXXXX 1");
      addNewTrainingExecutionToUsersCurrentPlanTrainingHistory()
        .then(() => {
          // console.log("XXXXXXXXXXXXXX 2");
          history.push('/pushups/runMyTraining');
        })
        .catch(err => console.log("e2", err));
    };
  }, [context]); 
// }, []); // issue of not re-rendering upon submitting "initial assessment"
// } );


  // React.useEffect(() => { }, []);
  // if (context.user && context.user.pushupPlans.current && context.user.pushupPlans.current.assessments.initialAssessmentID) {
  //   console.log("new training would be CREATED");
  //   history.push('/pushups/runMyTraining');
  // }


  return (
    <div>
      {/* <h1>Training xx</h1> */}
      {!context.user ? <p>you are guest. Login first(??)</p> :
        !context.user.pushupPlans.current ? <p>select a plan first.</p> :
          !context.user.pushupPlans.current.assessments.initialAssessmentID ? <InitialAssessment /> : <p>Loading...</p>
      }
    </div>
  );
};

export default withRouter(PrepareTraining);