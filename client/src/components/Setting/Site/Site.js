import React, { useState, useEffect, useRef } from 'react';
import Color from './Color';
import './Site.css';

export default function Site() {
  
  const btnColor = useRef()
  const boxColor = useRef()
  const [themeColor, setThemeColor] = useState('#2260FF');
  const [modalColor, setModalColor] = useState(false)

  const handleClickOutside = ({ target }) => {
    if (!boxColor.current.contains(target) && !btnColor.current.contains(target)) setModalColor(false);
  };

useEffect(() => {
  window.addEventListener("click", handleClickOutside);
  return () => {
    window.removeEventListener("click", handleClickOutside);
  };
}, []);

  return <div className='site-container'>
    <div className='box-sitename'>
      <div className='title-sitename'>사이트 이름</div>
      <div className='box-input'>
        <input type='text' id='input-name'/>
        <button id='btn-submit' style={{backgroundColor : themeColor}}>변경하기</button>
      </div>
    </div>
    <div className='box-theme'>
      <div className='title-theme'>테마 색상</div>
      <div className='info-color' ref={btnColor}>
        <div id='sample-color' style={{backgroundColor: themeColor}} onClick={()=>{setModalColor(!modalColor)}}/>
        <div id='text-color' onClick={()=>{setModalColor(!modalColor)}}>{themeColor}</div>
      </div>
      <Color boxColor={boxColor} modalColor={modalColor} themeColor={themeColor} setThemeColor={setThemeColor}/>
    </div>
  </div>;
}
