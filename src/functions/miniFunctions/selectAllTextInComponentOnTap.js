/////// to use in external component:
// import selectText from '../selectText';
// const textToSelectRef = React.useRef(null);
/////in the element:
// ref = { textToSelectRef }
// onClick = {()=> selectText(textToSelectRef.current)}

function selectText(element) {
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
    // element.focus();
    // element.select();
}

export default selectText;