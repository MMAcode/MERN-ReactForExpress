//rsc  -> f.c.
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import FirstPage from './Components/FirstPage'
import SecondPage from './Components/SecondPage'
import APIPage from './Components/APIPage'
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
        <SLink to='/'>Home</SLink>
        <SLink to='page2'>Page 2.</SLink>
        <SLink to='pageAPI'>Page 3 - public API</SLink>
        <SLink to='/x'>x land</SLink>
        <SLink to='/api'> Miro's old local Express api</SLink>
      </div>

      <Switch>
        <Route exact path='/' component={FirstPage} />
        <Route exact path='/page2' component={SecondPage} />
        <Route exact path='/pageAPI' component={APIPage} />
      </Switch>



    </div>
  );
}

export default App;
