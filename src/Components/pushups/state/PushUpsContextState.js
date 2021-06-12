import { createContext } from 'react';
export let pushUpsState = {
  user: null,
  info: 'Pushups context',
  reRender:0,
  updateUser(newUser) {
    this.user = newUser;
    console.log("context updated to ", this);
    this.reRender += 1;
  }
};

const PushUpsContext = createContext(pushUpsState);
export default PushUpsContext;

