import React from 'react';

// import SoundAndMusicControls from './SoundAndMusicControls';
import SoundAndMusicControls from './Training/SoundAndMusicControls';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import { SLink } from '../../App';
const SLink2 = styled(Link)`
display:block;
margin:10px;
background-color:orange;
padding: 3px;
border-radius:3px;
text-decoration:none;
text-align: center;
&:hover{ 
  background-color:#996b15;
  color:white;
  text-decoration:none;
}
transition-duration: 0.25s;
`
const SLink3 = styled.div`
margin:10px;
background-color: gray;
color: white;
padding: 3px;
border-radius:3px;
text-decoration:none;
text-align: center;
&:hover{ 
  background-color:#996b15;
  color:white;
  text-decoration:none;
}
transition-duration: 0.25s;
`


const SideBarContent = ({ pathname, setSideBarOpen }) => {
  return (
    <div>
      {/*navigations */}
      {/* <div style={{ backgroundColor: 'yellow', padding: '5px' }}>
        <h3 style={{ textAlign: 'center' }}>Navigation</h3>
        {pathname === '/pushups' ? null
          : <SLink2
            onClick={() => setSideBarOpen(false)}
            // style={{ float: 'left' }}
            style={{ display: 'block', margin: '1rem' }}
            to='/pushups'>Main Menu</SLink2>}
        {pathname == '/pushups/maxRepsTest' ? <SLink3>Test Your Max Reps</SLink3> : <SLink2 onClick={() => setSideBarOpen(false)} to='/pushups/maxRepsTest'>Test Your Max Reps</SLink2>}
        {pathname == '/pushups/trainingPlans' ? <SLink3>Training Plans</SLink3> : <SLink2 onClick={() => setSideBarOpen(false)} to='/pushups/trainingPlans'>Training Plans</SLink2>}
        {pathname == '/pushups/runMyTraining' ? <SLink3>Start Training</SLink3> : <SLink2 onClick={() => setSideBarOpen(false)} to='/pushups/startMyTraining'>Start Training</SLink2>}
        {pathname == '/pushups/userProfile' ? <SLink3>My profile(history)</SLink3> : <SLink2 onClick={() => setSideBarOpen(false)} to='/pushups/userProfile'>My profile(history)</SLink2>}
      </div> */}

      {/* local controls */}
      {pathname === '/pushups/runMyTraining' && <div style={{ backgroundColor: 'lightBlue', padding: '5px' }}>
        <h3 style={{ textAlign: 'center' }}>Local controls</h3>
        {/* training context     */}
        {pathname === '/pushups/runMyTraining' && <SoundAndMusicControls />}
      </div>}


    </div>
  );
};

export default SideBarContent;