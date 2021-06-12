import React from 'react';
import { planViewContext } from '../ViewPushupPlan'

// const ViewSet = ({ set, number, percentages, lastSetNumberFrom1, showNotes }) => {
const ViewSet = ({ set, number, lastSetNumberFrom1 }) => {
  const planViewContextData = React.useContext(planViewContext);
  // console.log("planViewContextData: ", planViewContextData);
  const { percentages, showNotes }=planViewContextData;
  
  let setText;
  if (percentages) {
    // console.log("% in SET:", percentages);
    // console.log("set.repsAsPercentage: ", set.repsAsPercentage);
    const { reps: maxReps, source } = percentages.maxReps;
    const repsAsNumber = Math.round(set.repsAsPercentage / 100 * maxReps);
    // const maxInfo = (source==='none') ? null : ((source==='initial') ? `(${repsAsNumber} reps using your initial assessment(${maxReps}) as 100%)`:``)
    const maxInfo = (source === 'none') ? null : `(${repsAsNumber} reps)`;

    // setText = `${set.repsAsPercentage}% of your max. ${maxInfo}`;
    setText = `${set.repsAsPercentage}% ${maxInfo}`;
  } else {
    setText = `${set.reps} reps`;
  }

  // console.log("setText: ", setText);
  return (
    <div>
      <span>set {number}: </span>
      <span>{setText}</span>
      {lastSetNumberFrom1 != number && <span style={{ color: 'gray', paddingLeft: '20px' }}>{set.breakAfterInSeconds}s. break</span>}
      {(showNotes
        //&& (set.repsNotes || set.breakNotes)
      ) &&
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ backgroundColor: 'lightGreen' }}>{set.repsNotes ? set.repsNotes : <span style={{color:'gray'}}>No notes</span>} </div>
          <div style={{ backgroundColor: 'green' }}>{set.breakNotes ? set.breakNotes : <span style={{color:'gray'}}>No notes</span>}</div>
        </div>
      }
    </div>
  );
};

export default ViewSet;