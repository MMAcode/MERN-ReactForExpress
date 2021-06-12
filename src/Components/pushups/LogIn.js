import React, {useContext } from 'react';
import PushUpsContextState from './state/PushUpsContextState'

import { urlRoot } from '../../globalState/globalVariables';
import postJsonData from '../../functions/postJsonData';
import { withRouter } from 'react-router-dom';
// import handleNewUserSubmit from './functions/handleNewUserSubmit';


const LogIn = ({history}) => {
  // const [user, setUser] = useState();
  let userContext = useContext(PushUpsContextState); 



  const handleReturnedUserSubmit = async (e) => {
    e.preventDefault();
    // console.log("clicked")
    const userInfoForServer = {
      email: e.target.email2.value,
      password: e.target.password2.value,

    }
    const apiUrl = `${urlRoot}/user/logInWithEmailAndPassword`;
    const serverResponse = await postJsonData(apiUrl, userInfoForServer);
    // console.log("server returned:", serverResponse);

    userContext.updateUser(serverResponse);
    
    // userContext.runReRender(1);

    // userContext.updateUser({});
    // console.log("user context updated:", userContext);

    //this if condition shouldn't be needed here, during re-render inner htm is not accessible!
    if (document.querySelector('#LogInResult2')) document.querySelector('#LogInResult2').innerHTML = "RESULT: " + serverResponse.message;
    
    if (serverResponse.email) {
      document.querySelector('#email2').value = '';
      document.querySelector('#password2').value = '';
      history.push('/pushups');
    };
  };





  return (
    <div>
      <h3> Log-in</h3>
      <form onSubmit={handleReturnedUserSubmit}>
        <p>email:</p>
        <input type='email' id='email2' defaultValue='miroslav.makarov@gmail.com'></input>
        <p>password:</p>
        <input id="password2" type='password'></input>
        <button id="submitLogInWithEmailForm" type='submit'>Submit</button>
        <p id='LogInResult2'></p>
      </form>
    </div>
  );
}

export default withRouter(LogIn);
