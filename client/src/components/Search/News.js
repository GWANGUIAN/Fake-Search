import React from 'react';

export default function News({ newsData }) {
  return (
    <div className='news-container'>
      <div className='section-title'>뉴스</div>
      {newsData.content.map((el, id) => {
        return (
          <ElOfNews
            key={id}
            el={el}
            id={id}
            lastID={newsData.content.length - 1}
          />
        );
      })}
      <div className='btn-more-news'>뉴스 더보기 &#10132;</div>
    </div>
  );
}

function ElOfNews({ el, id, lastID }) {
  return (
    <div className={id === lastID ? 'box-news-last' : 'box-news'}>
      <div className='box-news-content'>
        <div className='news-line-first'>
          <div className='reporter'>{el.reporter}</div>
          <div className='news-date'>{el.datetime}</div>
        </div>
        <div className='title-news'>{el.title}</div>
        <div className='content-news'>{el.content}</div>
      </div>

      {el.img !== '' ? (
        <img
          src={el.img}
          alt='img-news'
          className='img-news'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '../../img/no-image-row.png';
          }}
        />
      ) : (
        <div className='img-news'>
          설정된 이미지가
          <br />
          존재하지 않습니다.
        </div>
      )}
    </div>
  );
}
