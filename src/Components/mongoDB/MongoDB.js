
import React, { Component } from 'react'
import { urlRootWithoutApi, urlRoot } from '../../globalState/globalVariables';
// import io from 'socket.io-client';
import styled from 'styled-components';


const SMongoDB = styled.div`
p{padding: 0;margin: 0;}
span{color:blue;}
`

class MongoDB extends Component {
  // ws = new WebSocket(urlRoot);

  constructor() {
    super()
    this.state = {
      socket: io(urlRootWithoutApi),
      defaultState: "ajjoj",
      fromExpress: {},
      socketState: 'off',
      mongoDBconnection: 'off',
      mongoDBActionResult: 'no action taken yet',
      counter: 10,
      cookies: document.cookie

    }
  }

  componentDidMount() {
    console.log("my cookies on front end:");
    console.log(document.cookie);


    //check user's state
    // fetch(`${urlRoot}/user/checkCookie`)
    fetch(`${urlRoot}/user/checkJWTCookie`, { credentials: 'include' })
    // fetch(`${urlRoot}/deleteAllUsers`, { credentials: 'include' })
    // fetch(`${urlRoot}/accessUsers`, { credentials: 'include' })

      .then(res => {
        // console.log("res  in fetch: ", res);
        // console.log("res.body  in fetch: ", res.body);
        return res.json();
      })
      .then(
        (result) => {
          console.log("FETCH success - RESULT:", result);
          this.setState({ fetchResults: result });
        },
        (error) => {  // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
          console.log("Error second in fetch:", error);
          this.setState({ fetchResults: error });
        }
      )










    // ////////////SOCKETS

    // // var socket = io('http://localhost:3001');
    // this.state.socket.on('socketState', (data) => {
    //   // console.log('fromExpress received: ',data);
    //   this.setState({ socketState: data });
    // });
    // this.state.socket.on('mongoDBState', (data) => {
    //   // console.log('fromExpress React received mongoDBState: ', data);
    //   this.setState({ mongoDBconnection: data });
    // });
    // this.state.socket.on('mongoDBErr', (data) => {
    //   // console.log('fromExpress received: ',data);
    //   this.setState({ mongoDBActionResult: data });
    // });

    // this.state.socket.on('fromExpress', (data) => {
    //   // console.log('fromExpress received: ', data);
    //   this.setState({ fromExpress: data });
    // });

    // // socket.emit('fromReact', { first: 'React ahoj' });
    // // this.state.socket.emit('mongoDBState', null);
  }

  handleButtonClick = (e) => {
    console.log("click");
    // this.state.socket.emit('fromReact', { counter: 77 });
    this.setState((previousState) => ({ counter: previousState.counter + 1 }), () => {
      console.log("click - counter after update:", this.state.counter);
      this.state.socket.emit('fromReactDBAddTank3', { name: `xuu${this.state.counter}`, size: 77 });
    });
    // this.setState({ counter: this.state.counter++ });
    // console.log("click - counter after update:",this.state.counter );
    // this.state.socket.emit('fromReactDBAddTank3', { name: `ptt${this.state.counter}`, size: 77 });
  }

  render() {
    return (
      <SMongoDB>
        <p>urlRoot: {urlRootWithoutApi}</p>
        <p>Socket state: <span style={{ color: 'green', backgroundColor: 'yellow' }}>{this.state.socketState}</span></p>
        <h1>MongoDB page</h1>
        <p style={{ marginRight: '20px', border: '1px dotted black', display: 'inline' }}>connection: <span style={{ color: 'green', backgroundColor: 'yellow', fontWeight: 'bold' }}>{this.state.mongoDBconnection}</span></p>
        <p style={{ display: 'inline', fontSize: '10px' }}>proof from Express: <span>{JSON.stringify(this.state.fromExpress)}</span></p>
        <br />
        <p> Mongo Action result: <span>{JSON.stringify(this.state.mongoDBActionResult)}</span></p>
        <button style={{ backgroundColor: 'lightblue' }} onClick={this.handleButtonClick}>button</button>
        <h3>current cookies</h3>
        <p>{this.state.cookies}</p>
       
      </SMongoDB>
    )
  }
}

export default MongoDB;
