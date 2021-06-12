import React from 'react';
import styled from 'styled-components';

// import imgMinus from '../img/minus.png';
import imgMinus from '../img/triangle/down.png';
// import imgPlus from '../img/plus.png';
// import imgPlus from '../img/plus.png';
import imgPlus from '../img/triangle/up.png';


// import imgMinusLight from '../img/minusLight.png';
// import imgPlusLight from '../img/plusLight.png';


function selectTextAndFocusElement(element) {

  //to select text by taping
  if (document.selection) { // IE
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }

  //make make element editable upon typing
  element.focus();
  element.select();
}

const SWrapper = styled.div`
    text-align: center;
display: flex;
justify-content: center;
align-items: center;


p,span,input,textarea{
  font-size:1.3rem;
}
input,span,textarea{
  /* background-color:green; */
  background:none;
  /* background:linear-gradient(transparent 60%,red 100%); */
  border:none;
  /* border-bottom: 3px solid red; */
  padding:5px;
  /* width:auto; */
  width:60px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
span{
  font-weight:bold;
}
input{
    color:black;
    font-size:1.8rem;
    color:white;
    font-weight:bold;
    text-align: center;
    outline:none;
    
  }
/* hide native htmml counting arrows */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

`

const SCounter = styled.div`
/* background-color:blue; */
/* background-image: url(${imgMinus}) no-repeat center center/cover; */
/* background: url("https://robohash.org/1") no-repeat center center/cover; */
/* background: url("https://robohash.org/1") no-repeat center center/cover; */

display:inline-box;
width:55px;
height:55px;
padding:0 3px;
position: relative;
/* border:1px solid black; */
/* border-radius:100%; */



/* triangle using CSS */
/* width: 0; 
  height: 0; 
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 40px solid #f00; */


touch-action: manipulation;

:hover{
    cursor:pointer;
  /* background: radial-gradient(circle, rgba(255,100,0,1) 34%, rgba(42,8,8,0) 70%); */

  }
  :active{
    img{background: radial-gradient(circle, rgb(215, 255, 0) 34%, rgba(42,8,8,0) 70%);}

  }
img{
  
  width:100%; 
  /* width:110px;  */
  /* height: 110px; */
  /* height: 100%; */
  height: auto;
  /* background:radial-gradient(red); */
  /* background:url(${imgPlus}); */
  /* background:url(imgPlus); */

  /* background: radial-gradient(circle, rgba(255,0,0,1) 34%, rgba(242,8,8,0) 70%); */
  /* background-color:yellow; */
  /* border:1px solid black; */
/* border-radius:100%; */
 
}
#counterNumber{
}
div{
  margin: auto;
  position: absolute;
   top: 43%; 
   /* top: ${() => '44%'};  */
right: 50%; 
/* width:10px;height:10px; */
transform: translate(50%, -50%);
  z-index:10;
  /* content:  ${props => props.howMuch};  */
  content:  ${() => '7'}; 
  content:'6';

  font-size:0.8rem;
  font-weight:800;
  line-height:1rem;
  color: white; 

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

`;
export const SCounterSmall = styled(SCounter)`
width:45px;
height:45px;
div { 
  top:42%;
  font-size:0.8rem;
}
`;


// Restricts input field to a number only.
function setInputFilter(textbox, inputFilter) {
  // ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
  ["input"].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

let returnValueInMinMaxRange = (newValue, min, max) => {
  if (newValue < min) return min;
  if (newValue > max) return max;
  // console.log("valu in boudary: ", newValue);
  return newValue;
}


const returnCSSSettingsForBorder = withBorder => {
  if (withBorder === 'shade') {
    withBorder = {
      backgroundColor: '#0000002e',
      margin: '2px'
    }
  } else if (withBorder === 'borderPractical') {
    withBorder = {
      padding: '10px',
      borderRadius: '80%',
      // border: '10px groove #0000002e',
      // border: '10px solid #0000002e',
      border: '5px solid black',
      // border: '13px groove #0000002e',
      borderLeft: 'none',
      // borderTop: 'none',
      borderRight: 'none'
      // borderBottom: 'none'
    }
  } else if (withBorder === 'borderBeautiful') {

    // beautiful but too wide
    withBorder = {
      padding: '10px',
      borderRadius: '80%',
      border: '23px solid #0000002e',
      borderTop: 'none',
      borderBottom: 'none'
    }
  } else {
    withBorder = undefined;
  }
  return withBorder;
}

const CounterAllIn = ({ settings }) => {
  //in external component use this one like this: <Counter settings={[]}/>
  let [p1counterSmall, p1counterBig, onChangeFunctionReceivingNewValueAsParameter, initialValue, sideText, smallTextUnderTheNumber, minValue, MaxValue, withBorder] = settings;
  //withBorder: 'shade', 'borderPractical', 'borderBeautiful'
  withBorder = returnCSSSettingsForBorder(withBorder);

  //set initial value, also when initial value is changed
  const [localValue, setLocalValue] = React.useState(initialValue);
  const [initialValueWasSetUp, setInitialValueWasSetUp] = React.useState(true);
  React.useEffect(() => {
    // console.log("INITIAL value" + initialValue + " updated");
    setInitialValueWasSetUp(true);
    setLocalValue(initialValue);
  }, [initialValue]);


  // Restricts input field to a number only
  const htmlInputEl = React.useRef(null);
  React.useEffect(() => {
    // let xx = [];
    // for (let i = 0; i <= 13; i++) {
    //   setInputFilter(document.getElementById(`idScheduleInput${i}`), function (value) {
    //     return /^\d*$/.test(value);
    //   });
    // }

    setInputFilter(htmlInputEl.current, function (value) {
      // let testedValue = /^\d*$/.test(value);
      // console.log("testedValue outcome: ", testedValue);
      return /^\d*$/.test(value);
    });
  }, [])

  const updateLocalValueFromButton = (howMuch) => {
    setInitialValueWasSetUp(false);
    setLocalValue(returnValueInMinMaxRange(localValue + howMuch, minValue, MaxValue));
    // console.log("NOT INITIAL value updated-button");
  }
  const updateLocalValueFromTyping = ({ target: { value } }) => {
    setInitialValueWasSetUp(false);
    // console.log("VALUE NOW:", value, value.length, value[0]); 
    // console.log("VALUE NOW:", value, value.length,value[0]); 
    while (value.length > 1 && value[0] == 0) value = value.substring(1);
    value = value * 1;
    // console.log("VALUE NOW:", value, value.length, value[0]); 
    setLocalValue(returnValueInMinMaxRange(value, minValue, MaxValue));
    // console.log("NOT INITIAL value updated-typing");
  }

  React.useEffect(() => {
    if (!initialValueWasSetUp) {
      onChangeFunctionReceivingNewValueAsParameter(localValue);
      // console.log("CCCCCCCCCC This value passed to external function: ", localValue);
    }

    if (localValue) {
      // let widthHere = `${1 + localValue.toString().length * 1}rem`;
      let widthHere = '3rem';
      if (localValue.toString().length > 2) widthHere = `${1 + localValue.toString().length * 1}rem`;
      htmlInputEl.current.style.width = widthHere;
      // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwidth: ", widthHere);
    }

  }, [localValue])

  return (
    // <div style={{ textAlign: 'center', backgroundColor: 'orange' }}>
    <SWrapper style={withBorder}>
      {p1counterSmall !== 0 &&
        <SCounterSmall
          onClick={() => updateLocalValueFromButton(-p1counterSmall)}
        // style={{visibility: localValue-p1counterSmall<0? 'hidden':'visible'}}
        >
          <img src={imgMinus} alt=""></img>
          <div >{-p1counterSmall}</div>
        </SCounterSmall>}
      <SCounter
        onClick={() => updateLocalValueFromButton(-p1counterBig)}
        style={{ visibility: p1counterBig === 0 ? 'hidden' : 'visible' }}
      >
        <img src={imgMinus} alt=""></img>
        <div >{-p1counterBig}</div>
      </SCounter>
      {/* <input onChange={updateLocalValueFromTyping} type='number' value={localValue} style={{padding:`${smallTextUnderTheNumber ? 0:5}px 1px 2px 3px`,margin:`${smallTextUnderTheNumber ? 0:5}px 1px 2px 3px`}}></input> */}
      <div>
        <div style={{ whiteSpace: 'nowrap' }}>
          <input
            onChange={updateLocalValueFromTyping}
            // type='number'
            value={localValue}
            // style={{ color: 'black', minWidth:`${localValue.toString().length*10}px` }}
            style={{ color: 'black', display: 'inline' }}
            ref={htmlInputEl}
            onClick={() => selectTextAndFocusElement(htmlInputEl.current)}
          />
          {/* <span style={{marginLeft:'0px',paddingLeft:'-20px'}}>%</span> */}
          {sideText && <span style={{ marginLeft: '-13px' }}>{sideText}</span>}
        </div>
        {smallTextUnderTheNumber && <p style={{ marginTop: '-15px', fontSize: '0.85rem' }}>{smallTextUnderTheNumber}</p>}

      </div>
      {/* {p1counterBig != 0 && */}
      <SCounter
        onClick={() => updateLocalValueFromButton(p1counterBig)}
        style={{ visibility: p1counterBig === 0 ? 'hidden' : 'visible' }}
      >
        <img src={imgPlus} alt=""></img>
        <div >{p1counterBig}</div>
      </SCounter>
      {/* } */}
      {p1counterSmall !== 0 &&
        <SCounterSmall onClick={() => updateLocalValueFromButton(p1counterSmall)}>
          <img src={imgPlus} alt=""></img>
          <div >{p1counterSmall}</div>
        </SCounterSmall>}
    </SWrapper>
  );
};

export default CounterAllIn;