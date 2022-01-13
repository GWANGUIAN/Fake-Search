import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AlertLogin from '../components/Main/AlertLogin';
import Login from './Login';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import filterAutoComplete from '../utils/filterAutoComplete';
import axios from 'axios';
import './Main.css';

export default function Main() {
  const notification = useRef();
  const login = useRef();
  const btnSetting = useRef();
  const btnLogin = useRef();
  const { isLogin, siteName, themeColor } = useSelector(
    (state) => state.loginReducer
  );
  const [searchWord, setSearchWord] = useState('');
  const [autoComplete, setAutoComplete] = useState([]);
  const [modal, setModal] = useState(false);
  const [focus, setFocus] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const history = useHistory();

  const handleClickOutside = ({ target }) => {
    if (
      !btnSetting.current.contains(target) &&
      !notification.current.contains(target)
    )
      setModal(false);
    if (!btnLogin.current.contains(target) && !login.current.contains(target))
      setLoginModal(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const hadleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_API}/users/logout`, '', {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleSeachWord = async (e) => {
    setSearchWord(e.target.value);
    if (filterAutoComplete(e.target.value) !== '' && e.target.value.replace(/(\s*)/g, "")!=='') {
      const word = filterAutoComplete(e.target.value);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auto/filtered`,
        { params: {word},
          withCredentials: true }
      );
      setAutoComplete(res.data);
    }
    if(filterAutoComplete(e.target.value).replace(/(\s*)/g, "") === '') {
      setAutoComplete([])
    }
  };

  return (
    <>
      <div className='main-container'>
        <div className='navBar-container'>
          {!isLogin ? (
            <div
              className='btn-login'
              ref={btnLogin}
              onClick={() => {
                setLoginModal(true);
              }}
            >
              로그인
            </div>
          ) : (
            <div className='btn-logout' onClick={hadleLogout}>
              로그아웃
            </div>
          )}
          <div
            className={modal ? 'box-setting on' : 'box-setting'}
            onClick={() => {
              if (!isLogin) {
                setModal(!modal);
              } else {
                history.push('/setting');
              }
            }}
            ref={btnSetting}
          >
            <FontAwesomeIcon className='btn-setting' icon={faCog} />
          </div>
          <AlertLogin el={notification} modal={modal} />
        </div>
        <div className='searchForm-container'>
          <div className='logo' style={{ color: themeColor }} onClick={()=>{}}>
            {siteName}
          </div>
          <div className='search-box hidden'>
            <div
              className={focus ? 'search-box-auto focus' : 'search-box-auto'}
              style={{ border: `2px solid ${themeColor}` }}
            >
              <div
                className={
                  searchWord === '' || autoComplete.length===0
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
                : focus&&autoComplete.map((el, id) => {
                    return (
                      <AutoList
                        key={id}
                        el={el}
                        searchWord={searchWord}
                        themeColor={themeColor}
                      ></AutoList>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      {loginModal && (
        <Login login={login} siteName={siteName} themeColor={themeColor} />
      )}
      <Footer/>
    </>
  );
}

function AutoList({ el, searchWord, themeColor }) {
  return (
    <div className='list-auto'>
      <button className='searchButton' onClick={() => {}}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <div id='text-auto'>
        <span id='part-search' style={{ color: themeColor, fontWeight: '550' }}>
          {filterAutoComplete(searchWord)}
        </span>
        <span id='part-auto'>{el.word.slice(filterAutoComplete(searchWord).length, el.word.length)}</span>
      </div>
    </div>
  );
}
