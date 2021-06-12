import React, { useEffect, useContext } from 'react';
import PushUpsContextState from './state/PushUpsContextState'
import { withRouter } from 'react-router-dom';
// import { SLink } from '../../App';

import signInWithJWTCookie from './functions/signInWithJWTCookie';
// import SignUpInOut from './SignUpInOut'
import postJsonData from '../../functions/postJsonData'
// import { Button } from 'react-bootstrap';
import { urlRoot } from '../../globalState/globalVariables';

import { Link } from 'react-router-dom';




const UserStatus = ({ history }) => {
  const [userStatusInfo, setUserStatusInfo] = React.useState('notYetLoaded');
  let userContext = useContext(PushUpsContextState);
  let user = null;
  if (userContext.user) {//to allow to load Guest too
    user = userContext.user;
  }

  useEffect(() => {
    // console.log("GETTING USER");
    setUserStatusInfo(user ? 'loaded' : 'loading');
  }
    , [user]   ///now runs on every rerender, with [] runs only on first
  )

  const resetGuestButton = async () => {
    let data = await postJsonData(`${urlRoot}/guest/resetGuest`, {});
    console.log("reset guest DDDDDDDDDDDDDDData:", data);
    userContext.updateUser({ ...data.guest });

  }

  if (history.location.pathname === '/pushups' || history.location.pathname === '/') {
    return (
      <div style={{ padding: '5px', display: 'flex', justifyContent: 'flex-end'  }}>
        <div style={{ textAlign: 'right', paddingRight: '5px', display: "inline-flex",alignItems:'center' }}>
          <span style={{paddingRight:'5px'}}>{userStatusInfo != 'loading' && 'Welcome '}</span>
          {/* user status */}
          {userStatusInfo === 'loading' ?
            'loading...'///Identifying current user
            : (user && user.email) ?
              (<span style={{ color: 'green' }}> {user.name}
                {/* <Button onClick={logOut}>Log-out</Button> */}
              </span>)
              : (user && user.name === 'Guest' ?
                <span style={{ color: 'red' }}>" Guest"
                </span>
                : <span style={{ color: 'red' }}>"? ? ?"
                </span>)
          }

          {/* login button */}
          {(!user || !user.email) &&
            <div style={{
                // display: 'inlineFlex',
                display: 'inline-flex',
            backgroundColor: 'red',
                alignItems:'center',
            justifyContent: 'center',
            padding: '10px',
            margin: '10px',
                // borderRadius:'200%'
                borderRadius:'5px'
              }}>
              {/* <Link to='/pushups/Sign-upLog-in'>Sign-up<br /> Log-in      </Link> */}
              <Link to='/pushups/Sign-upLog-in'>Sign-up / Log-in      </Link>
            </div>
            
          }

        </div>
      </div>
    )
  }
  else { return null };
};

export default withRouter(UserStatus);