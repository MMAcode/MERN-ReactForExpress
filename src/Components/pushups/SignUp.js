import React from 'react';
import PushUpsContext from './state/PushUpsContextState';

import { urlRoot } from '../../globalState/globalVariables';
import postJsonData from '../../functions/postJsonData'
import { withRouter } from 'react-router-dom';
// import handleNewUserSubmit from './functions/handleNewUserSubmit';

// import styled from 'styled-components'
// const Sdiv = styled.div`
//  background:orange;
//  background:rgba(255, 166, 0, 0.452);
//   padding:5px 10px;
//   border: orange solid 2px;
//  `

const SignUp = ({history}) => {
  let pushupContext = React.useContext(PushUpsContext);

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    const userInfoForServer = {
      email: e.target.signUpEmail.value,
      password: e.target.signUpPassword.value,
      name: e.target.signUpUsername.value,
    }
    const apiUrl = `${urlRoot}/user/signup`;
    const serverResponse = await postJsonData(apiUrl, userInfoForServer);
    console.log("server returned:", serverResponse);
    document.querySelector('#signUpResult').innerHTML = "RESULT: " + serverResponse.message;
    if (serverResponse.success) {
      pushupContext.updateUser(serverResponse.data.newUser);

      // console.log("RRRRR", serverResponse.data.newUser);
      history.push('/pushups');
      
      // console.log("updated pushup context: ", pushupContext);
      // document.querySelector('#email').value = '';
      // document.querySelector('#password').value = '';
      // window.
    };
  };





  return (
    // <div style={{ border: '2px solid orange' }}>
    <div>
      <h3> Sign up</h3>
      <form onSubmit={handleNewUserSubmit}>
        <p>email:</p>
        <input id='signUpEmail'></input>
        <p>password:</p>
        {/* <input id="password" type='password'></input> */}
        <input id="signUpPassword"></input>
        <p>Username: (public)</p>
        <input id="signUpUsername"></input>

        

        <button id="submitSignUpForm" type='submit'>Submit</button>
        <p id='signUpResult'></p>
      </form>
    </div>
  );
}

export default withRouter(SignUp);
