import React from 'react';
import { useSelector } from 'react-redux';
import NewWindow from "react-new-window";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import Profile from '../../Search/Profile';
import Footer from '../../../pages/Footer';
import News from '../../Search/News';
import Image from '../../Search/Image';
import Music from '../../Search/Music';
import NotFound from '../../Search/NotFound';
import changeDomain from '../../../utils/changeDomain'
import './Preview.css';
import '../../Search/SearchComponent.css'

export default function Preview({ word }) {

    const {themeColor, siteName} = useSelector((state)=>state.loginReducer)

    const profileData = useSelector((state)=>state.profileReducer)
    const newsData = useSelector((state)=>state.newsReducer)
    const imageData = useSelector((state)=>state.imageReducer)
    const musicData = useSelector((state)=>state.musicReducer)

  return (
    <NewWindow features={{ width: 1180, height: 800 }} title="미리보기">
  <div className='preview-container'>
        <div className='box-menu'>
          <div
            className='box-input'
            style={{ borderBottom: `1px solid ${themeColor}` }}
          >
            <div className='inner-box-input'>
              <div className='box-logo' style={{ color: themeColor }}>
                {changeDomain(siteName)}
              </div>
              <input
                className='input-search'
                value={word.value}
              />
              <FontAwesomeIcon
                className='icon-search'
                icon={faSearch}
                style={{ color: themeColor }}
              />
              <div
                className='box-setting'
              >
                <FontAwesomeIcon className='icon-setting' icon={faCog} />
              </div>
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
            {[profileData, newsData, imageData, musicData].sort((a,b)=> a.order-b.order).map((el, id) => {
              if (el.type === 'profile' && el.view) {
                return <Profile key={id} profileData={el} />;
              } else if (el.type === 'news' && el.view) {
                return <News key={id} newsData={el} />;
              } else if (el.type === 'image' && el.view) {
                return <Image key={id} imageData={el.content} />;
              } else if (el.type === 'music' && el.view) {
                return <Music key={id} musicData={el} />;
              } else return ''
            })}
            {[profileData, newsData, imageData, musicData].every((el) => !el.view) && <NotFound word={word.value} />}
          </div>
        </div>
        <Footer/>
      </div>
      </NewWindow>
  );
}