import React from 'react';
// import PushUpsContext from '../../state/PushUpsContextState';
import PushUpsContext from './state/PushUpsContextState';


const Community = () => {
  let { user, updateUser, publicPlans, allUsers } = React.useContext(PushUpsContext);
  return (
    <div>
      <h1>Community</h1>
      <p>Hopefully, once...</p>
      <p>SHARE:</p>
      <p>invite friend</p>
      <p>post on social media (Facebook)</p>
      <p>get shareable link</p>
      <h3>Existing users:</h3>
      {allUsers ? allUsers.names.map((user,i) => <p key={i}>{user.name}</p>):<p>loading...</p>}
    </div>
  );
};

export default Community;