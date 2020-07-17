/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/MERN-ReactForExpress/precache-manifest.3649c9b6da6b0bb1055fb20f9e837fb0.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/MERN-ReactForExpress/index.html"), {
  
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});
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