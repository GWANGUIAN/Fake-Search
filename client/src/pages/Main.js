import React, { useState, useEffect, useRef } from 'react';
import AlertLogin from '../components/Main/AlertLogin';
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Main.css';

export default function Main() {
  
  const notification = useRef();
  const login = useRef();
  const btnSetting = useRef();
  const btnLogin = useRef();
  const [siteName, setSiteName] = useState('');
  const [isLogin, setIsLogin] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [themeColor, setThemeColor] = useState('#2260FF');
  const [autoComplete, setAutoComplete] = useState(['가', '가나', '가나다']);
  const [modal, setModal] = useState(false);
  const [focus, setFocus] = useState(false);
  const [loginModal, setLoginModal] = useState(false)
  
  const handleClickOutside = ({ target }) => {
    if (!btnSetting.current.contains(target) && !notification.current.contains(target)) setModal(false);
    if(!btnLogin.current.contains(target) && !login.current.contains(target)) setLoginModal(false)
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
      <div className='main-container'>
        <div className='navBar-container'>
          {isLogin === 0 ? (
            ''
          ) : isLogin === 1 ? (
            <div className='btn-login' ref={btnLogin} onClick={()=>{setLoginModal(true)}}>로그인</div>
          ) : (
            <div className='btn-logout'>로그아웃</div>
          )}
          <div
            className={modal ? 'box-setting on' : 'box-setting'}
            onClick={() => {
              setModal(!modal);
            }}
            ref={btnSetting}
          >
            <FontAwesomeIcon className='btn-setting' icon={faCog} />
          </div>
          <AlertLogin  el={notification} modal={modal}/>
        </div>
        <div className='searchForm-container'>
          <div className='logo' style={{ color: themeColor }}>
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
      {loginModal&&<Login login={login} siteName={siteName} themeColor={themeColor}/>}
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
