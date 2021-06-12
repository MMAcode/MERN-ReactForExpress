import React from 'react';
import Training, { STraining } from './Training';
import styled from 'styled-components';
import PlanContext from './ContextDefaults';

import { Accordion, Card } from 'react-bootstrap';
import positionElementToTheTop from '../functions/styling/positionElementToTheTop';

const STrainings = styled.div`
/* background-color: rgb(222, 122, 122); */
/* padding:10px 3%; */
`;

const Trainings = ({ trainings }) => {
  // console.log("trainings?:", trainings);

  const { plan, updatePlan } = React.useContext(PlanContext);

  const createNewTraining = () => {
    console.log("create training clicked");
    // console.log(plan);
    plan.newTraining(plan.repsAsPercentages, plan.repsAsPercentages ? plan.maxRepsNeeded.reps : undefined);
    // updatePlan(plan);
    updatePlan({ ...plan });
    // updatePlan({});
    // console.log(planContext);
    // planContext.updatePlan({ahoj:'aa'});
  }

  return (
    <STrainings>
      {/* <h5>Trainings:</h5> */}

      <Accordion
        className='p-1'
        style={{ background: 'transparent', margin: '10px -4%' }}
        // defaultActiveKey={1}

      >

        {trainings.map((tr, index) => (<Training training={tr} key={index} position={index} />))}
        
        {/* schedule: */}
     </Accordion>

      {/* {trainings.map(tr => { return <p>training</p> })} */}
      <STraining>
        <button onClick={createNewTraining}>Add new Training</button>
      </STraining>
    </STrainings>

  );
};

export default Trainings;