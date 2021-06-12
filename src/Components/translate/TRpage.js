import React, { Component } from 'react'
import translate from '../../functions/translate'
import styled from 'styled-components';
import './alert.css';

const SHighlight = styled.p`
display: inline-block;
/* display: flex; align-items: center;justify-content: center; margin:auto; */
background-color: yellowgreen;
padding: 10px 20px;
`
// const salert = styled.p`
// `


export default class TRpage extends Component {
  constructor() {
    super();
    this.state = {
      textToTranslate: '',
      submitted: false,
      TextTranslated: null
    }
  };

  inputChangeHandler = async (e) => {
    this.setState({ textToTranslate: e.target.value });
    this.setState({ submitted: false });
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ submitted: true });
    // console.log(this.state.textToTranslate);

    let translationObject = await translate('en', 'cs', this.state.textToTranslate);
    this.setState({ TextTranslated: translationObject.translated });

    // const formX = document.querySelector('#translate-form-1');
    // formX.reset();
  }

  handleSubmit2 = async e => {
    e.preventDefault();
    this.setState({ submitted: true });
    let translationObject = await translate('cs', 'en', this.state.textToTranslate);
    this.setState({ TextTranslated: translationObject.translated });
  }


  checkCzechHighlight = e => {
    
    // short alert
    let alertUserForSec = async (text, durationInSec) => {
      let alertForSec = document.createElement('p');
      // alertForSec.textContent = text;
      alertForSec.innerHTML = text;
      alertForSec.id = "alertForSec";
      // alertForSec.classList.add("flyingAlert");
      alertForSec.style.animationDuration = durationInSec + "s";
      let hook = document.querySelector("#translateForms");
      hook.append(alertForSec);
      await new Promise(resolve => setTimeout(resolve, durationInSec * 1000));
      // console.log('XXXXXXXXXXX alert pop up');
      document.querySelector("#alertForSec").remove();
    }



    function getSelectionText(e) {
      // e.preventDefault();
      var text = "";
      if (window.getSelection) {
        console.log("text received");
        text = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
        console.log("control received");

        text = document.selection.createRange().text;
      } else {
        console.log("screwed");

        alert('no');
      }
      return text;
    }
    console.log(getSelectionText(e));
    alertUserForSec(getSelectionText(e), 1);
  }

  render() {
    return (
      <div>
        <h1>Translate page</h1>
        <div id='translateForms'>

          <form id='translate-form-1' onSubmit={this.handleSubmit}>
            <h4>From ENGLISH to CZECH:</h4>
            {/* method="post" */}
            {/* <input type='text' placeholder="English text..." value={this.state.enText} onChange={this.inputChangeHandler} /> */}
            <input type='text' placeholder="English text..." onChange={this.inputChangeHandler} />
            {/* <input type='text' value='Home' onChange={this.inputChangeHandler} /> */}
            <button type="submit">Submit</button>
          </form>
          <form id='translate-form-1' onSubmit={this.handleSubmit2}>
            <h4>From CZECH to ENGLISH:</h4>
            {/* method="post" */}
            <input type='text' placeholder="English text..." onChange={this.inputChangeHandler} />
            {/* <input type='text' value='Home' onChange={this.inputChangeHandler} /> */}
            <button type="submit">Submit</button>
          </form>
          {/* <span>{this.state.submitted ? 'Submitted' : 'Recorded'}: </span> */}
          {/* <span>"{this.state.enText}"</span> */}
          {typeof this.state.TextTranslated == 'string' && <SHighlight>{this.state.TextTranslated}</SHighlight>}
        </div>
        <div>
          {/* <p className='textToHighlight' onClick={this.checkCzechHighlight} >Švýcarsko, mezi Čechy většinou známé precizností a vysokou úrovní infrastruktury, si při zvládání epidemie koronaviru nevede zrovna nejlépe. V zemi s více než 27 tisíci nakaženými a tisíci mrtvými dosud neplatí povinné nošení roušek, a to ani pro zaměstnance obchodů. Když jdete ven se zakrytým obličejem, lidé na vás koukají jako na malomocného, shodují se Češi žijící v zemi. */}
          <p className='textToHighlight' onTouchEnd={this.checkCzechHighlight} >Švýcarsko, mezi Čechy většinou známé precizností a vysokou úrovní infrastruktury, si při zvládání epidemie koronaviru nevede zrovna nejlépe. V zemi s více než 27 tisíci nakaženými a tisíci mrtvými dosud neplatí povinné nošení roušek, a to ani pro zaměstnance obchodů. Když jdete ven se zakrytým obličejem, lidé na vás koukají jako na malomocného, shodují se Češi žijící v zemi.
              Zdroj: https://www.idnes.cz/zpravy/zahranicni/koronavirus-covid-19-svycarsko-nakazeni-nemocni-opatreni.A200417_112621_zahranicni_vlc</p>
          {/* <p onTouch={this.checkCzechHighlight} >Touch Another is for staff to reuse "(washable) surgical gowns or coveralls or similar suitable clothing (for example, long-sleeved laboratory coat, long-sleeved patient gown or industrial coverall) with a disposable plastic apron for AGPs (aerosol-generating procedures) and high-risk settings with forearm washing once gown or coverall is removed".</p> */}
          <button onClick={this.checkCzechHighlight}>Click me now</button>
          <p onTouchEndCapture={this.checkCzechHighlight} >TouchEndCapture Another is for staff to reuse</p>
          <p onTouchCancel={this.checkCzechHighlight} >TouchCancel Another is for staff to reuse</p>
          <p onTouchCancelCapture={this.checkCzechHighlight} > TouchCancelCapture Another is for staff to reuse</p>
          <p onTouchMove={this.checkCzechHighlight} >TouchMove Another is for staff to reuse</p>
          <p onTouchMoveCapture={this.checkCzechHighlight} >TouchMoveCapture Another is for staff to reuse</p>
          <p onTouchStart={this.checkCzechHighlight} >TouchStart Another is for staff to reuse</p>
          <p onTouchStartCapture={this.checkCzechHighlight} >TouchStartCapture Another is for staff to reuse</p>
        </div>
      </div>
    )
  };
}
