import React, { useEffect, useContext } from 'react';
import PushUpsContextState from './state/PushUpsContextState'
import { withRouter } from 'react-router-dom';
import { SLink } from '../../App';

import signInWithJWTCookie from './functions/signInWithJWTCookie';
// import SignUpInOut from './SignUpInOut'
import postJsonData from '../../functions/postJsonData'
// import { Button } from 'react-bootstrap';
import { urlRoot } from '../../globalState/globalVariables';
import UserLoading from './otherComponents/UserLoading';




const UserStatus = ({ history }) => {
  const [userStatusInfo, setUserStatusInfo] = React.useState('notYetLoaded');
  let userContext = useContext(PushUpsContextState);
  // console.log("USER CONTEXT in user status:", userContext.user);
  // console.log("USER CONTEXT in user status email:", userContext.user.email);
  let user = null;

  // if (userContext.user && userContext.user.email) {//this is never true anyway I guess
  if (userContext.user) {//to allow to load Guest too
    user = userContext.user;
  }

  useEffect(() => {
    // console.log("GETTING USER");
    setUserStatusInfo('loading');
    const updateUserContextFromCookie = async () => {
      let userA = await signInWithJWTCookie();
      // let userA = await postJsonData(`${urlRoot}/user/checkJWTCookie`, {});
      // let userA;

      // console.log("CCCCCchecked With Cookie - Response:", userA); //either{ user: { }} or {...}
      // setUser(userA);

      if (userA.error) {
        console.log("MIRO ERROR during loading user:", userA.error);
        setUserStatusInfo({ error: userA.error });
      } else {
        // console.log("USER FROM COOKIE:", userA);
        userContext.updateUser(userA);
        setUserStatusInfo('loaded');

        // console.log("<userStatus> context --> ", userContext);
        // return () => { console.log("dismounting??: ", user) };
      }
    };

    // console.log("effect running...")
    updateUserContextFromCookie();
  }
    , []   ///now runs on every rerender, with [] runs only on first
  )

  // const logOut = async () => {
  //   await postJsonData(`${urlRoot}/user/logOut`, {});
  //   // await postJsonData(`${urlRoot}/user/logOut2`, {});
  //   console.log("-----------------------------logout-");
  //   // await postJsonData(`/api/user/logOut`, {});
  //   // await postJsonData(`/api/user/logOut2`, {});
  //   // await postJsonData(`${urlRoot}/start`, {}); //wrong url
  //   // setUser({});

  //   /////////////!!!
  //   let guest = await signInWithJWTCookie();
  //   // console.log("UUUUUU to guest:", guest);
  //   userContext.updateUser({ ...guest });  // change context - user to  GUEST
  //   history.push('/pushups');

  //   // console.log("user Context--> ", userContext);

  //   //refresh page now - not needed  // window.location.reload();
  // }

  const resetGuestButton = async () => {
    let data = await postJsonData(`${urlRoot}/guest/resetGuest`, {});
    console.log("reset guest DDDDDDDDDDDDDDData:", data);
    userContext.updateUser({ ...data.guest });

  }

  // console.log("history.location.pathname: ", history.location.pathname);

  if (userStatusInfo === 'loading')
    return <UserLoading />

  if (userStatusInfo.error)
    return <UserLoading error={userStatusInfo.error} />

  if (history.location.pathname === '/pushups' || history.location.pathname === '/') {
    // if (user) console.log("!!!!",user.name);
    return null
    return (
      // <div style={{ display: "inline", float: "right", padding:'5px' }}>
      <div style={{ padding: '5px', display: 'flex', justifyContent: 'flex-end' }}>
        {/* <p>XX: {user && user.email}</p> */}
        {/* <p>{userStatusInfo}</p> */}
        <p style={{ textAlign: 'right', paddingRight: '5px', display: "inline" }}>Welcomeee
          {/* {userStatusInfo === 'loading' ? 'Identifying current user...'///Identifying current user */}

          {/* user status */}
          {userStatusInfo === 'loading' ?
            'loading...'///Identifying current user
            : (user && user.email) ?
              (<span style={{ color: 'green' }}> {user.name}
                {/* <Button onClick={logOut}>Log-out</Button> */}
              </span>)
              : (user && user.name === 'Guest' ?
                <span style={{ color: 'red' }}>"Guest"
                {/* <br /><button onClick={resetGuestButton}>reset guest</button> */}
                </span>
                : <span style={{ color: 'red' }}>"? ? ?"
                {/* <br /> <button onClick={resetGuestButton}>reset guest</button> */}
                </span>)
          }

          {/* login button */}
          {(!user || !user.email) &&
            (<SLink to='/pushups/Sign-upLog-in'> Sign-up / Log-in </SLink>)
            /* (<Link  to='/pushups/Sign-upLog-in'> Sign-up / Log-in </Link>) */
          }

        </p>
      </div>
    )
  }
  else { return null };
};

export default withRouter(UserStatus);