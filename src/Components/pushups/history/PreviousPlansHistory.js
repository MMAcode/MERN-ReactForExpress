import React from 'react';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LabelList, ResponsiveContainer, Label, Cell } from 'recharts';
import { getSimpleDateIfTrueAlsoTime } from './CurrentPlan';
import { SPTiny } from './LastTraining';
import { Accordion, Card } from 'react-bootstrap';
import styled from 'styled-components';

import PushUpsContext from '../state/PushUpsContextState';
import { withRouter } from 'react-router-dom';
import { returnAnyPlanFromPlanID } from '../functions/basics';
import UsabilityInfo from './UsabilityInfo';
import FinishedExecutions from './FinishedExecutions';

const PreviousPlansHistory = ({history, showByDefault=false}) => {
  let { user, publicPlans } = React.useContext(PushUpsContext);

  let plansExecutions = user.pushupPlans.history;
  
  const [executions, setExecutions] = React.useState({ finished: [], unfinished: [] });
  let supportVar={finished: [], unfinished: []};
  plansExecutions.forEach(ex => {
    if (ex.completed) supportVar.finished.push(ex)
    else supportVar.unfinished.push(ex);
  })
  React.useEffect(() => {
  setExecutions({ finished: supportVar.finished, unfinished: supportVar.unfinished });
  },[])

  const [showFinishedPlans, showFinishedPlansSET] = React.useState(showByDefault);
  // const showFinishedPlansClicked = () => {
// }

  if (!plansExecutions || plansExecutions.length === 0) return null;
  return (
    <div style={{backgroundColor:'yellow'}}>
      <h3>Previous Plans</h3>
      <p>Number of finished plans: <span>{executions.finished.length}</span></p>
      {/* <button onClick={()=>{history.push('/pushups/history/finishedExecutions')}}>Show finished executions</button> */}
      <p>Number of UN-finished plans: <span>{executions.unfinished.length}</span></p>
      <button onClick={()=>showFinishedPlansSET(before=>!before)}>{showFinishedPlans?'Hide':'Show'} Finished plans</button>
      {showFinishedPlans &&
        <FinishedExecutions finishedExecutions={executions.finished} />
      }
    </div>
  );
};

export default withRouter(PreviousPlansHistory);