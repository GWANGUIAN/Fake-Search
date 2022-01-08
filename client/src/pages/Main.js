import React, { useState, useEffect, useRef } from 'react';
import AlertLogin from '../components/Main/AlertLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Main.css';

export default function Main() {
  
  const el = useRef()
  const button = useRef()
  const [siteName, setSiteName] = useState('');
  const [isLogin, setIsLogin] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [themeColor, setThemeColor] = useState('#2260FF');
  const [autoComplete, setAutoComplete] = useState(['가', '가나', '가나다']);
  const [modal, setModal] = useState(false);
  const [focus, setFocus] = useState(false);
  
  const handleClickOutside = ({ target }) => {
    if (!button.current.contains(target) && !el.current.contains(target)) setModal(false);
  };

useEffect(() => {
  window.addEventListener("click", handleClickOutside);
  return () => {
    window.removeEventListener("click", handleClickOutside);
  };
}, []);

  useEffect(() => {
    setSiteName('FAKESEARCH');
  }, []);

  const handleSeachWord = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@900&display=swap'
          rel='stylesheet'
        />
      </head>
      <div className='main-container'>
        <div className='navBar-container'>
          {isLogin === 0 ? (
            ''
          ) : isLogin === 1 ? (
            <div className='btn-login'>로그인</div>
          ) : (
            <div className='btn-logout'>로그아웃</div>
          )}
          <div
            className={modal ? 'box-setting on' : 'box-setting'}
            onClick={() => {
              setModal(!modal);
            }}
            ref={button}
          >
            <FontAwesomeIcon className='btn-setting' icon={faCog} />
          </div>
          <div  ref={el} className={modal ? 'alertlogin-container' : 'off'}>
    <div className='text-noti'>로그인 후 이용 가능합니다.</div>
    <div className='btn-guestlogin'>게스트 로그인</div>
  </div>
        </div>
        <div className='searchForm-container'>
          <div className='logo' style={{ color: themeColor }}>
            {' '}
            {siteName}
          </div>
          <div className='search-box hidden'>
            <div
              className={focus ? 'search-box-auto focus' : 'search-box-auto'}
            >
              <div
                className={
                  searchWord === ''
                    ? 'search-box-inner'
                    : 'search-box-inner border'
                }
              >
                <button className='searchButton' onClick={() => {}}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <input
                  type='text'
                  className='search'
                  onChange={handleSeachWord}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                    }
                  }}
                ></input>
              </div>
              {searchWord === '' && autoComplete.length !== 0
                ? ''
                : autoComplete.map((el, id) => {
                    return (
                      <AutoList
                        key={id}
                        word={el}
                        searchWord={searchWord}
                        themeColor={themeColor}
                      ></AutoList>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AutoList({ word, searchWord, themeColor }) {
  return (
    <div className='list-auto'>
      <button className='searchButton' onClick={() => {}}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <div id='text-auto'>
        <span id='part-search' style={{ color: themeColor, fontWeight: '550' }}>
          {searchWord}
        </span>
        <span id='part-auto'>{word.slice(searchWord.length, word.length)}</span>
      </div>
    </div>
  );
}
