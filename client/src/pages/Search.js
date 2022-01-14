import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import changeDomain from '../utils/changeDomain';
import Footer from './Footer';
import AlertLogin from '../components/Main/AlertLogin';
import NotFound from '../components/Search/NotFound';
import Profile from '../components/Search/Profile';
import News from '../components/Search/News';
import Music from '../components/Search/Music';
import Image from '../components/Search/Image';
import axios from 'axios';
import './Search.css';
import '../components/Search/SearchComponent.css';

export default function Search({ match }) {
  const { word } = match.params;

  const history = useHistory();

  const notification = useRef();
  const btnSetting = useRef();

  const [modal, setModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchWord, setSearchWord] = useState(word);

  const { isLogin, siteName, themeColor } = useSelector(
    (state) => state.loginReducer
  );

  const handleClickOutside = ({ target }) => {
    if (
      !btnSetting.current.contains(target) &&
      !notification.current.contains(target)
    )
      setModal(false);
  };

  const getSearchData = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/search/word`,
      {
        params: { word },
        withCredentials: true,
      }
    );
    if (res.data.id) {
      setSearchData([
        res.data.profile,
        res.data.news,
        res.data.image,
        res.data.music,
      ]);
    }
  }, []);

  useEffect(() => {
    getSearchData();
  }, [getSearchData]);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='search-container'>
        <div className='box-menu'>
          <div
            className='box-input'
            style={{ borderBottom: `1px solid ${themeColor}` }}
          >
            <div className='inner-box-input'>
              <div className='box-logo' style={{ color: themeColor }} onClick={()=>{
                window.location.replace('/')
              }}>
                {changeDomain(siteName)}
              </div>
              <input
                className='input-search'
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
                onKeyPress={(e)=>{
                  if(e.key==='Enter') {
                    window.location.replace(`/search/query=${searchWord}`)
                  }
                }}
              />
              <FontAwesomeIcon
                className='icon-search'
                icon={faSearch}
                style={{ color: themeColor }}
                onClick={() => {
                  window.location.replace(`/search/query=${searchWord}`)
                }}
              />
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
                <FontAwesomeIcon className='icon-setting' icon={faCog} />
              </div>

              <AlertLogin el={notification} modal={modal} />
            </div>
          </div>
          <div className='box-category'>
            <div className='inner-box-category'>
              <div
                className='text-categories all'
                style={{ color: themeColor }}
              >
                통합
              </div>
              <div className='text-categories view'>블로그</div>
              <div className='text-categories image'>이미지</div>
              <div className='text-categories video'>동영상</div>
              <div className='text-categories shopping'>쇼핑</div>
              <div className='text-categories news'>뉴스</div>
              <div className='text-categories dictionary'>어학사전</div>
              <div className='text-categories map'>지도</div>
              <div className='text-categories more'>더보기</div>
            </div>
          </div>
        </div>
        <div className='box-content'>
          <div className='inner-box-content'>
            {searchData.sort().map((el, id) => {
              if (el.type === 'profile' && el.view) {
                return <Profile key={id} profileData={el} />;
              } else if (el.type === 'news' && el.view) {
                return <News key={id} newsData={el} />;
              } else if (el.type === 'image' && el.view) {
                return <Image key={id} imageData={el.content} />;
              } else if (el.type === 'music' && el.view) {
                return <Music key={id} musicData={el} />;
              }
            })}
            {(searchData.length === 0 ||
              searchData.every((el) => !el.view)) && <NotFound word={word} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
