import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './AutoComplete.css';

export default function AutoComplete({ themeColor }) {
  const [autoCompleteList, setAutoCompleteList] = useState([
    '가',
    '가나',
    '가나다',
    '가',
    '가나',
    '가나다',
    '가',
    '가나',
    '가',
    '가나',
    '가나다',
  ]);

  return (
    <div className='autocomplete-container'>
      <div className='box-auto-input'>
        <div className='title-auto'>자동완성 검색어</div>
        <div className='box-input'>
          <input type='text' id='input-auto' />
          <button id='btn-add' style={{ backgroundColor: themeColor }}>
            추가
          </button>
        </div>
      </div>
      <div className='box-auto-list'>
        {autoCompleteList.map((el, id) => {
          return <ElOfAutoComplete key={id} el={el} />;
        })}
      </div>
    </div>
  );
}

function ElOfAutoComplete({ el }) {
  return (
    <div className='box-el'>
      <div className='text-auto'>{el}</div>
      <div className='btn-delete'>
        <FontAwesomeIcon icon={faMinusCircle} />
        <div className='text-delete'>삭제</div>
      </div>
    </div>
  );
}
