import { urlRoot } from './globalState/globalVariables';
import { postJsonDataUrlAfterAPIpushups, postJsonDataUrlAfterAPI } from './functions/postJsonData';


const myPublicValidKey = 'BByn6l9bvGGsFgaL8FPe_SDZfnI45uNbpipyPf0DT4RlmYMkEiImM2e3DBdxMVLHdT6q9o5EcWx6ykld7tR6CgA';
const convertedVapidKey = urlBase64ToUint8Array(myPublicValidKey);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function sendSubscription(subscription, newOrExisting, deviceName) {
  //Miro section start
  console.log("FETCH SUBSCRIPTION is about to start................................");
  // let ansFromServer1 = await postJsonDataUrlAfterAPIpushups('/testCORS', {});
  // console.log("FETCH SUBSCRIPTION miro test f1. returned:", ansFromServer1);

  // let ansFromServer2 = await postJsonDataUrlAfterAPIpushups('/testCORS2', {});
  // console.log("FETCH SUBSCRIPTION miro test f2. returned:", ansFromServer2);

  // let ansFromServer3 = await postJsonDataUrlAfterAPI('/testCORS3', {});
  // console.log("FETCH SUBSCRIPTION miro test f3. returned:", ansFromServer3);

  // let ansFromServer4 = await postJsonDataUrlAfterAPI('/testCORS4', {});
  // console.log("FETCH SUBSCRIPTION miro test f4. returned:", ansFromServer4);

  const notificationSubscription = { subscription: { subscription, newOrExisting, deviceName } };
  // let ansFromServerS = await postJsonDataUrlAfterAPI('/notifications/subscribe', subscription);
  // let ansFromServerS = await postJsonDataUrlAfterAPI('/notifications/subscribe', notificationSubscription);
  try {
    let ansFromServerS = await postJsonDataUrlAfterAPI('/pushups/notifications/subscribe', notificationSubscription);

    // let ansFromServerS = await postJsonDataUrlAfterAPI('/pushups/notifications/subscribe', notificationSubscription);
    console.log("FETCH SUBSCRIPTION miro test S. returned:", ansFromServerS);
    return { success: true, message: 'success - subscription saved in DB' }
  } catch (err) {
    return { success: false, message: 'error - subscription NOT saved in DB' }
  }
  //Miro section end


  // return fetch(`${urlRoot}/notifications/subscribe`, {
  //   method: 'POST',
  //   // body: { subscription: JSON.stringify(subscription) },
  //   body: JSON.stringify(subscription),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   credentials: 'include'
  // })
}

// export async function subscribeUser(deviceName) {
//   console.log("MMSS007 'subscribeUser' runnning");
//   let resultMiroVariable= {success: false, message:'some issues here...:-('};//Miro's variable for tracking success
//   if ('serviceWorker' in navigator) {
//     console.log("MMSS007 'serviceWorker ready ? ? ?");
//     navigator.serviceWorker.ready.then(async function (registration) {
//       console.log("MMSS007 'serviceWorker ready");  
//       if (!registration.pushManager) {
//         console.log('MMSS007 Push manager unavailable.');
//         // resultMiroVariable = { success: false, message: 'MMSS007 Push manager unavailable.' };
//         // return resultMiroVariable;
//       }

//       registration.pushManager.getSubscription().then(async function (existedSubscription) {
//         if (existedSubscription === null) {
//           console.log('MMSS007 No subscription detected, make a request.')
//           registration.pushManager.subscribe({
//             applicationServerKey: convertedVapidKey,
//             userVisibleOnly: true,
//           }).then(async function (newSubscription) {
//             console.log('MMSS007 New subscription added.')
//             resultMiroVariable = await sendSubscription(newSubscription, 'new',deviceName);
//             // return resultMiroVariable;
//           }).catch(function (e) {
//             if (Notification.permission !== 'granted') {
//               console.log('MMSS007 Permission was not granted.')
//             } else {
//               console.error('MMSS007 An error ocurred during the subscription process.', e)
//             }
//           })
//         } else {
//           console.log('MMSS007 Existed subscription detected.')
//           resultMiroVariable = await sendSubscription(existedSubscription, 'existing',deviceName); //not needed here?
//           // return resultMiroVariable;
//         }
//       })
//     })
//       .catch(function (e) {
//         console.error('An error ocurred during Service Worker registration.', e);
//         resultMiroVariable = { success: false, message: 'An error ocurred during Service Worker registration.' };
//         // return resultMiroVariable;
//       })
//   }
//   return resultMiroVariable;
// }


export async function subscribeUser(deviceName) {
  console.log("MMSS007 'subscribeUser' runnning");
  let resultMiroVariable = { success: false, message: 'some issues here...:-(' };//Miro's variable for tracking success
  if ('serviceWorker' in navigator) {
    console.log("MMSS007 'serviceWorker ready ? ? ?");
    try {
      let registration = await navigator.serviceWorker.ready;
      console.log("MMSS007 'serviceWorker ready");
      if (!registration.pushManager) {
        console.log('MMSS007 Push manager unavailable.');
        resultMiroVariable = { success: false, message: 'MMSS007 Push manager unavailable.' };
        return resultMiroVariable;
      }

      let existedSubscription = await registration.pushManager.getSubscription();
      if (existedSubscription === null) {
        console.log('MMSS007 No subscription detected, make a request.');
        try {
          let newSubscription = await registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          })

          console.log('MMSS007 New subscription added.')
          resultMiroVariable = await sendSubscription(newSubscription, 'new', deviceName);
          return resultMiroVariable;
        } catch (e) {
          if (Notification.permission !== 'granted') {
            console.log('MMSS007 Permission was not granted.')
          } else {
            console.error('MMSS007 An error ocurred during the subscription process.', e)
          }
        }
      } else {
        console.log('MMSS007 Existed subscription detected.')
        resultMiroVariable = await sendSubscription(existedSubscription, 'existing', deviceName); //not needed here?
        return resultMiroVariable;
      }

    } catch (e) {
      console.error('An error ocurred during Service Worker registration.', e);
      resultMiroVariable = { success: false, message: 'An error ocurred during Service Worker registration.' };
      return resultMiroVariable;
    }
  }
  return resultMiroVariable;
}