import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';


const BetterRadio = ({ setting }) => {
  let [title, question, labels, form, formFieldToUpdate, extra = {}] = setting;
  let [formData, setForm] = form;
  // let { min = 0, max = 100, step = 1,
  // orientation, height = 'auto', margin, labelWidth } = extra;

  const handleRadioChange = async ({ target: { value } }) => {
    // console.log(value);
    // setFormData(dataBefore => ({ ...dataBefore, gender: value }));
    setForm(dataBefore => ({ ...dataBefore, [formFieldToUpdate]: value, updateDB: true }));
  }

  return (
    <div>
      <h4>{title}</h4>
      <p>{question}</p>
      <RadioGroup aria-label="gender" name="gender1" value={formData[formFieldToUpdate]} onChange={handleRadioChange}>
        {labels.map((label, index) => <FormControlLabel key={index} value={label[0]} control={<Radio />} label={label.length>1 ? label[1] : (label[0].charAt(0).toUpperCase() + label[0].slice(1))} />)}
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
    </div>
  );
};

export default BetterRadio;