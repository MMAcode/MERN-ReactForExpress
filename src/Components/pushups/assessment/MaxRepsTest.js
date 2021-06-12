import React from 'react';
import AssessmentForm from './AssessmentForm';
import { withRouter } from 'react-router-dom';
import imageT from '../img/form/t.png'

import pushupsContext from '../state/PushUpsContextState';
import { Accordion, Card } from 'react-bootstrap';
import CounterAllIn from '../basicComponents/CounterAllIn';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop';
import PaceMaker from '../assessment/PaceMaker';

import IconAndText from '../basicComponents/IconAndText';
import { ReactComponent as IconMaxRepsTest } from '../../../images/icons/maxRepsTest.svg';
import { ReactComponent as IconRules2 } from '../../../images/icons/rules2.svg';
import { ReactComponent as IconBook } from '../../../images/icons/book.svg';
import { ReactComponent as IconMetronom } from '../../../images/icons/metronom.svg';
import { ReactComponent as IconPacemaker } from '../../../images/icons/pacemaker.svg';
import { ReactComponent as IconResult } from '../../../images/icons/result.svg';


const MaxRepsTest = ({ history }) => {
  const { user, updateUser } = React.useContext(pushupsContext);

  React.useEffect(() => {
    // (async () => { await new Promise(resolve => setTimeout(resolve, 350)); })()
    //scroll should be within this async anyway to be delayed
    window.scrollTo(0, 0);
    // openByDefault = openByDefault===true ? '1' : '0';
    // console.log("OOOOOOO openByDefault: ", openByDefault);
  }, []);

  if (!user) return <p>loading data...</p>
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h2>Test Your Max Reps</h2>
        <p>Do as many push-ups as you can.</p>
      </div>

      {/* rules */}
      <Accordion
        // className='p-1'
        style={{ margin: '0', background: 'none', border: 'none' }}
        defaultActiveKey={(user.assessments && user.assessments.length > 0) ? false : true}
      // defaultActiveKey='1'
      >
        <Card style={{ border: 'none', backgroundColor: 'transparent' }}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="1"
            id='maxRepsRulesButtonInterfaceAccordionID'
            // onClick={togglePublicPlansView}
            onClick={() => positionElementToTheTop(document.getElementById(`maxRepsRulesButtonInterfaceAccordionID`), 0)}

            className="bg-none MMpointer btnOpacity"
            // style={{ background: 'orange', maxWidth: '85vw', margin: 'auto', border: 'none', borderRadius: '7px 7px 0 0' }}
            // style={{ background: '#ffd400', margin: '0 10px',padding:'3px', border: 'none', borderRadius: '7px 7px 0 0' }}
            style={{ color: '#007bff', background: 'orange', margin: '0 10px', padding: '3px', border: 'none', borderRadius: '3px' }}
          >
            <IconAndText>
              <IconBook />
            <h2 style={{ textAlign: 'center' }}>1) Rules  🔽</h2>

            </IconAndText>

            
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            {/* <Card style={{textAlign:'center',  border: '4px solid orange', overflowY: 'auto', backgroundColor: 'ffd400 !important', paddingTope: '0' }}> */}
            <Card style={{ textAlign: 'left', border: 'none', overflowY: 'auto', backgroundColor: 'orange', paddingTop: '0', }}>
              {/* <h3>Rules</h3> */}
              <div style={{
                width: '70vw', height: 'auto', margin: 'auto',
                display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center'
              }}>
                <img style={{ width: '100%', height: 'auto' }} src={imageT} alt=""></img>
              </div>
              <ul>
                <li>Warm up.</li>
                <li>Palms shoulder-width apart (or a bit more).</li>
                <li>Body in a straight line.</li>
                {/* <li></li> */}
                <li>Elbows in 45° angle to the body.</li>
                <li>Full range of motion. (Chest touching the floor.)</li>
                <li>Following 2 second pace. (Use "Pace Tracker".)</li>
              </ul>

              {/* <iframe src="https://giphy.com/embed/3ohze1qkqPZHMrEuwo" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/hockeytraining-pushups-push-up-3ohze1qkqPZHMrEuwo">via GIPHY</a></p> */}
              <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
                <iframe src="https://giphy.com/embed/3ohze1qkqPZHMrEuwo" width="240" height="135" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                <p><a style={{ fontSize: '8px' }} href="https://giphy.com/gifs/hockeytraining-pushups-push-up-3ohze1qkqPZHMrEuwo">via GIPHY</a></p>
              </div>
              <br />
              <div >
                <h3 style={{ textAlign: 'center' }}>? WHY ? </h3>
                <p style={{ padding: '20px' }}>Every change you make (warm up, body position, gap between hands, speed of repetitions ) influences number of reps you will do. To get reliable results, you need to test yourself always in the same way.</p>
              </div>
              <Accordion
                // className='p-1'
                style={{ margin: '20px 0', background: 'none', border: 'none' }}
                defaultActiveKey='0'
              >
                <Card style={{ border: 'none', backgroundColor: 'transparent' }}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey="3"
                    id='maxRepsRulesExtraInfoButtonInterfaceAccordionID'
                    // onClick={togglePublicPlansView}
                    onClick={() => positionElementToTheTop(document.getElementById(`maxRepsRulesExtraInfoButtonInterfaceAccordionID`), 350)}

                    className="bg-none MMpointer btnOpacity"
                    // style={{ background: 'orange', maxWidth: '85vw', margin: 'auto', border: 'none', borderRadius: '7px 7px 0 0' }}
                    // style={{ background: '#ffd400', margin: '0 10px',padding:'3px', border: 'none', borderRadius: '7px 7px 0 0' }}
                    style={{ color: '#007bff', background: 'white', margin: '0 20px', padding: '3px', border: 'none', borderRadius: '3px' }}
                  >
                    <h5 style={{ textAlign: 'center' }}>More info  🔽</h5>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    {/* <Card style={{textAlign:'center',  border: '4px solid white', overflowY: 'auto', backgroundColor: 'ffd400 !important', paddingTope: '0' }}> */}
                    <Card style={{ margin: '0 10px', textAlign: 'left', border: 'none', overflowY: 'auto', backgroundColor: 'white', paddingTop: '0' }}>
                      <ul>
                        <li>Be FRESH: If you did any arm/chest workout today, do this test tomorrow or day after tomorrow.</li>
                        <br />
                        <li>Keep the PALMS "shoulder-width" apart, little bit wider and closer to hips - not parallel with shoulders.</li>
                        <li>ELBOWS/arms should make 45 degrees angle with the torso of your body each time you go down.</li>
                        <li>use FULL RANGE of the movement: Chest has to touch floor each time and elbows have to be locked each time.</li>
                        <li>KEEP MOVING: Once you start, you can't stop moving. How fast you do the reps, is up to you, you can also change the pace throughout, but you can't stop to rest, even in push-up position, even for 1 second. Once you can't move anymore, stop. </li>
                        <br />
                        <li>take NOTES: If you do any changes to the way you will assess yourself, note it down. Next time you will be assessing yourself, use the same style. (Different styles lead to different rep results and therefore it would be impossible to know, if you actually improved thank to the training, or not.) It is important to try to keep assessment conditions and consistent as possible, for assessment to be valid. </li>
                      </ul>
                    </Card>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card>
          </Accordion.Collapse>
        </Card>
      </Accordion>



      {/* <button onClick={() => history.push('/pushups/paceMaker')}>Use Pace Tracker</button> */}

      {/* pace tracker */}
      <Accordion
        // className='p-1'
        style={{ margin: '10px 0', background: 'none', border: 'none' }}
        defaultActiveKey='0'
      >
        <Card style={{ border: 'none', backgroundColor: 'transparent' }}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="4"
            id='maxRepsPaceTrackerButtonInterfaceAccordionID'
            // onClick={togglePublicPlansView}
            onClick={() => positionElementToTheTop(document.getElementById(`maxRepsPaceTrackerButtonInterfaceAccordionID`), 350)}

            className="bg-none MMpointer btnOpacity"
            // style={{ background: 'orange', maxWidth: '85vw', margin: 'auto', border: 'none', borderRadius: '7px 7px 0 0' }}
            // style={{ background: '#ffd400', margin: '0 10px',padding:'3px', border: 'none', borderRadius: '7px 7px 0 0' }}
            style={{ color: '#007bff', background: 'orange', margin: '0 10px', padding: '3px', border: 'none', borderRadius: '3px' }}
          >
            
            <IconAndText>
              {/* <div> */}
                {/* <IconPacemaker /> */}
                <IconMetronom />
              {/* </div> */}
              <h2 style={{ textAlign: 'center' }}>2) Pace Tracker  🔽</h2>

            </IconAndText>
            
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            {/* <Card style={{textAlign:'center',  border: '4px solid orange', overflowY: 'auto', backgroundColor: 'ffd400 !important', paddingTope: '0' }}> */}
            <Card style={{ textAlign: 'left', border: 'none', overflowY: 'auto', backgroundColor: 'orange', padding: '0 10px 100px 10px' }}>
              <PaceMaker />
            </Card>
          </Accordion.Collapse>
        </Card>
      </Accordion>



      {/* results */}
      <Accordion
        // className='p-1'
        style={{ margin: '10px 0', background: 'none', border: 'none' }}
        defaultActiveKey='0'
      >
        <Card style={{ border: 'none', backgroundColor: 'transparent' }}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="5"
            id='maxRepsResultButtonInterfaceAccordionID'
            // onClick={togglePublicPlansView}
            onClick={() => positionElementToTheTop(document.getElementById(`maxRepsResultButtonInterfaceAccordionID`), 350)}

            className="bg-none MMpointer btnOpacity"
            // style={{ background: 'orange', maxWidth: '85vw', margin: 'auto', border: 'none', borderRadius: '7px 7px 0 0' }}
            // style={{ background: '#ffd400', margin: '0 10px',padding:'3px', border: 'none', borderRadius: '7px 7px 0 0' }}
            style={{ color: '#007bff', background: 'orange', margin: '0 10px', padding: '3px', border: 'none', borderRadius: '3px' }}
          >
            
            <IconAndText>
                <IconResult />
              <h2 style={{ textAlign: 'center' }}>3) Result  🔽</h2>
            </IconAndText>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="5">
            {/* <Card style={{textAlign:'center',  border: '4px solid orange', overflowY: 'auto', backgroundColor: 'ffd400 !important', paddingTope: '0' }}> */}
            <Card style={{ textAlign: 'left', border: 'none', overflowY: 'auto', backgroundColor: 'orange', padding: '0 10px 100px 10px' }}>
              <AssessmentForm />
            </Card>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>

  );
};

export default withRouter(MaxRepsTest);