import React from 'react'
const Test = (props) => {
  let xx = "nic";
  console.log(props);
  return (<p> ahoj {xx} {props.name}</p>);
}

export default Test;