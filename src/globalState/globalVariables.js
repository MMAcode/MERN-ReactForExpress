let projectName = 'MERN-ReactForExpress';
// let projectName = 'TestedPushupPlans';
let urlRoot = '';
let urlRootWithoutApi = '';
let frontEndPushupsUrlRoot = '';
let loginWithGoogleUrl = '';
let loginWithFacebookUrl = '';
let logoutFromGoogleUrl = '';
if (process.env.NODE_ENV === 'development') {
  urlRoot = '/api';
  // urlRoot = 'http://localhost:3000/api';
  // urlRoot = 'http://localhost:3001/api';
  urlRootWithoutApi = ''; //not used in pushups only in old mongo-testing component
  // urlRootWithoutApi = 'http://localhost:3001';
    frontEndPushupsUrlRoot = `http://localhost:3000/${projectName}#/pushups`;

  // loginWithGoogleUrl = '/api/authenticate/google';
  loginWithGoogleUrl = 'http://localhost:3001/api/authenticate/google';
  loginWithFacebookUrl = 'http://localhost:3001/api/authenticate/facebook';
  // logoutFromGoogleUrl = '/api/authenticate/googleLogout';
  logoutFromGoogleUrl = 'http://localhost:3001/api/authenticate/googleLogout';
}
if (process.env.NODE_ENV !== 'development') {
  urlRoot = 'https://mern-express-heroku.herokuapp.com/api';
  urlRootWithoutApi = 'https://mern-express-heroku.herokuapp.com';
  frontEndPushupsUrlRoot = `https://mmacode.github.io/${projectName}/#/pushups`;
  loginWithGoogleUrl = 'https://mern-express-heroku.herokuapp.com/api/authenticate/google';
  loginWithFacebookUrl = 'https://mern-express-heroku.herokuapp.com/api/authenticate/facebook';
  logoutFromGoogleUrl = 'https://mern-express-heroku.herokuapp.com/api/authenticate/googleLogout';
}



// urlRoot = 'https://mern-express-heroku.herokuapp.com/api';
// urlRoot = 'http://localhost:3001/api';

export { urlRoot, urlRootWithoutApi, frontEndPushupsUrlRoot, loginWithGoogleUrl,loginWithFacebookUrl, logoutFromGoogleUrl };
// export default urlRoot ;
