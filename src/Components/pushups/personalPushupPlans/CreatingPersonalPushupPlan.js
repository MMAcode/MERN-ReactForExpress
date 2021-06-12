import React from 'react';
import { SLink } from '../../../App';
// import styled from 'styled-components';
import { createPersonalPLANStarter } from './cratingObjectsfunctions'
import ShowPersonalPlanToUserToAdjust from './ShowPersonalPlanToUserToAdjust';


const CreatingPersonalPushupPlan = () => {
  const [planX, setPlanX] = React.useState(null);

  const createPersonalPushupPlan = () => {
    let newPlan = createPersonalPLANStarter("My 1");
    setPlanX(newPlan);
    console.log("new plan template created:", newPlan);
  }

  // createPersonalPushupPlan();
  React.useEffect(() => {
    createPersonalPushupPlan();
  }, []);

  return (
    <>
      {planX ? <ShowPersonalPlanToUserToAdjust planToAdjust={planX} /> : null}
    </>
  );
};

export default CreatingPersonalPushupPlan;