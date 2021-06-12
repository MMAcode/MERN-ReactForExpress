import React from 'react';

const SetsToDoAllIn = ({ trainingState: { stage, main: { training, setNumberFrom1 } } }) => {
  // console.log("SETS TO DO: ", setNumberFrom1, training.sets.length);



  return (
    <div style={{ display: 'inline', overflow: 'scroll' }}>
      <span>Sets:</span>
      {training.sets.map((set, index) =>
        <span
          style={{
            backgroundColor:
              `${
              // stage === 0 ? 'lightgrey' :
                index + 1 < setNumberFrom1 ?
                  'grey'
                  : index + 1 === setNumberFrom1 ?
                    ((stage === 1 ||stage===0) ? 'yellow' : 'gray')
                    : 'lightgrey'
              }`,
            padding: '3px',
            margin: '3px'
          }}
          key={index}
        >
          {/* {set.reps ? (set.reps + '') : (set.duration + 's')} */}
          {set.reps}
        </span>
      )}

    </div>
  );
};

export default SetsToDoAllIn;