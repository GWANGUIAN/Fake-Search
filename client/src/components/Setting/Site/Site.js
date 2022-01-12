import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../actions';
import checkSiteName from '../../../utils/checkSiteName';
import Color from './Color';
import axios from 'axios';
import './Site.css';

export default function Site() {
  
  const dispatch = useDispatch();
  const { themeColor, siteName } = useSelector((state) => state.loginReducer)
  const [siteNameForm, setNicknameForm] = useState('');
  const btnColor = useRef()
  const boxColor = useRef()
  const [modalColor, setModalColor] = useState(false)
  const [isChecked ,setIsChecked ] = useState(true)

  const handleClickOutside = ({ target }) => {
    if (!boxColor.current.contains(target) && !btnColor.current.contains(target)) setModalColor(false);
  };

  const handleCheck = (e) => {
    setNicknameForm(e.target.value)
    if(e.target.value==='') {
      setIsChecked(true)
    } else {
      setIsChecked(checkSiteName(e.target.value))
    }
  }

  const hadleSiteName = () =>{
    if(isChecked&&siteNameForm!==''){
      axios.patch(`${process.env.REACT_APP_SERVER_API}/users/site-name`, {
        siteName : siteNameForm
      },{withCredentials: true})
      .then (()=>{
        dispatch(login({siteName : siteNameForm}))
        setNicknameForm('')
      })
    }
  }

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
        <input type='text' id='input-name' value={siteNameForm} placeholder={siteName} onChange={handleCheck}/>
        <button id={isChecked&&siteNameForm!=='' ? 'btn-submit' : 'btn-submit-none'} style={{backgroundColor : isChecked&&siteNameForm!=='' ? themeColor : 'rgb(190, 190, 190)'}} onClick={hadleSiteName}>변경하기</button>
      </div>
      <div className={isChecked ? 'text-alert-hidden' : 'text-alert'}>사이트 이름은 특수문자, 공백, 숫자를 제외한 2~10자만 사용 가능합니다.<br/>(구글, 네이버 등 포털 사이트 도메인 사용불가)</div>
    </div>
    <div className='box-theme'>
      <div className='title-theme'>테마 색상</div>
      <div className='info-color' ref={btnColor}>
        <div id='sample-color' style={{backgroundColor: themeColor}} onClick={()=>{setModalColor(!modalColor)}}/>
        <div id='text-color' onClick={()=>{setModalColor(!modalColor)}}>{themeColor}</div>
      </div>
      <Color boxColor={boxColor} modalColor={modalColor} themeColor={themeColor}/>
    </div>
  </div>;
}
