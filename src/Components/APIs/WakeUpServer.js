// CSS class serverState which changes backgrounds, will be available everywhere
import React from 'react';
import styled, { css } from 'styled-components';
// import { Redirect } from 'react-router-dom';

let nameOfServerStateCssClass = 'serverState';

const SClassServerStatusAvailableEverywhere = styled.div`
  color:red;
  ${(props) => css`
    .serverState {
      ${'' /* background-color:grey; */}
      color:red;
      }`
  }
`


{/* <style>
.serverStateOn{background-color:green;}
.serverStateActivating{background-color:yellow;}
.serverStateOff{background-color:grey;}
.serverStateErr{background-color:red;}
</style > */}

export class WakeUpServerserverStateClassAvailable extends React.Component {
  constructor(props) {
    super(props);
    // console.log("props url in constructor:", props.url);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      // serverState: { state: 'off', color: 'grey' }, //'off','activating', 'on'
      // serverStateColor: 'red'
      // url: props.url,
      // title:props.title
    };
  }

  changeSubClassTo = (subClassName) => {
    console.log("subclass: ", subClassName, `${nameOfServerStateCssClass}${subClassName}`);
    document.querySelectorAll(`.${nameOfServerStateCssClass}`).forEach(El => El.setAttribute('class', `${nameOfServerStateCssClass} ${nameOfServerStateCssClass}${subClassName}`));
  }

  componentDidMount() {
    //update css class here - activating server
    this.changeSubClassTo('Activating');
    console.log(this);
    // this.setState({serverState:{state:'loading',color:'yellow'}})


// export const urlRoot = 'https://mern-express-heroku.herokuapp.com/api';
// export const urlRoot = 'http://localhost:3001/api';
// <WakeUpServerserverStateClassAvailable url={urlRoot + '/start'}>
    fetch(this.props.url)
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
            // serverState:{state:'on',color:'green'}
          });
          //update css class here - server on
          // document.querySelector('#serverState').setAttribute('class', 'serverState serverStateOn');
          // console.log("Server state should be ON - green");
          console.log(this);
          this.changeSubClassTo('On');
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          if (error) {
            console.log("Error in fetch:", error)
            //update css class here - server off
            // document.getElementById('serverState').setAttribute('class', 'serverState serverStateErr');
            this.changeSubClassTo('Err');
            // this.setState({serverState:{state:'err',color:'red'}})


          };
        }
      )
  }

  render(props) {
    // const { data  } = this.state;
    let cssContent = `
      .serverStateOn{background-color:green;}
      .serverStateActivating{background-color:yellow;}
      .serverStateOff{background-color:grey;}
      .serverStateErr{background-color:red;}
    `;
    return (
      <SClassServerStatusAvailableEverywhere serverState={this.state.serverState}>
        <style>{cssContent}</style >
        {this.props.children}
        {/* <span id='serverState' className='serverState serverStateOff'> server</span> */}
      </SClassServerStatusAvailableEverywhere>

    );
  }
}

// export default  WakeUpServerserverStateClassAvailable;