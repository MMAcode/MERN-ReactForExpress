import React from 'react';
import Set, { SSet } from './Set.js';
import { createPersonalSETStarter } from './cratingObjectsfunctions';
import PlanContext from './ContextDefaults';

import { Accordion, Card } from 'react-bootstrap';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop';

import styled from 'styled-components';
export const STraining = styled.div`
/* background-color: rgb(231, 204, 204); */
/* background-color: red; */
padding:3%;
margin-bottom: 10px;
input{padding-left:5px;margin-left:5px;}

`;

const SCard = styled(Card.Body)`
/* background:red; */
/* padding:30px !important; */
/* background-color: rgba(233, 154, 7, 0.62); */
background-color: transparent;
margin: 0;
`


const Training = ({ training, position }) => {
  const trainingRef = React.useRef();
  const { plan, updatePlan } = React.useContext(PlanContext);
  // console.log(plan.trainings);


  let { name, sets } = training;
  position++;//so first is 1

  // const { plan, updatePlan } = React.useContext(PlanContext);

  const duplicateTraining = () => {
    let currentTraining = plan.trainings[position - 1];
    // const newTraining = { ...currentTraining }; //can be done ad set doesn't objects or arrays
    const newTraining = JSON.parse(JSON.stringify(currentTraining))
    plan.trainings.push(newTraining);
    updatePlan({ ...plan });
  }

  const deleteTraining = () => {
    plan.trainings.splice(position - 1, 1);

    //replace deleted trainings from the schedule
    for (let i = 0; i < plan.schedule.length; i++) {
      if (plan.schedule[i].trainingNumber > plan.trainings.length) plan.schedule[i].trainingNumber = plan.trainings.length;
    }
    updatePlan({ ...plan });
  }

  const createNewSet = () => {
    let newSet;
    // if (plan.repsAsPercentages) { newSet = createPersonalSETStarter(Math.round(75 / 100 * plan.maxRepsNeeded.reps), 75, 60); }
    if (plan.repsAsPercentages) { newSet = createPersonalSETStarter(null, 75, 60); }
    else { newSet = createPersonalSETStarter(20, undefined, 60); }
    plan.trainings[position - 1].sets.push(newSet);
    updatePlan({ ...plan });
  }

  const updateTrainingName = (e) => {
    console.log(e.target.value);
    plan.trainings[position - 1].name = e.target.value;
    updatePlan({ ...plan });
  }

  return (

    <Card style={{ backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }}>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={position}
        // className="p-1 mb-1 bg-none MMpointer  text-center btnOpacity"
        className="p-1 bg-none MMpointer  text-center btnOpacity"
        style={{
          background: 'yellow',
          margin: '0px 20px 0px 20px',
          // borderRadius:'10px 10px 0 0'
          // borderRadius: '10px',
          // border: 'none'
          borderRadius: '10px 10px 0 0',
          borderBottom: '1px dotted #00000078', //black semi-see-through
        }}
        ref={trainingRef}
        onClick={() => positionElementToTheTop(trainingRef.current, 350)}
      // onClick={togglePublicPlansView}

      >
        <h5 style={{ textAlign: 'center' }}>Training {position}  🔽</h5>
        {/* <p style={{ color: 'gray', fontSize: '13px' }}>(Organize on which day to do which training.)</p> */}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={position}>
        <SCard style={{ overflowY: 'auto', backgroundColor: 'yellow', padding: '1rem 0.5rem 1rem 0.5rem' }}>
          <STraining>

            <h5 >Name:
            <input onChange={updateTrainingName} type='text' placeholder='optional field' value={name}></input>
            </h5>



            <Accordion
              className='p-1'
              style={{ background: 'transparent', margin: '10px -4%' }}
              // defaultActiveKey={sets.length>1 ? -1 : 1}

            >
              {sets.map((set, index) => <Set key={index} position={index} set={set} trainingPosition={position} />)}

              {/* create new set card */}
              <Card style={{ backgroundColor: 'transparent', border: 'none', marginBottom: '10px' }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={sets.length + 1}
                  className="p-1 bg-none MMpointer  text-center btnOpacity"
                  style={{
                    background: 'orange',
                    margin: '0px 20px 0px 20px',
                    borderRadius: '10px',
                  }}
                  onClick={async () => {
                    createNewSet();
                    await new Promise(resolve => setTimeout(resolve, 30));//has to be here to wait for React to create that component
                    positionElementToTheTop(document.getElementById(`Training${position}Set${sets.length}ID`), 350)
                  }}
                >
                  <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '5px' }}>
                    <h5 style={{ margin: '0', padding: '0', textAlign: 'center', width: '50%' }}> Add new Set</h5>
                  </div>
                </Accordion.Toggle>
              </Card>
            </Accordion>
            <div className='adjustPlanDuplicateDeleteSetOrTrainingButtonsWrapper'>
              <button className='adjustPlanDuplicateDeleteSetOrTrainingButton' onClick={duplicateTraining}>Duplicate <br /> this training</button>
              <button className='adjustPlanDuplicateDeleteSetOrTrainingButton' onClick={deleteTraining}>Delete <br /> this training</button>
            </div>
          </STraining>
        </SCard>
      </Accordion.Collapse>
    </Card>



  );
};

export default Training;