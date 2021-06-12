import React from 'react';
import { Note } from './CatsFrame';

class APITemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
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
    let key = 0;
    return (
      <span>
        <span>{this.props.title}</span>
        <span style={{ backgroundColor: 'red', margin: '10px' }}>
          {(typeof data == "object") ? Object.entries(data).map(arr => { key++; return <span key={key}> <span style={{ color: 'blue' }}> {arr[0]} </span> : {JSON.stringify(arr[1])}</span>; }) : <span>{data}</span>}
        </span>
      </span>

    );
  }
}

export default APITemplate;