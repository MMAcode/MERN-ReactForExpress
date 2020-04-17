import React, { Component } from 'react'

export default class TRpage extends Component {
  constructor() {
    super();
    this.state = {
      enText: '',
      submitted: false,
      enTextTranslated:''
    }
  };

  inputChangeHandler = async (e) => {
    this.setState({ enText: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    console.log(this.state.enText);




    //send data to server
    //translate on serve
    //send back translation

    async function postJsonData(url, data) {//object  
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      }
      const response = await fetch(url, options);
      return response.json(); // parses JSON response into native JavaScript objects
    }

    postJsonData('http://localhost:3001/api/translate', { enText: this.state.enText })
      .then((data) => {
        console.log("something came back from server"); // JSON data parsed by `response.json()` call
        console.log(data); // JSON data parsed by `response.json()` call
        console.log(data.translatedText); // JSON data parsed by `response.json()` call
        this.setState({ enTextTranslated: data.translatedText });
      });
















  }

  render() {
    return (
      <div>
        <h1>Translate page</h1>
        <div>
          <h2>Form</h2>
          <h4>Type sth. in English:</h4>
          <form onSubmit={this.handleSubmit}>
            {/* method="post" */}
            <input type='text' placeholder="English text..." value={this.state.enText} onChange={this.inputChangeHandler} />
            {/* <input type='text' value='Home' onChange={this.inputChangeHandler} /> */}
            <button type="submit">Submit</button>
          </form>
          <span>{this.state.submitted ? 'Submitted' : 'Recorded'}: </span>
          <span>"{this.state.enText}"</span>
          <p>{this.state.enTextTranslated && `translation: ${this.state.enTextTranslated}` }</p>
        </div>
      </div>
    )
  };
}
