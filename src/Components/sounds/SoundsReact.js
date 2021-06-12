import React from 'react';
// import { Howl, Howler } from 'howler';
import useSound from 'use-sound';
// import soundX from './files/facebook/Complete and Success/Complete 1.m4a'
import soundX from './files/facebook/Complete and Success/Complete 2.m4a'

const SoundsReact = () => {

  const [playSound] = useSound(soundX);
  const test = () => {
    
    console.log("hi");
    playSound();
  }


  return (
    <div>
      <h1>Sounds</h1>
      {/* <button onClick={playSound} >Play Sound</button> */}
      <button onClick={test} >Play Sound</button>
    </div>
  );
};

export default SoundsReact;