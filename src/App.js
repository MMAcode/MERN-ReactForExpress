//rsc  -> f.c.
import React from 'react';
import { Link, Route, Switch, HashRouter, withRouter,Redirect } from 'react-router-dom';
import './App.css';
// import FirstPage from './Components/FirstPage'
import Playground from './Components/playground/Playground'
import APIPage from './Components/APIPage'
// import Test from './Components/Test'
import styled from 'styled-components'
import TRpage from './Components/translate/TRpage'
// import MongoDB from './Components/mongoDB/MongoDB'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Pushups from './Components/pushups/Pushups'
import States from './Components/states/States'

// import SignUp from './Components/mongoDB/components/SignUp'

///stitch provider
// import { StitchAuthProvider } from "./Components/pushups/stitch/ReactStitchAuth";


import WakeUpserverState from './Components/APIs/WakeUpServerCleaned';
import { urlRoot } from './globalState/globalVariables';
import Sounds from './Components/sounds/Sounds';
import SoundsReact from './Components/sounds/SoundsReact';

const SMenu = styled.div`
display: flex;
flex-wrap:wrap;
justify-content: center;

align-items: center;
background-color: yellow;
/* overflow:auto; */
`
export const SLink = styled(Link)`
margin:10px;
background-color:orange;
padding: 3px;
border-radius:3px;
text-decoration:none;
text-align: center;
&:hover{ 
  background-color:#996b15;
  color:white;
  text-decoration:none;
  /* font-size:20px; */
}
/* transition: background-color, color; */
transition-duration: 0.25s;
`
function App({location:{hash}}) {
  // console.log("history: ", hash.includes('#/'));
  // console.log("history: ", (hash=='#/'));
  return (
    // div replaced to HAshRouter
    <HashRouter basename='/' className="App">

      {/* <header className="App-header">
      </header> */}
      {/* <Switch> */}
      
      
      {/* <Route exact path='/pushups' component={Pushups} /> */}

      {!hash.includes("#/") && // to hide menu
        <SMenu>
          <SLink to='/'>Home</SLink>
          <SLink to='/pageAPI'>Public API</SLink>
          <SLink to='/pageTr'>Translate API</SLink>
          <SLink to='/playground'>Playground</SLink>
          {/* <SLink to='/mongoDB'>Mongo DB</SLink> */}
          <SLink to='/states'>states-useless</SLink>
          <SLink to='/pushups'>Pushups</SLink>
          {/* <SLink to='/sounds'>Sounds</SLink> */}
          <SLink to='/sounds/React'>Sounds in React</SLink>

          <WakeUpserverState url={urlRoot + '/start'} />
          <span style={{ textAlign: 'center', fontSize: '11px', border: '3px dotted gray' }}>
            <div className='serverState'> Server-State</div>
            <span>Environment:</span> <span style={{ color: 'red' }}> {process.env.NODE_ENV}</span>
          </span>
        </SMenu>}
      {/* </Switch> */}
      <Switch>
        {/* <Route exact path='/' component={FirstPage} /> */}
        <Route exact path='/'><Redirect to='/pushups'/></Route>
        <Route exact path='/playground' component={Playground} />
        <Route exact path='/pageAPI' component={APIPage} />
        <Route exact path='/pageTr' component={TRpage} />
        {/* <Route exact path='/mongoDB' component={MongoDB} /> */}
        <Route exact path='/states' component={States} />
        <Route exact path='/sounds' component={Sounds} />
        <Route exact path='/sounds/React' component={SoundsReact} />
        <Route path='/pushups' component={Pushups} />
        {/* <Route component={FirstPage} /> catch all other routes */}
      </Switch>
      {/* <SignUp/> */}


    </HashRouter>
  );
}

export default withRouter(App);
