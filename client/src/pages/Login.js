import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import './Login.css';

export default function Login({ login, loginModal }) {
  const naverRef = useRef();

  const initializeNaverLogin = () => {
    const naverScript = document.createElement('script');
    naverScript.src =
      'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
    naverScript.type = 'text/javascript';
    document.head.appendChild(naverScript);
    naverScript.onload = () => {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        callbackUrl: process.env.REACT_APP_REDIRECT_URI,
        isPopup: false, // popup 형식으로 띄울것인지 설정
        loginButton: { color: 'white', type: 3, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
      });
      naverLogin.init();
      naverLogin.logout();
    };
  };

  const kakaoLoginHandler = () => {
    const { Kakao } = window;
    Kakao.Auth.login({
      scope: '',
      success: () => {
        Kakao.API.request({
          url: '/v2/user/me',
          success: async function (res) {
            axios
              .post(
                `${process.env.REACT_APP_SERVER_API}/users/kakao-login`,
                {
                  identification: res.id,
                },
                { withCredentials: true }
              )
              .then(() => {
                window.location.replace('/');
              });
          },
        });
      },
    });
  };

  const onSuccess = async (response) => {
    const { googleId } = response;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_API}/users/google-login`,
        {
          identification: googleId,
        },
        { withCredentials: true }
      )
      .then(() => {
        window.location.replace('/');
      });
  };

  const onFailure = (error) => {
    console.log(error);
  };

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

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleClick = () => {
    naverRef.current.children[0].click();
  };

  return (
    <div className={loginModal ? 'login-container' : 'hidden'}>
      <div className='box-login' ref={login}>
        <div className='box-login-btn'>
          <div className='btn-naver'>
            <div ref={naverRef} id='naverIdLogin' />
          </div>
          <img
            src='img/btn-login-naver.png'
            alt='naver-login'
            onClick={handleClick}
            className='btn-naver'
          />
          <img
            src='img/btn-login-kakao.png'
            alt='naver-kakao'
            className='btn-kakao'
            onClick={kakaoLoginHandler}
          />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <img
                src='img/btn-login-google.png'
                alt='naver-google'
                className='btn-google'
                onClick={renderProps.onClick}
              />
            )}
            responseType={'id_token'}
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
          <div className='btn-guest' onClick={guestLogin}>
            <FontAwesomeIcon icon={faUserPlus} className='icon-user' />
            <span className='text-guest'>게스트 로그인</span>
          </div>
        </div>
      </div>
    </div>
  );
}
