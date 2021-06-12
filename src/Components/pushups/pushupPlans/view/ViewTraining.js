import React from 'react';
import ViewSet from './ViewSet';

const ViewTraining = ({training:{name, sets}, number,percentages,showNotes }) => {
  return (
    <div style={{backgroundColor:'lightGray'}}>
      <h4>Training {number} {name && `(${name})`}</h4>
      <h5>Sets:</h5>
      {sets.map((set, i) => <ViewSet set={set} number={i + 1} key={i} percentages={percentages} lastSetNumberFrom1={sets.length} showNotes={showNotes}/>)}
    </div>
  );
};

export default ViewTraining;