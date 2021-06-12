import React from 'react';
import styled from 'styled-components';

const STrainingPlanOverview = styled.div`
background-color: orange;
padding:2rem;
/* margin:2rem; */

button{
  /* background-color: red; */
}

`

const TrainingPlanOverview = (props) => {
  return (
    <STrainingPlanOverview>
      {props.children}
    </STrainingPlanOverview>
  );
};

export default TrainingPlanOverview;