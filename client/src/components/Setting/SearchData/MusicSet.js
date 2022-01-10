import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export default function MusicSet() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='musicset-container'>
      <div className='box-section-title'>
        <div className='section-title'>음악</div>
        <div
          className='btn-open'
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? '닫기' : '열기'}
        </div>
        <div className='btn-delete-section'>
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen&&(
        <>
        <input type='text' placeholder='곡명' id='title-music' />
        <div className='music-subinfo'>
          <input type='text' placeholder='가수' id='singer'/>
          <input type='text' placeholder='발매일' id='date'/>
        </div>
        <div id='img-album'>앨범 표지</div>
        <FontAwesomeIcon className='btn-delete-album' icon={faMinusCircle} />
        <div id='info-song'>곡 정보</div>
        <textarea type='text' placeholder='곡 정보' id='script-song' />
        </>
      )}
    </div>
  );
}
