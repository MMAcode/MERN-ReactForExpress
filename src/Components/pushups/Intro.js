import React from 'react';
import {frontEndPushupsUrlRoot} from '../../globalState/globalVariables'

const Intro = () => {
  const urlTextToCopy = frontEndPushupsUrlRoot;
  const [textCopied, setTextCopied] = React.useState(false);
  const appUrlToCopy = React.useRef(null);
  const copyTextToClipboardClicked = () => {
    console.log("love");
    // appUrlToCopy.current.execCommand('copy');

    const el = document.createElement('textarea');
    el.value = urlTextToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setTextCopied(true);

  }
  return (
    <div>
      <h1>Intro</h1>
      <div style={{ backgroundColor: 'lightGray' }}>
        <h3>Use Chrome</h3>
        <p>For the best experience, use Chrome browser to download this app.</p>
        <p>1) Tap to copy app url:</p>
        <div onClick={copyTextToClipboardClicked} style={{ color: 'gray', padding: '1rem', fontSize: '0.8rem' }}>
          <p ref={appUrlToCopy}>{urlTextToCopy}</p>
          <p style={{ textAlign: 'center', color: 'red' }}> {textCopied ? 'Copied.' : ` `}</p>
        </div>

        <p>2) Click <a style={{ fontWeight: 'bold' }} href="https://play.google.com/store/apps/details?id=com.android.chrome" target="_blank">here</a> to open/download Chrome browser.</p>
        <p>3) paste copied link into Chrome.</p>
        <p>4) Click 'Install' on the top on the app screen.</p>
        <p> - HAPPY END - </p>

      </div>
      <h3>What</h3>
      <p>This app is designed to help you improve your Pushups REPS (by using tested prep plans)</p>
      <h3>Why</h3>
      <h3>How</h3>
      <div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <p>Icon "rules" made by Adrien Coquet from the Noun Project</p>
      </div>
    </div>
  );
};

export default Intro;