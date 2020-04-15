//rsc  -> f.c.
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import FirstPage from './Components/FirstPage'
import SecondPage from './Components/SecondPage'
import APIPage from './Components/APIPage'
import Test from './Components/Test'
import styled from 'styled-components'

const SLink = styled(Link)`
margin:10px;
background-color:orange !important;
`


function App() {
  return (


    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <div style={{ display: 'flex' }}>
        <SLink to='/MERN-ReactForExpress/'>Home</SLink>
        <SLink to='/'>/Home</SLink>
        <SLink to='/MERN-ReactForExpress/page2'>Page 2.</SLink>
        <SLink to='/MERN-ReactForExpress/pageAPI'>Page 3 - public API</SLink>
      </div>
 

      <Switch>
        <Route exact path='/MERN-ReactForExpress/' component={FirstPage} />
        <Route exact path='/MERN-ReactForExpress/page2' component={SecondPage} />
        <Route exact path='/MERN-ReactForExpress/pageAPI' component={APIPage} />
      </Switch>
    </div>
  );
}

export default App;
