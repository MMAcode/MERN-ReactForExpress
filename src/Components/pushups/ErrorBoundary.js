import React, { Component } from 'react'
import { frontEndPushupsUrlRoot } from '../../globalState/globalVariables'
let localMiroErrorData = 'default state - no data received';
let updateMiroErrorData = (data) => {
  localMiroErrorData = data;
};

//because i want to get error message from functions, not just components, i can't use React context to pass in the data.
//therefore I made function "updateMiroErrorData" which exists here and which receives data from external functions. These data are then stored here locally. Somehow, it works.


export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null, errorInfo: null,
      // miroError: props.miroError
      miroError: localMiroErrorData
    };
  }


  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE0: ",typeof error);
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE0a: ",error.toString());
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE0b: ",JSON.stringify(error));
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE0c: ",error);
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE0-end: ");

    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: ", error);
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE2: ", errorInfo);
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE2-end:");
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  componentDidMount() {
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      while (this.state.hasError) {
        window.open(frontEndPushupsUrlRoot, "_self");
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }

    })()

  }


  render() {
    if (this.state.hasError) {

      // window.open(frontEndPushupsUrlRoot, "_self");

      // You can render any custom fallback UI

      return (
        <div>
          <h1>Oh No, Error - Restarting...</h1>
          <h4>Nobody is perfect.</h4>
          {/* <h1>Something went wrong.</h1> */}
          {/* <p style={{ color: 'red' }}>Please send a screenshot or copy-paste text to on this page to the developer on email <a style={{backgroundColor:'yellow',textDecoration:'underline'}} href="mailto:testedpushupplans@gmail.com">"testedpushupplans@gmail.com"</a></p> */}
          {/* <p>miro   Error In ErrorStateComponent: {JSON.stringify(this.state.miroError)}</p>  */}
          {/* <br /> */}
          {/* <p style={{ color: 'blue' }}>miroError In LocalVariable: {JSON.stringify(localMiroErrorData)}</p> */}
          {/* <details style={{ whiteSpace: 'pre-wrap' }}> */}
          {/* <p> {this.state.error && this.state.error.toString()}</p> */}
          {/* <div style={{ whiteSpace: 'pre-wrap',color:'green',fontSize:'0.7rem' }}> */}
          {/* {this.state.errorInfo && this.state.errorInfo.componentStack} */}
          {/* </div> */}
          {/* <br /> */}

          {/* {this.state.errorInfo && <div>{JSON.stringify(this.state.errorInfo).split('\\n').map((bit, index) => <div>{bit}</div>)}</div>} */}
          {/* {this.state.error && <div>{JSON.stringify(this.state.error).split('\\n').map((bit, index) => <div key={index}>{bit}</div>)}</div>} */}

          {/* </details> */}

        </div>
      )
    }
    return this.props.children;
  }

}

export { updateMiroErrorData };