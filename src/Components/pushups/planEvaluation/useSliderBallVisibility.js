import { useEffect } from 'react';

export default function useSlider (id, variableToWatch) {
  useEffect(() => {
    if (variableToWatch === null) document.querySelector(`#${id} .MuiSlider-thumb`).style.width = '0px'
    else document.querySelector(`#${id} .MuiSlider-thumb`).style.width = '12px';
  }, [variableToWatch])
}