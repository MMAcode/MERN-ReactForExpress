import React, { useState } from 'react';

const CwUseState = () => {
  const [stateH, setStateH] = useState({ counter: 0 })
  const add1 = () => {
    setStateH({ counter: stateH.counter + 1 });
  }

  return (
    <div>
      <h3>UseState component:</h3>
      <button onClick={add1}> Add 1 </button>
      <p>counter: <span>{stateH.counter}</span></p>
    </div>
  );
};

export default CwUseState;