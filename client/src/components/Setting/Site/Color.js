import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../actions'
import { ChromePicker } from 'react-color';
import axios from 'axios';

export default function Color({boxColor, modalColor }) {

  const dispatch = useDispatch();
  const { themeColor } = useSelector((state) => state.loginReducer)

  const hadleThemeColor = (e) => {
    axios.patch(`${process.env.REACT_APP_SERVER_API}/users/theme-color`, {
      themeColor : e.hex
    },{withCredentials: true})
    .then (()=>{
      dispatch(login({themeColor : e.hex}))
    })
  }

  return <div  ref={boxColor} className={modalColor ? 'color-container' : 'hidden'}>
    <ChromePicker color={themeColor} onChange={hadleThemeColor}/>
  </div>;
}
