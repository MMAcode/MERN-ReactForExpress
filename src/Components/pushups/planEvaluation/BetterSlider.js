import React from 'react';
import { Slider } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";
import '../planEvaluation/styleToAdjustMaterialUI.css';
import BetterToggle from '../basicComponents/BetterToggle'

//API: https://material-ui.com/api/slider/
const BetterSlider = ({ setting }) => {
  // console.log("SETTTTTING: ", setting);
  // let [title, question, marks, form, formFieldToUpdate, onChangeFinished, max = 100, min = 0, step = 1] = setting;
  let [title, question, marks, form, formFieldToUpdate, onChangeFinished, extra = {}] = setting;
  let { min = 0, max = 100, step = 1,
    orientation, height = 'auto', margin='0 0 50px 0', labelWidth,
    labelDisplay = 'auto', labelColor = '#7a7b7bdb', dropValueLabelExtraTextAfter = '' } = extra;
  // let {min=0,max=100,step=1 } = vertical;
  // let { min, max, step };
  // console.log("MIIN MAX STEP:",min,max,step);

  React.useEffect(() => {
    sliderRef.current.querySelectorAll('.MuiSlider-markLabel').forEach(el => {
      // console.log("WW", labelWidth);
      el.style.maxWidth = labelWidth;
      el.style.color = labelColor;
      if (orientation === 'vertical') {
        el.style.textAlign = 'left';
      }
    })
    if (orientation === 'vertical') {
      sliderRef.current.querySelector('.MuiSlider-rail').style.width = '0';
      sliderRef.current.querySelector('.MuiSlider-track').style.width = '0';
      sliderRef.current.querySelector('.MuiSlider-mark').style.width = '2px';
      sliderRef.current.querySelector('.MuiSlider-markActive').style.background = '0';
    }
  }, [])

  // console.log("BBB1",form[0][formFieldToUpdate]);
  let value = form[0][formFieldToUpdate];
  // console.log("BBB2", value);
  let onChange = form[1];
  const sliderRef = React.useRef();

  const [dropLabelRewriteValue, setDropLabelRewriteValue] = React.useState();
  React.useEffect(() => {
    // console.log("better value", value);
    // let wanted = sliderRef.current.document.querySelector('.MuiSlider-thumb');
    let ballElement = sliderRef.current.querySelector('.MuiSlider-thumb');
    // console.log("better ref", sliderRef.current);
    if (value === null || value === undefined) {
      ballElement.style.width = '0px';
      let valueInTheDrop = sliderRef.current.querySelector('.PrivateValueLabel-label-5');
      setDropLabelRewriteValue('?')
    }
    else {
      ballElement.style.width = '12px';
      setDropLabelRewriteValue(undefined);
    }
  }, [value])



  return (
    <StylesProvider injectFirst> {/* to be able to overwrite Material UI classes */}

      <div style={{
        width: '95%', margin: 'auto', marginBottom: '10px',
        backgroundColor: 'lightGray',
        borderRadius:'10px',
        // borderBottom:'1px dotted gray',
        padding: '10px 40px 10px',
        position:'relative',
      }}>
        <>  {/* OLD slider */}
          {/* <Slider
            // defaultValue={undefined} //use when component is not controlled
            // defaultValue={formData.difficulty} //use when component is not controlled
            value={formData.difficulty}
            id='sliderDif'
            // value={formData.difficulty}
            // aria-valuetext={formData.difficulty}
            // aria-valuetext={0}

            // getAriaValueText={valuetext}
            // getAriaValueText={(number) => { console.log(number); return `${number} stuff` }}
            // onChange={(e, newValue) => { console.log(newValue) }}
            onChange={(e, newValue) => { setFormData(form => ({ ...form, difficulty: newValue })) }}
            // onChangeCommitted={() => { console.log(formData.difficulty) }}
            onChangeCommitted={(e, v) => { console.log(formData.difficulty) }}
            // onChangeCommitted={(e, v) => { setFormData(form => ({ ...form, difficulty: v })) }}

            aria-labelledby="planEvaluationSliderDifficultyId"
            step={1}
            marks={marks}
            // valueLabelDisplay="on"
            valueLabelDisplay="auto"
          // onTouchEnd={(number) => { console.log(number) }}
          // onTouchEnd={() => { console.log(formData.difficulty) }}
          // min={0}
          // max={100}
          /> */}
        </>


        <h4>{title}</h4>
        <p>{question}</p>
        <button
          onClick={() => { onChange(origValue => ({ ...origValue, [formFieldToUpdate]: null, updateDB: true })); }}
          style={{
            opacity: '0.4', backgroundColor: 'lightGray',
            // float: 'right',
            // position: 'absolute',
            // transform: 'translateY(11px)',
            right: '5px',
            // top: '5px',
            border: '1px gray solid',
            display: 'block', margin: '0 0 0 auto',
            fontSize: '0.7rem', borderRadius: '300px'
          }}
        >Clear</button>
        


        <Slider
          style={{ height: `${height}`, margin: `${margin}` }}
          value={value}
          ref={sliderRef}
          // onChange={(e, newValue) => { setFormData(form => ({ ...form, difficulty: newValue })) }}
          // onChange={(e, v) => { onChange(v) }}
          onChange={(e, v) => { onChange(origValue => ({ ...origValue, [formFieldToUpdate]: v })) }}
          // onChangeCommitted={(e, v) => { console.log(formData.difficulty) }}
          onChangeCommitted={(e, v) => { onChangeFinished(v) }}
          // aria-labelledby="planEvaluationSliderDifficultyId"
          marks={marks}
          valueLabelDisplay={labelDisplay} //
          min={min}
          max={max}
          step={step}
          // orientation='vertical'
          orientation={orientation}
          // ThumbComponent='div'
          // getAriaValueText = {(v)=>`${v}a`}
          // getAriaLabel={(v) => `${v}b`}
          // valueLabelFormat={(v) => `${v}${dropValueLabelExtraTextAfter}`}
          valueLabelFormat={(v) => `${dropLabelRewriteValue ? dropLabelRewriteValue : v + dropValueLabelExtraTextAfter}`}
        // aria-label='hahaha'
        // aria-valuetext='nonono'

        />
        {/* <BetterToggle label={['public','anonymous']}></BetterToggle> */}

      </div>
    </StylesProvider>

  );
};

export default BetterSlider;