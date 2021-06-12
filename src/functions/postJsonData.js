import { urlRoot } from '../globalState/globalVariables';
// import { miroErrorGlobalTest } from '../Components/pushups/functions/errorToast';
import {updateMiroErrorData} from '../Components/pushups/ErrorBoundary';

// console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG: ", updateMiroErrorData);


export async function postJsonDataUrlAfterAPIpushups(urlEnd, data) {
  let url = urlRoot + '/pushups' + urlEnd;
  let dataToReturn;
  // console.log("1 Starting PostJson SEND Pushups request with url and data:",url, data);


  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    };
    // options.credentials = 'include';
    const response = await fetch(url, options);
    // console.log("fetched response:", response);
    dataToReturn = await response.json(); // parses JSON response into native JavaScript objects
    // console.log("POSTPushupJSON JSON RESPONSE:", dataToReturn);
    // console.log("type of...", typeof dataToReturn);
    return dataToReturn;
  }
  catch (err) {
    updateMiroErrorData({text:"!!!err in receiving json data back from postJsonDataUrlAfterAPIpushups request", err});
    console.log("!!!err in receiving json data back from postJsonDataUrlAfterAPIpushups request", err);
    dataToReturn = err;
    return dataToReturn;
  }
  // return dataToReturn;
}

export async function postJsonDataUrlAfterAPIgeneralPushups(urlEnd, data) {
  let url = urlRoot + '/generalPushups' + urlEnd;
  let dataToReturn;

  // console.log("1 Starting PostJson SEND Pushups request with url and data:",url, data);
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    };
    // options.credentials = 'include';
    const response = await fetch(url, options);
    // console.log("fetched response:", response);
    dataToReturn = await response.json(); // parses JSON response into native JavaScript objects
    // console.log("POSTPushupJSON JSON RESPONSE:", dataToReturn);
    // console.log("type of...", typeof dataToReturn);
    return dataToReturn;
  }
  catch (err) {
    updateMiroErrorData({ text: "!!!err in receiving json data back from postJsonDataUrlAfterAPIgeneralPushups request", err });
    // await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("!!!err in receiving json data back from postJsonDataUrlAfterAPIgeneralPushups request", err);

    dataToReturn = err;
    return dataToReturn;
  }
  // return dataToReturn;
}

export async function postJsonDataUrlAfterAPI(urlEnd, data) {
  let url = urlRoot + urlEnd;
  let dataToReturn;
  console.log("POST_JSON1: Starting PostJson SEND Pushups request with url and data:",url, data);
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    };
    options.credentials = 'include'; //to enable cookies. was turned off, now testing as 'on'
    const response = await fetch(url, options);
    console.log("POST_JSON2:fetched response:", response);
    dataToReturn = await response.json(); // parses JSON response into native JavaScript objects
    console.log("POST_JSON3: POSTPushupJSON JSON RESPONSE:", dataToReturn);
    console.log("POST_JSON3b:type of...", typeof dataToReturn);
    return dataToReturn;
  }
  catch (err) {
    updateMiroErrorData({text:"!!!err in receiving json data back from postJsonDataUrlAfterAPI request", err});
    
    console.log("POST_JSON4: !!!err in receiving json data back from postJsonDataUrlAfterAPI request", err);
    dataToReturn = err;
    return dataToReturn;
  }
  // return dataToReturn;
}

async function postJsonData(url, data) {
  let dataToReturn;
  console.log("POST_JSON-B1: Starting PostJson SEND (No Pushups) request with url and data:",url, data);

  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include' //to enable cookies. was turned off, now testing as 'on'
    };
    // options.credentials = 'include';
    const response = await fetch(url, options);
    // const response = await fetch(url, {credentials:'include'});
    console.log("POST_JSON-B2:fetched response:", response);
    dataToReturn = await response.json(); // parses JSON response into native JavaScript objects
    // console.log("DATA returned from server: ", ...dataToReturn);
    console.log("POST_JSON-B3:DATA returned from server: ", dataToReturn);
  }
  catch (err) {
    updateMiroErrorData({text:"POST_JSON-B4:!!!err in receiving json data back from POSTJson request", err});

    console.log("POST_JSON-B4:!!!err in receiving json data back from POSTJson request", err);
    dataToReturn = err;
  }
  return dataToReturn;
}

export default postJsonData;