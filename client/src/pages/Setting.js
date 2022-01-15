import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Site from '../components/Setting/Site/Site';
import AutoComplete from '../components/Setting/AutoComplete/AutoComplete';
import SearchData from '../components/Setting/SearchData/SearchData';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Setting.css';
import Withdrawal from '../components/Setting/Withdrawal/Withdrawal';
import Select from 'react-select';

export default function Setting() {
  const history = useHistory();
  const { themeColor, oauth } = useSelector((state) => state.loginReducer);
  const [tabMenu, setTabMenu] = useState(2);
  const [confirmWithdrawal, setConfirmWithdrawal] = useState(false);
  const [selected, setSelected] = useState({ value: 0, label: '사이트 이름 및 테마 색상 설정' });

  const menuList = [
    { value: 0, label: '사이트 이름 및 테마 색상 설정' },
    { value: 1, label: '자동완성 검색어 설정' },
    { value: 2, label: '검색 페이지 설정' },
  ];

  const selectSetting = (e) => {
    setSelected(e)
    setTabMenu(e.value)
  }

  return (
    <div
      className='setting-container'
      style={{ backgroundColor: `${themeColor}35` }}
    >
      <div className='box-menu'>
        <div className='btn-back'>
          <FontAwesomeIcon
            id='icon-back'
            icon={faArrowLeft}
            onClick={() => {
              history.push('/');
            }}
          />
          <div
            id='text-back'
            onClick={() => {
              history.push('/');
            }}
          >
            돌아가기
          </div>
        </div>
        <div
          className='btn-site menu'
          style={{
            borderLeft: tabMenu === 0 ? `5px solid ${themeColor}` : '',
            paddingLeft: tabMenu === 0 ? '10px' : '15px',
            fontWeight: tabMenu === 0 ? '600' : '',
          }}
          onClick={() => {
            setTabMenu(0);
            setSelected(menuList[0]);
          }}
        >
          사이트 이름 및 테마 색상 설정
        </div>
        <div
          className='btn-autocomplete menu'
          style={{
            borderLeft: tabMenu === 1 ? `5px solid ${themeColor}` : '',
            paddingLeft: tabMenu === 1 ? '10px' : '15px',
            fontWeight: tabMenu === 1 ? '600' : '',
          }}
          onClick={() => {
            setTabMenu(1);
            setSelected(menuList[1]);
          }}
        >
          자동완성 검색어 설정
        </div>
        <div
          className='btn-searchdata menu'
          style={{
            borderLeft: tabMenu === 2 ? `5px solid ${themeColor}` : '',
            paddingLeft: tabMenu === 2 ? '10px' : '15px',
            fontWeight: tabMenu === 2 ? '600' : '',
          }}
          onClick={() => {
            setTabMenu(2);
            setSelected(menuList[2]);
          }}
        >
          검색 페이지 설정
        </div>
        {oauth !== 'guest' && (
          <div
            className='btn-withdrawal'
            onClick={() => {
              setConfirmWithdrawal(true);
            }}
          >
            회원탈퇴
          </div>
        )}
      </div>
      <div className='box-menu-mobile'>
        <FontAwesomeIcon
          id='icon-back'
          icon={faArrowLeft}
          onClick={() => {
            history.push('/');
          }}/>
          <Select
          id='select-menu'
          options={menuList}
          onChange={selectSetting}
          value={selected}
        />
      </div>
      <div className='box-content'>
        {tabMenu === 0 ? (
          <Site />
        ) : tabMenu === 1 ? (
          <AutoComplete themeColor={themeColor} />
        ) : (
          <SearchData themeColor={themeColor} />
        )}
      </div>
      {confirmWithdrawal && (
        <Withdrawal setConfirmWithdrawal={setConfirmWithdrawal} />
      )}
    </div>
  );
}
