import React, { useState } from 'react';
import Site from '../components/Setting/Site/Site'
import AutoComplete from '../components/Setting/AutoComplete/AutoComplete'
import SearchData from '../components/Setting/SearchData/SearchData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Setting.css';

export default function Setting() {
  const [themeColor, setThemeColor] = useState('#2260FF');
  const [tabMenu, setTabMenu] = useState(0);

  return (
    <div className='setting-container' style={{ backgroundColor: '#B1C2E2' }}>
      <div className='box-menu'>
        <div className='btn-back'>
          <FontAwesomeIcon id='icon-back' icon={faArrowLeft}></FontAwesomeIcon>
          <div id='text-back'>돌아가기</div>
        </div>
        <div
          className='btn-site menu'
          style={{
            borderLeft: tabMenu === 0 ? `5px solid ${themeColor}` : '',
            paddingLeft: tabMenu === 0 ? '10px' : '15px',
          }}
          onClick={()=>{setTabMenu(0)}}
        >
          사이트 이름 및 테마 색상 설정
        </div>
        <div
          className='btn-autocomplete menu'
          style={{
            borderLeft: tabMenu === 1 ? `5px solid ${themeColor}` : '',
            paddingLeft: tabMenu === 1 ? '10px' : '15px',
          }}
          onClick={()=>{setTabMenu(1)}}
        >
          자동완성 검색어 설정
        </div>
        <div
          className='btn-searchdata menu'
          style={{
            borderLeft: tabMenu === 2 ? `5px solid ${themeColor}` : '',
            paddingLeft: tabMenu === 2 ? '10px' : '15px',
          }}
          onClick={()=>{setTabMenu(2)}}
        >
          검색 페이지 설정
        </div>
        <div className='btn-withdrawal'>회원탈퇴</div>
      </div>
      <div className='box-content'>
        {tabMenu===0 ? (
        <Site/>
      ) : (
        tabMenu===1 ? (
          <AutoComplete themeColor={themeColor}/>
        ) : (
          <SearchData themeColor={themeColor}/>
        )
      )}</div>
    </div>
  );
}
