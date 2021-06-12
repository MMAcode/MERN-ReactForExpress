import React from 'react';
import pushupsContext from '../state/PushUpsContextState';
import { Accordion, Card } from 'react-bootstrap';
import CounterAllIn from '../basicComponents/CounterAllIn';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop';
import { urlRoot } from '../../../globalState/globalVariables';
import postJsonData from '../../../functions/postJsonData';
import { Link } from 'react-router-dom';
import { SLink, SLinkDiv } from '../Home'

import IconAndText from '../basicComponents/IconAndText';
import { ReactComponent as IconMaxRepsTest } from '../../../images/icons/maxRepsTest.svg';
import Info from '../basicComponents/Info'

// import styled from 'styled-components'
// export const Sbutton = styled.button`
// color:red !important;
// `





const MaxRepsButtonInterface = ({ openByDefault }) => {
  const { user, updateUser } = React.useContext(pushupsContext);
  const [estimatedValue, setEstimatedValue] = React.useState(10);
  let maxRepsToggleButton = React.useRef();

  let shinyStyle = !user?.assessments ? ({
    // background: 'transparent',
    animation: `AnimatedButtonMiro 4s infinite 0s ease-in-out`,
  }) : '';


  // console.log("OOOOOOOOOOOOOOOO openByDefault1: ", openByDefault);
  openByDefault = openByDefault ? (openByDefault === false ? '0' : '1') : '0';
  // console.log("OOOOOOOOOOOOOOOO openByDefault2: ", openByDefault);


  const submitEstimatedMaxReps = async () => {
    // console.log("reps: ", estimatedValue);
    document.getElementById('submitEstimatedMaxRepsInHomeSectionID').innerHTML = 'Thanks'
    const userInfoForServer = {
      reps: estimatedValue,
      notes: 'Estimation',
      // partOfPlan:
    }

    const apiUrl = `${urlRoot}/pushups/saveNewAssessment`;
    try {
      const updatedUser = await postJsonData(apiUrl, userInfoForServer);
      updateUser(updatedUser);
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // history.push('/pushups');
      // setSubmitted(false);
    } catch (err) { console.log(err) };
  };





  if (!user) return <p>loading data...</p>
  return (
    <div>
      {/* <button style={{ fontSize: '1.1rem' }}>
        Update My Max Reps
        {user && user.assessments && ` (${user.assessments[0].reps})`}
      </button> */}



      <Accordion
        // className='p-1'
        style={{ margin: '0', background: 'none', border: 'none' }}
        // defaultActiveKey={(user.assessments && user.assessments.length > 0) ? '0' : '1'}
        defaultActiveKey={`${openByDefault}`}
      // defaultActiveKey='1'
      >

        <Card style={{
          border: 'none',
          // backgroundColor: 'transparent',
          background: `${(user?.assessments) ? 'linear-gradient(180deg,lightGray 60%, white)' : 'orange'}`,
          boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
          margin: '0 10px', ...shinyStyle
        }}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="1"
            id='maxRepsButtonInterfaceAccordionID'
            ref={maxRepsToggleButton}
            // onClick={togglePublicPlansView}
            // onClick={() => positionElementToTheTop(document.getElementById(`maxRepsButtonInterfaceAccordionID`), 0)}
            onClick={() => positionElementToTheTop(maxRepsToggleButton.current, 350)}

            className="bg-none MMpointer btnOpacity"
            // style={{ background: 'orange', maxWidth: '85vw', margin: 'auto', border: 'none', borderRadius: '7px 7px 0 0' }}
            // style={{ background: '#ffd400', margin: '0 10px',padding:'3px', border: 'none', borderRadius: '7px 7px 0 0' }}
            style={{
              // color: '#007bff',
              // backgroundColor:'transparent',
              // background: `${(user && user.assessments) ? 'linear-gradient(180deg,lightGray 60%, white)' : 'orange'}`,
              // boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
              margin: '0px', padding: '0px', border: 'none', borderRadius: '3px'
            }}
          >

            {/* <p style={{ textAlign: 'center', backgroundColor:'lightGray',fontSize:'1.4rem' }}> */}
            {/* Update My Max Reps. {user && user.assessments && ` (${user.assessments[0].reps})`} */}
            {/* </p> */}
            {(user.assessments?.length > 0) ? <SLinkDiv
              style={{
                // backgroundColor: 'lightGray',
                backgroundColor: 'transparent',
                // display: 'flex', alignItems: 'center', justifyContent: 'space-around',
                margin: '0'
              }}>

              <div style={{
                // display: 'flex', alignItems: 'center', justifyContent: 'center',
                // color: '#007bff'
              }}>

                <IconAndText>
                  <IconMaxRepsTest />
                  <div>
                    <span>Update My Max reps</span>
                    <span style={{
                      display: 'inline-block', background: 'white', padding: '5px', margin: 'auto 0 auto 10px', borderRadius: '25% 0 25% 0', fontSize: '0.8rem', fontWeight: 'bold',
                      // border: '1px solid blue'
                    }}
                    >{user.assessments[0].reps}</span>
                  </div>
                </IconAndText>

              </div>
              {/* <SLink style={{ backgroundColor: 'lightGray', border: '1px dashed #8080807d', fontSize: '1rem', padding: '5px', margin: '3px' }} to='/pushups/maxRepsTest'> Ass.      </SLink> */}
            </SLinkDiv>

              :
              <IconAndText>
                <IconMaxRepsTest />
                <h5 style={{ textAlign: 'center' }}>How many consecutive pushups can you do?  🔽</h5>
              </IconAndText>

            }
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            {/* <Card style={{textAlign:'center',  border: '4px solid orange', overflowY: 'auto', backgroundColor: 'ffd400 !important', paddingTope: '0' }}> */}
            {/* <Card style={{ textAlign: 'center', border: '2px solid lightGray', overflowY: 'auto', backgroundColor: 'orange', paddingTope: '0' }}> */}
            <Card style={{ textAlign: 'center', border: 'none', overflowY: 'auto', backgroundColor: 'orange', paddingTope: '0' }}>
              <Info absolute faceLeft right='0' up='-40'>
              <h4>Why this?</h4>
                <p>Some training plans are harder than others. App will recommend you plans appropriate for your level.</p>
                {/* <h4>See progress</h4> */}
                <br/>
                <p>To be able to see, if you achieved any progress after 14 days of training, it is important measure on the beginning and on the end of your 14-days cycle, how many consecutive pushups can you do as maximum. </p>
                <p>After 14 days, when you will see, how much progress you achieved, you will be motivated to continue with the trainings. Progress/Success - the sweetest thing :-).</p>
            </Info>
              <div style={{ borderRadius: '100%', margin: '8px', backgroundColor: 'lightGreen', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.35)', padding: '20px' }}>
              
                <h5>Do Assessment:</h5>
               
                {/* <p style={{ fontSize: '1rem' }}>Slower but reliable.</p> */}
                {/* <p style={{ fontSize: '0.8rem', color: 'gray' }}>Use this if you want to measure your progress.</p> */}


                <p style={{ fontSize: '1rem' }}>Use this if you want to monitor your progress. </p>
                <p style={{ fontSize: '0.8rem', color: 'gray' }}>(Recommended)</p>
                <Link to='/pushups/maxRepsTest'>
                  <button style={{ borderRadius: '100px', padding: '5px 30px' }}>Continue here</button>
                </Link>

              </div>
              <h4 style={{ textAlign: 'center', color: 'red' }}>or</h4>
              <div style={{ borderRadius: '200%', margin: '8px', backgroundColor: 'orange', boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.35)', padding: '13px' }}>
                <h5>Estimate:</h5>
                {/* <p style={{ fontSize: '1rem' }}>Fast but superficial.</p> */}
                {/* <p style={{ fontSize: '0.8rem', color: 'gray' }}>Use this if you just want to get your head around.</p> */}
                <CounterAllIn settings={[1, 5, setEstimatedValue, estimatedValue, '', 'reps', 0, undefined, 'borderBeautiful']} />
                {/* <button onClick={submitEstimatedMaxReps}>Submit</button> */}
                <Accordion.Toggle
                  id='submitEstimatedMaxRepsInHomeSectionID'
                  eventKey="1"
                  onClick={submitEstimatedMaxReps}
                  style={{ borderRadius: '100px', padding: '5px 30px' }}
                >
                  Submit
                </Accordion.Toggle>
              </div>
              {/* <Info faceLeft> */}
              {/* <Info absolute right='0'padding='0 0 7px 7px'>
                <h4>Select good plan</h4>
                <p>Some training plans are harder than others. App will recommend you plans appropriate for your level.</p>
                <br />
                <h4>See progress</h4>
                <p>To be able to see, if you achieved any progress after 14 days of training, it is important measure on the beginning and on the end of your 14-days cycle, how many consecutive pushups can you do as maximum. </p>
                <p>After 14 days, when you will see, how much progress you achieved, you will be motivated to continue with the trainings. Progress/Success - the sweetest thing :-).</p>
              </Info> */}
            </Card>
          </Accordion.Collapse>


        </Card>
      </Accordion>


    </div>
  );
};

export default MaxRepsButtonInterface;