import React, { useEffect } from 'react';
import './Login.css';

export default function Login({siteName, themeColor, login}) {
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_REDIRECT_URI,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'white', type: 3, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <div className='login-container'>
      <div className='box-login' ref={login}>
        <div className='logo' style={{ color: themeColor }}>{siteName}</div>
        <div className='btn-naver'>
          <div id='naverIdLogin' />
        </div>
      </div>
    </div>
  );
}
