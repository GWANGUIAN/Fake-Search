import React from 'react';
import './AlertLogin.css';

export default function AlertLogin({modal, el}) {

  
  return <div ref={el} className={modal ? 'alertlogin-container' : 'off'}>
    <div className='text-noti'>로그인 후 이용 가능합니다.</div>
    <div className='btn-guestlogin'>게스트 로그인</div>
  </div>;
}
