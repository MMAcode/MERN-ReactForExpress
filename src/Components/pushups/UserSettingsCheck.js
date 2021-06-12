import React from 'react';
import PushUpsContext from './state/PushUpsContextState';
import UserSettings from './UserSettings';

const UserSettingsCheck = () => {
  let { user, updateUser, publicPlans, allUsers } = React.useContext(PushUpsContext);

  if (!user) return (<p>loading user data...</p>)
  // if (!user.email) return (<p>Module available only to registered users. Please register or log-in.</p>)
  return (<UserSettings/>);
};

export default UserSettingsCheck;