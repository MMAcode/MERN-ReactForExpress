import React from 'react';
// import { Howl, Howler } from 'howler';

const Sounds = () => {
  const context = new window.AudioContext();

  function playFile(filepath) {
    // see https://jakearchibald.com/2016/sounds-fun/
    // Fetch the file
    fetch(filepath)
      // Read it into memory as an arrayBuffer
      .then(response => response.arrayBuffer())
      // Turn it from mp3/aac/whatever into raw audio data
      .catch(err => console.log("Miro-error: ", err))

      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .catch(err => console.log("Miro-error: ", err))

      .then(audioBuffer => {
        // Now we're ready to play!
        const soundSource = context.createBufferSource();
        soundSource.buffer = audioBuffer;
        soundSource.connect(context.destination);
        soundSource.start();
      })
      .catch(err => console.log("Miro-error: ", err));
  }



  const successClick = () => {
    /////CSS tricks
    // playFile('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3');
    playFile('Button1.m4a');

    ////stack overflow
    // var audio = new Audio('C:\Users\Miros\Documents\GitHub\MERN\reactAndExpressForHeroku\client-react-project\src\Components\sounds\files\facebook\Button1.m4a');
    // audio.play();

    ///////HOWEL library
    // var sound = new Howl({
    //   src: ['./files/facebook/Button1.m4a']
    // });
    // sound.play();
  }

  return (
    <div>
      <h1>Sounds</h1>
      <button onClick={successClick} >Play Success Sound</button>
    </div>
  );
};

export default Sounds;