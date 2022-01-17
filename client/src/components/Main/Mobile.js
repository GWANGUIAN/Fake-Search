import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import filterAutoComplete from '../../utils/filterAutoComplete';
import axios from 'axios';
import './Mobile.css';

export default function Mobile({setMobileInput, searchWord, setSearchWord}) {

  const [autoComplete, setAutoComplete] = useState([]);

  const { isLogin, themeColor, id } = useSelector(
    (state) => state.loginReducer
  );

  const handleSeachWord = async (e) => {
    setSearchWord(e.target.value);
    if (
      filterAutoComplete(e.target.value) !== '' &&
      e.target.value.replace(/(\s*)/g, '') !== '' &&
      isLogin
    ) {
      const word = filterAutoComplete(e.target.value);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auto/filtered`,
        { params: { word, userId: id }, withCredentials: true }
      );
      setAutoComplete(res.data);
    }
    if (filterAutoComplete(e.target.value).replace(/(\s*)/g, '') === '') {
      setAutoComplete([]);
    }
  };

  useEffect(async()=>{
    if (
      filterAutoComplete(searchWord) !== '' &&
      searchWord.replace(/(\s*)/g, '') !== '' &&
      isLogin
    ) {
      const word = filterAutoComplete(searchWord);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auto/filtered`,
        { params: { word, userId: id }, withCredentials: true }
      );
      setAutoComplete(res.data);
    }
  },[])

  return (
    <>
      <div className='mobile-container'>
        <div className='box-menu'>
          <div
            className='box-input'
            style={{ borderBottom: `1px solid ${themeColor}` }}
          >
            <div className='inner-box-input'>
              <div className='box-logo' onClick={()=>{
                setMobileInput(false)
              }}>
                <FontAwesomeIcon icon={faArrowLeft}/>
              </div>
              <input
                className='input-search'
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                  handleSeachWord(e)
                }}
                onKeyPress={(e)=>{
                  if(e.key==='Enter') {
                    window.location.replace(`/search/query=${searchWord}`)
                  }
                }}
                autoFocus
              />
              <FontAwesomeIcon
                className='icon-search'
                icon={faSearch}
                style={{ color: themeColor }}
                onClick={() => {
                  window.location.replace(`/search/query=${searchWord}`)
                }}
              />
            </div>
          </div>
        </div>
        <div className='box-auto'>
        {searchWord === '' && autoComplete.length === 0
                ? ''
                : autoComplete.map((el, id) => {
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
    </>
  );
}

function AutoList({ el, searchWord, themeColor }) {
    return (
      <div className='list-auto'>
        <button className='searchButton'>
          <FontAwesomeIcon
            icon={faSearch}
            onMouseDown={() => {
              window.location.replace(`/search/query=${el.word}`);
            }}
          />
        </button>
        <div
          id='text-auto'
          onMouseDown={() => {
            window.location.replace(`/search/query=${el.word}`);
          }}
        >
          <span id='part-search' style={{ color: themeColor, fontWeight: '550' }}>
            {filterAutoComplete(searchWord)}
          </span>
          <span id='part-auto'>
            {el.word.slice(filterAutoComplete(searchWord).length, el.word.length)}
          </span>
        </div>
      </div>
    );
  }