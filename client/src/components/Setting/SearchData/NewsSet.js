import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export default function NewsSet() {
  const [isOpen, setIsOpen] = useState(false);
  const [newsData, setNewsData] = useState({
    type: 'news',
    content: [
      {
        reporter: '조선일보',
        datetime: '1시간전',
        title: '[긴급속보] OOO♡OOO 열애중?! 알고보니.....',
        content:
          '기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용 기사내용',
      },
    ],
    order: '2',
  });

  return (
    <div className='newsset-container'>
      <div className='box-section-title'>
        <div className='section-title'>뉴스</div>
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
          {newsData.content.map((el, id) => {
            return <ElOfNews key={id} el={el} />;
          })}
          <button id='btn-add-news'>+ 뉴스 추가</button>
        </>
      )}
    </div>
  );
}

function ElOfNews({ el }) {
  return (
    <div className='box-news'>
      <div className='inline-box-news'>
        <div className='box-news-content'>
          <div className='news-line-first'>
            <input type='text' className='reporter' placeholder='신문사' />
            <input type='text' className='news-date' placeholder='기사 날짜' />
          </div>
          <input
            type='text'
            className='title-news'
            value={el.title}
            placeholder='뉴스 제목'
          />
          <textarea
            value={el.content}
            className='content-news'
            placeholder='뉴스 내용'
          />
        </div>
        <div className='img-news'>뉴스 사진</div>
      </div>
      <FontAwesomeIcon className='btn-delete-news' icon={faMinusCircle} />
    </div>
  );
}
