import React from 'react';
import { ChromePicker } from 'react-color';

export default function Color({boxColor, modalColor, themeColor, setThemeColor }) {
  return <div  ref={boxColor} className={modalColor ? 'color-container' : 'hidden'}>
    <ChromePicker color={themeColor} onChange={(e)=>{setThemeColor(e.hex)
    console.log(e)}}/>
  </div>;
}
