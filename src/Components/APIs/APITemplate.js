import React from 'react';
import { Note } from './CatsFrame';
// import { Redirect } from 'react-router-dom';

class APITemplate extends React.Component {
  constructor(props) {
    super(props);
    // console.log("props url in constructor:", props.url);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      // url: props.url,
      // title:props.title
    };
  }

  componentDidMount() {
    // console.log("component did mount", this.state);
    fetch(this.props.url)
      .then(res => {
        // console.log("first  in fetch: ", res);
        // console.log("first  in fetch: ", res.body);
        return res.json()
      })
      .then(
        (result) => {
          // console.log("Result second in fetch:", result);

          this.setState({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

          this.setState({
            isLoaded: true,
            error
          });
          if (error) console.log("Error second in fetch:", error);

        }
      )
  }

  render(props) {
    const { data } = this.state;
    // console.log("state in render:", this.state);
    // console.log("props in render:", props); //no props - undefined!!
    // console.log(" url in state in render:", url);
    // console.log(" error in state in render:", error);
    // console.log("type of received data in render: ", (typeof data == 'object'));


    let key = 0;
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Note> getting from url: "{this.props.url}"</Note>
        {/* <div>Error: {error}</div> */}
        {/* <div>Error:</div> */}
        {/* {error ? Object.keys(error).map(obj => <div>{obj}:{data[obj].name}</div>) : <p>No error</p>} */}
        {/* <br /> */}
        {/* <div>Is loaded: {isLoaded}</div> */}
        <div style={{ backgroundColor: 'red', margin: '10px' }}>
          <h5> Data received-></h5>
          {(typeof data == "object") ? Object.entries(data).map(arr => { key++; return <div key={key}> <span style={{ color: 'blue' }}> {arr[0]} </span> : {JSON.stringify(arr[1])}</div>; }) : <p>{data}</p>}
          {/* {(typeof data == "object") ? <div>{JSON.stringify(data)}</div> : <p> {data} </p>}  */}
        </div>
      </div>

    );
  }
}

export default APITemplate;