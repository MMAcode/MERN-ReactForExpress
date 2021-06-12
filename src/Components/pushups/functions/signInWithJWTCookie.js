import { urlRoot, frontEndPushupsUrlRoot } from '../../../globalState/globalVariables';
import { postJsonDataUrlAfterAPI } from '../../../functions/postJsonData';
// import { withRouter } from 'react-router-dom';

const checkIfNewGuestOrCookiesDisabled = async (cookieCreated) => { //cookieCreated contains name of the cookie created
  //no cookie existed
  console.log("checking if cookies can be created. (no cookie was received on server...)");
  // console.log(data);
  if (cookieCreated) {
    // contact server and see if created cookie is sent back (if yes, it is guest profile and just leave it)
    console.log("Cookie was created by server")
    console.log("contacting server to see if created cookie persisted... cookie name: ", cookieCreated);
    let data2 = await postJsonDataUrlAfterAPI('/user/checkIfCookiesEnabled', { cookieName: cookieCreated });
    console.log("COOKIES ENABLED CHECK - data results: ", data2);
    if (data2.cookiesEnabled == false) {
      alert('Enable third party cookies for app to work. (Your data will not be shared with anyone. Click here if you want to know about how we are using cookies.) You will be directed to the home.');
      window.location.replace(`${frontEndPushupsUrlRoot}`);
      ////// history.push('/pushups');
    } else {
      console.log("This is just new Guest user. Don't worry, be happy :-). ");
    }

  } else {
    console.log("Cookie originaly not found on server, but also new not created -> some other problem.");
  }
}


const signInWithJWTCookie = async () => {
  // console.log("trying to sign in with cokie");
  try {
    let stage1 = await fetch(`${urlRoot}/user/checkJWTCookie`, { credentials: 'include' })
    // let { user } = await stage1.json();
    // console.log("trying to sign in with cokie - succes01-data(user or guest)", stage1);

    let data = await stage1.json();
    // console.log("trying to sign in with cokie - succes02-proccesesd data(user or guest)", data);
    // console.log("trying to sign in with cokie - succes02-proccesesd data(user:)", data.user);
    // console.log("trying to sign in with cokie - succes02-proccesesd data(guest)", data.guest);

    // if (data.user) return data.user
    // else if (!data.cookieFound) await checkIfNewGuestOrCookiesDisabled(data.cookieCreated)
    // else console.log("Cookie found. some other problem: ", data);

    if (data.user) return data.user
    else {
      if (!data.cookieFound) {
        console.log("NO COOKIES FOUND");
        // await checkIfNewGuestOrCookiesDisabled(data.cookieCreated);
        checkIfNewGuestOrCookiesDisabled(data.cookieCreated);
      }
      if (data.userToUse) {
        return data.userToUse //=created guest  
      } else {
        console.log("no user of guest found. no user created. some other problem: ", data);
        return {error:{miroErrorMessage:'Internet is probably not working.'}};
      }

    }

  }
  catch (error) {
    // console.log("Error second in fetch:", error);
    console.log("trying to sign in with cokie - error (Server not working probably)", error);

    return { email: 'error', data: error };
  }
}

export default signInWithJWTCookie;