import React from 'react';
// import PushUpsContext from './state/PushUpsContextState';
import PushUpsContext from '../state/PushUpsContextState';
import { withRouter } from 'react-router-dom';


import { urlRoot } from '../../../globalState/globalVariables';
import postJsonData from '../../../functions/postJsonData'
import CounterAllIn from '../basicComponents/CounterAllIn'

// import handleNewUserSubmit from './functions/handleNewUserSubmit';

// import styled from 'styled-components'
// const Sdiv = styled.div`
//  background:orange;
//  background:rgba(255, 166, 0, 0.452);
//   padding:5px 10px;
//   border: orange solid 2px;
//  `

const AssessmentForm = ({ history ,loadHomePage=true, onSubmitFunction }) => {
  const [submitted, setSubmitted] = React.useState(false);
  let pushupContext = React.useContext(PushUpsContext);
  let user = pushupContext.user;
  let repsToUse = 10;
  if (user && user.assessments && user.assessments.length > 0) repsToUse = user.assessments[0].reps;
  React.useEffect(() => {
    if (user && user.assessments && user.assessments.length > 0) setInputValue(user.assessments[0].reps);
  },[user])
  const [inputValue, setInputValue] = React.useState(repsToUse);


  const handleNewAssessmentSubmit = async (e) => {
    e.preventDefault();

    // console.log("PP context:", pushupContext);
    const userInfoForServer = {

      // reps: e.target.assessmentReps.value,
      reps: inputValue,
      notes: e.target.assessmentNotes.value,
      // partOfPlan:
    }

    const apiUrl = `${urlRoot}/pushups/saveNewAssessment`;
    try {
      const updatedUser = await postJsonData(apiUrl, userInfoForServer);
      pushupContext.updateUser(updatedUser);
      
      console.log("server's response to PostJsonData: (updating context now)", updatedUser);
      setSubmitted(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmitFunction();
      if (loadHomePage) history.push('/pushups');
      setSubmitted(false);
     
    } catch (err) { console.log(err) };

  };


  return (
    // <div style={{ border: '2px solid orange' }}>
    <div>
      {/* <h3> Results</h3> */}
      <form onSubmit={handleNewAssessmentSubmit}>
        <p>How many consecutive pushups did you do?</p>
        {/* <input id='assessmentReps'></input> */}
        {/* <CounterAllIn /> */}
        <CounterAllIn settings={[1, 5, setInputValue, inputValue, '', 'reps', 0,10000,'borderBeautiful']} />
        
        <p>Notes:</p>
        <p> (If you didn't do pushups in the form described above in the 'rules', describe your form.)</p>
        {/* <input id="password" type='password'></input> */}
        <textarea style={{display:'block',width:'100%'}} id="assessmentNotes"></textarea>
        {/* <input type='textarea' id="assessmentNotes"></input> */}
        {/* <button id="submitAssessmentForm" type='submit'>Submit</button> */}
        <button type='submit'>Submit</button>
        {submitted&& <span id='confirmNewRepsSubmitSuccess'>Submitted.  Well done.</span>}
        {/* <p id='signUpResult'></p> */}
      </form>
    </div>
  );
}

export default withRouter(AssessmentForm);
