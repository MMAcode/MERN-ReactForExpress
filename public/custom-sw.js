self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('New notification', data);
  const options = {
    body: data.body,
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})

// self.addEventListener('install', e => {
//   console.log("MM c-sw install event fired");
// })


// self.addEventListener('notificationclose', function (e) {
//   var notification = e.notification;
//   var data = notification.data || {};
//   var primaryKey = data.primaryKey;
//   console.log('Closed notification: ' + primaryKey);
// });
// self.addEventListener('notificationclick', function (e) {
//   var notification = e.notification;
//   var data = notification.data || {};
//   var primaryKey = data.primaryKey;
//   var action = e.action;
//   console.log('Clicked notification: ' + primaryKey);
//   if (action === 'close') {
//     console.log('Notification clicked and closed', primaryKey);
//     notification.close();
//   }
//   else {
//     console.log('Notification actioned', primaryKey);
//     clients.openWindow('/');
//     notification.close();
//   }
// });