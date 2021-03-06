import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import Loading from '../Loading/Loading';
import './NaverLogin.css';
import axios from 'axios';

export default function NaverLogin() {
  const location = useLocation();

  const getNaverToken = useCallback(() => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    axios
      .post(
        `${process.env.REACT_APP_SERVER_API}/users/naver-login`,
        {
          token,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.replace('/');
      });
  }, [location]);

  useEffect(() => {
    getNaverToken();
  }, [getNaverToken]);

  return <div className='naverlogin-container'><Loading/></div>;
}
