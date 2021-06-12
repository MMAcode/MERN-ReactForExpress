import React from 'react';
import "react-toggle/style.css";
import Toggle from 'react-toggle';

const BetterToggle = ({ label, defaultChecked = false, fv: functionReceivingNewValue = ()=>{},formAndField }) => {
  let [form, formFieldToUpdate] = formAndField;
  let value = form[0][formFieldToUpdate];
  // console.log("VALUE:", value);
  if(value!=undefined) defaultChecked = value;
  let onChange = form[1];

  const [toggleOn, setToggleOn] = React.useState(defaultChecked);
  React.useEffect(() => { setToggleOn(defaultChecked) }, [defaultChecked]);
  
  const [labelNow, setLabelNow] = React.useState(toggleOn ? label[0] : (label[label.length - 1]));
  const handleChange = ({ target: { checked } }) => {
    // const handleChange = (e) => {
    // console.log(checked);
    setToggleOn(checked);
    functionReceivingNewValue(checked); //doesn't fire when default value is set!
    onChange(origValue => ({ ...origValue, [formFieldToUpdate]: checked, updateDB: true })); 
  }
  React.useEffect(() => {
    // console.log(toggleOn, labelNow, label.length);
    setLabelNow(toggleOn ? label[0] : (label[label.length - 1]));
    // functionReceivingNewValue(toggleOn); //also fire when the default value is set

  }, [toggleOn])

  return (
    // <div style={{ padding: '5px', display: 'flex', flexFlow: 'column' }}>
    <div
      // style={{padding: '5px', position: 'absolute', right: '0', top:'0',
      // style={{padding: '5px', position: 'absolute', left: '0', bottom:'0',
      // display: 'flex', alignItems: 'center', justifyContent: 'center'
      // }}
      style={{
        padding: '5px',
        display: 'flex', alignItems: 'center',
        // justifyContent: 'flex-start',
        justifyContent: 'center',
        opacity: '0.6'
      }}
    >
      <Toggle
        // defaultChecked={toggleOn} //for uncontrolled components
        checked={toggleOn}
        onChange={handleChange}
      // style={{display:'inline'}}
      />
      {/* <label htmlFor='trainingSoundsToggle23'>{toggleOn ? label[0]:(label.length>1 ? label[1]:label[0])}</label> */}
      {/* <label htmlFor='trainingSoundsToggle23'>{toggleOn ? label[0]:(label[label.length-1])}</label> */}
      <div style={{
        display: 'inline-block', marginLeft: '3px',
        // width: '50px'
      }}>{labelNow}</div>
    </div>
  )
};

export default BetterToggle;