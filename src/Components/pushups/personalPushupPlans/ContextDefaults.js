import React from 'react';

const PlanContext = React.createContext({
  plan: null,
  updatePlan(){}
});

export default PlanContext;