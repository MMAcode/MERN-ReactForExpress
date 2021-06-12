import React from 'react';
import SignUp from './SignUp'
import LogIn from './LogIn'

import { urlRoot, loginWithGoogleUrl, loginWithFacebookUrl,logoutFromGoogleUrl } from '../../globalState/globalVariables';
import postJsonData from '../../functions/postJsonData'

import { Accordion, Card } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import Gicon from '../../images/google/Gicon.png';
import Ficon from '../../images/facebook/logoSmall.png';
// const Sdiv = styled.div`
//  /* background:orange; */
//  background:rgba(255, 166, 0, 0.752);
//   padding:5px 10px;
//   border: orange solid 2px;
//  `

// const Gap = styled(SignUp)`
// /* background:red; */
// padding:30px !important;
// background-color: red !important;
// `
const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
background-color: rgba(233, 154, 7, 0.62);
margin: 0 5px 8px 5px;
`

const SignUpInOut = ({ setUser }) => {

  const signInWithGoogleButtonClicked = async () => {
    // const apiUrl = `${urlRoot}/authenticate/google`;
    // // const apiUrl = `${urlRoot}/generalPushups/getPublicPlan_s`;
    // const serverResponse = await postJsonData(apiUrl);

    console.log("loginWithGoogleUrl: ", loginWithGoogleUrl);
    window.location.replace(loginWithGoogleUrl);

  }

  // const signOutFromGoogleButtonClicked = () => {
  //   console.log("logoutFromGoogleUrl: ", logoutFromGoogleUrl);
  //   window.location.replace(logoutFromGoogleUrl);
  //   // window.location.replace("http://localhost:3001/api/start");
  // }

  const signInWithFacebookButtonClicked = () => {
    console.log("loginWithFACEBOOKUrl clicked: ", loginWithFacebookUrl);
    window.location.replace(loginWithFacebookUrl);
    
  }

  return (
    <div style={{ clear: 'left' }}>
      {/* <Accordion as={SCAccordion} > */}

      <div style={{ textAlign: 'center' }}>
        <h5>You will be remembered on this device for automatic log-ins in the future. </h5><br /><h5> If you don't want that, log-out when you finish. </h5>
      </div>

      {/* google, facebook */}
      <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-around' }}>
        {/* <h3>External providers</h3> */}
        <button style={{
          fontSize: '4vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '40px',
          boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.35)'
          
        }} onClick={signInWithGoogleButtonClicked}>
          <img src={Gicon} style={{ width: '30px', height: '30px', margin: '4px', marginRight: '10px' }} alt="Logo" />
          <span>Sign-in with Google</span>
        </button>

<button style={{
          fontSize: '4vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5353f5',
          borderRadius: '40px',
          // boxShadow: '6px 6px 5px 0px rgba(0,0,0,0.35)',
          boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.35)'
// 
        }} onClick={signInWithFacebookButtonClicked}>
           <img src={Ficon} style={{ width: '50px', height: '50px', margin: '4px', marginRight: '10px' }} alt="Logo" />
          <span>Sign-in with Facebook</span>
          </button>
      </div>
      {/* <div style={{width:'30px',height:'30px', backgroundImage:`url(${Gicon})`}}></div> */}
      {/* <div style={{width:'30px',height:'30px', background:'blue'}}></div> */}

      <br />
      <div>
        <h3>Sign-up / Log-in with Email and Password</h3>
        <Accordion className='p-3'>
          <Card >
            <Accordion.Toggle as={Card.Header} eventKey="0" className="p-3 mb-2 bg-info text-white text-center btnOpacity">
              Sign-up
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <SCard>
                {/* <Sdiv as={SignUp} setUser={setUser}  /> */}
                {/* <SignUp as={Sdiv} setUser={setUser}  /> */}
                <SignUp />
              </SCard>
            </Accordion.Collapse>
          </Card>
          <Card >
            <Accordion.Toggle as={Card.Header} eventKey="1" className="p-3 mb-2 bg-info text-white MMpointer  text-center btnOpacity">
              Log-in
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <SCard>
                <LogIn />
              </SCard>
            </Accordion.Collapse>
          </Card>
        </Accordion>

      </div>
      <div>
        {/* <h4> google sign-in</h4> */}
        {/* <button onClick={signOutFromGoogleButtonClicked}>Sign-out from Google</button> */}
      </div>
    </div>
  );
};

export default SignUpInOut;