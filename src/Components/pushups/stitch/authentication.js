import {
  AnonymousCredential,
  GoogleRedirectCredential
} from "mongodb-stitch-browser-sdk";

import { app } from "./app.js";

////ANONYMOUS login
export function loginAnonymous() {
  // Allow users to log in anonymously
  const credential = new AnonymousCredential();
  return app.auth.loginWithCredential(credential);
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return app.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user
  return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  const user = getCurrentUser();
  return app.auth.logoutUserWithId(user.id);
}



//////GOOGLE login
export function addAuthenticationListener(listener) {
  app.auth.addAuthListener(listener);
}
export function removeAuthenticationListener(listener) {
  app.auth.removeAuthListener(listener);
}

export async function loginGoogle() {
  console.log("loginGoogle running...")
  return await app.auth.loginWithRedirect(new GoogleRedirectCredential());
}

export function handleOAuthRedirects() {
  // console.log("RRRRRRRRRRRRRRRRRRR", app.auth.hasRedirectResult());
  if (app.auth.hasRedirectResult()) {
      return app.auth.handleRedirectResult();
  }
};