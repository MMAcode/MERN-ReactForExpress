// creates CSS classes serverState which changes backgrounds, available everywhere
import React from 'react';

let nameOfServerStateCssClass = 'serverState';

class WakeUpserverState extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  changeServerStateSubClassTo = (subClassName) => {
    // console.log("subclass: ", subClassName, `${nameOfServerStateCssClass}${subClassName}`);
    document.querySelectorAll(`.${nameOfServerStateCssClass}`).forEach(El => El.setAttribute('class', `${nameOfServerStateCssClass} ${nameOfServerStateCssClass}${subClassName}`));
  }

  componentDidMount() {
    this.changeServerStateSubClassTo('Activating');
    // if (document.querySelector(`.${nameOfServerStateCssClass}On`)) return;
    fetch(this.props.url)
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          this.changeServerStateSubClassTo('On');
        },
        (error) => {
          console.log("Error in fetch:", error);
          this.changeServerStateSubClassTo('Err');
        }
      )
  }

  render(props) {
    let cssContent = `
      .serverState{font-weight:bold;}
      .serverStateOn{color:green;}
      .serverStateActivating{color:yellow;}
      .serverStateOff{color:grey;}
      .serverStateErr{color:red;}
    `;
    return (
      <style>{cssContent}</style >
    );
  }
}

export default WakeUpserverState;