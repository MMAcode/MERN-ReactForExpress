
import React, { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import PushUpsContextState from '../state/PushUpsContextState'
import { withRouter } from 'react-router-dom';
import { SLink } from '../../../App';


import signInWithJWTCookie from '../functions/signInWithJWTCookie';
import postJsonData from '../../../functions/postJsonData'
// import { Button } from 'react-bootstrap';
import { urlRoot } from '../../../globalState/globalVariables';



const Logout = ({history}) => {
  let userContext = useContext(PushUpsContextState);

  const logOut = async () => {
    await postJsonData(`${urlRoot}/user/logOut`, {});
    // await postJsonData(`${urlRoot}/user/logOut2`, {});
    console.log("-----------------------------logout-");
    // await postJsonData(`/api/user/logOut`, {});
    // await postJsonData(`/api/user/logOut2`, {});
    // await postJsonData(`${urlRoot}/start`, {}); //wrong url
    // setUser({});

    /////////////!!!
    let guest = await signInWithJWTCookie();
    // console.log("UUUUUU to guest:", guest);
    userContext.updateUser({ ...guest });  // change context - user to  GUEST
    history.push('/pushups');

    // console.log("user Context--> ", userContext);

    //refresh page now - not needed  // window.location.reload();
  }


  return (
    <div>
      <Button onClick={logOut}>Log-out</Button>
    </div>
  );
};

export default withRouter(Logout);