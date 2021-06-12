// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register(config) {
  //MM added
  if (!('serviceWorker' in navigator)) { console.log("MM: Service worker not supported on this browser/device."); }
  //MM added end.

  //MM001 change
  // if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  if ('serviceWorker' in navigator) { //MM to make it run in localhost too (just intuitive experiment)



    console.log("SERVICE WORKER register setup running");
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      console.log("SERVICE WORKER  won't work as PUBLIC_URL is on a different origin from what our page is served on.see https://github.com/facebook/create-react-app/issues/2374");
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      // const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      // MM001b

      //frm https://medium.com/@seladir/how-to-implement-web-push-notifications-in-your-node-react-app-9bed79b53f34
      const swFileName = process.env.NODE_ENV === 'production'
        ? 'service-worker.js'
        : 'custom-sw.js';
      const swUrl = `${process.env.PUBLIC_URL}/${swFileName}`;

      // let swUrl;
      // if (process.env.NODE_ENV === 'production') {
      //   swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      // } else {
      //   // swUrl = `${__dirname}/serviceWorker.js`;   //NONE working:-(
      //   // swUrl = './serviceWorker.js';
      //   // swUrl = '/serviceWorker.js';
      //   swUrl = '/service-worker.js';
      // }


         if (isLocalhost) {
        console.log("MM SW on LOCALHOST - check");
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }




    });
  }
}

function registerValidSW(swUrl, config) {
  console.log("MM Valid sw found. registering it... (navigator:)",  navigator)
  navigator.serviceWorker
    .register(swUrl)  //MM here sw is being registered
    .then(registration => {
      console.log("MM. sw was registered: ", registration);
      // console.log("MM. navigatior now: ", navigator);
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  console.log("MM checking if sw is valid");
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');

      // console.log("MM we got some response", response.status === 404,contentType != null);
      console.log("MM sw is valid:", !(response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)));

      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
