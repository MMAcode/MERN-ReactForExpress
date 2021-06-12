import React from 'react';
// import PushUpsContext from '../../state/PushUpsContextState';
import PushUpsContext from './state/PushUpsContextState';


const UserProfile = () => {
  let { user, updateUser, publicPlans, allUsers } = React.useContext(PushUpsContext);
  return (
    <div>
      <h1>User Profile</h1>
      <p>Hopefully, once...</p>
    </div>
  );
};

export default UserProfile;