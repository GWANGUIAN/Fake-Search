import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export default function ProfileSet() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    type: 'profile',
    name: '이름',
    job: '직업',
    info: [
      { title: '정보', content: '내용' },
      { title: '정보', content: '내용' },
      { title: '정보', content: '내용' },
    ],
    subinifo: [{ title: '타입', content: [{ image: '', title: '타이틀' }] }],
    order: '1',
  });

  return (
    <div className='profileset-container'>
      <div className='box-section-title'>
        <div className='section-title'>프로필</div>
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
      {isOpen && (
        <>
          <div className='box-maininfo'>
            <input
              type='text'
              placeholder='이름'
              value={profileData.name}
            ></input>
            <input
              type='text'
              placeholder='직업'
              value={profileData.job}
            ></input>
          </div>
          <div className='box-detail'>
            <div className='img-profile'>프로필 사진</div>
            <div className='box-detail-text'>
              {profileData.info.map((el, id) => (
                <ElOfDetilText key={id} el={el} />
              ))}
              <button id='btn-add-detail'>+ 정보 추가</button>
            </div>
          </div>
          {profileData.subinifo.map((el, id) => (
            <BoxOfSubinfo el={el} key={id} />
          ))}
          <button id='btn-add-subinfo'>+ 정보 추가</button>
        </>
      )}
    </div>
  );
}

function ElOfDetilText({ el }) {
  return (
    <>
      <input
        type='text'
        placeholder='정보'
        value={el.title}
        className='title-detail-text'
      />
      <input
        type='text'
        placeholder='내용'
        value={el.content}
        className='content-detail-text'
      />
      <FontAwesomeIcon className='btn-delete-detail' icon={faMinusCircle} />
    </>
  );
}

function BoxOfSubinfo({ el }) {
  return (
    <div className='box-subinfo'>
      <input
        type='text'
        className='title-subinfo'
        placeholder='타입'
        value={el.title}
      />
      <FontAwesomeIcon className='btn-delete-subinfo' icon={faMinusCircle} />
      <div className='box-subinfo-content'>
        {el.content.map((el, id) => (
          <ElOfSubinfo key={id} el={el} />
        ))}
        <button id='btn-add-subinfo-content'>+ 추가</button>
      </div>
    </div>
  );
}

function ElOfSubinfo({ el }) {
  return (
    <div className='el-subinfo'>
      <div className='img-subinfo'>subinfo 사진</div>
      <input
        type='text'
        placeholder='제목'
        value={el.title}
        className='title-subinfo-content'
      />
      <FontAwesomeIcon className='btn-delete-el-subinfo' icon={faMinusCircle} />
    </div>
  );
}
