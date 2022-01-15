import React from 'react';
import './AlertLogin.css';
import axios from 'axios';

export default function AlertLogin({ modal, el }) {

  const guestLogin = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/users/guest-login`, '', {
        withCredentials: true,
      })
      .then((res) => {
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div ref={el} className={modal ? 'alertlogin-container' : 'off'}>
      <div className='text-noti'>로그인 후 이용 가능합니다.</div>
      <div className='btn-guestlogin' onClick={guestLogin}>게스트 로그인</div>
    </div>
  );
}
