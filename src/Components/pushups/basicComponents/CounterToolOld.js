import React from 'react';

import { SCounter, SCounterSmall } from '../personalPushupPlans/Set';
import imgMinus from '../img/minus.png';
import imgPlus from '../img/plus.png';

const CounterTool = ({ small, big, value, setValue }) => {

  const updateByClickedValue = (howMuch) => {
    setValue(value + howMuch > 0 ? value + howMuch : 0);
  }

  const updateByTypedValue = ({ target: { value } }) => {
    setValue((value * 1)>0 ? value*1 : undefined );
  }


  return (
    <div>
      <SCounterSmall onClick={() => updateByClickedValue(-small)}> <img src={imgMinus} alt=""></img> <div >{small}</div>          </SCounterSmall>
      <SCounter onClick={() => updateByClickedValue(-big)}><img src={imgMinus} alt=""></img> <div >{big}</div></SCounter>
      {/* <input type='number' onChange={updateByTypedValue} value={value * 1}></input> */}
      <input type='number' onChange={updateByTypedValue} value={value}></input>
      <SCounter onClick={() => updateByClickedValue(big)}><img src={imgPlus} alt=""></img> <div >{big}</div></SCounter>
      <SCounterSmall onClick={() => updateByClickedValue(small)}><img src={imgPlus} alt=""></img> <div >{small}</div></SCounterSmall>
    </div>
  );
};

export default CounterTool;