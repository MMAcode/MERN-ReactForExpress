import React from 'react';
import DogsAPI from './Dogs';

const DogsFrame = () => {
  return (
    <div>
      <h3>Dogs API (CORS: yes)</h3>
      <DogsAPI/>
    </div>
  );
};

export default DogsFrame;