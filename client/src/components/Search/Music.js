import React from 'react';

export default function Music({ musicData }) {
  return (
    <div className='music-container'>
      <div className='section-title'>음악</div>
      <div className='title-song'>{musicData.title}</div>
      <div className='box-music-info'>
        <div className='text-artist'>{musicData.artist}</div>
        <div className='text-date'>{musicData.date}</div>
      </div>
      <img
        className='img-album'
        alt='img-album'
        src={musicData.album}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '../../img/no-image-row.png';
        }}
      />
      <div className='title-song-info'>곡 정보</div>
      <div className='text-song-info'>{musicData.info}</div>
      <div className='btn-more-music'>음악 정보 더보기 &#10132;</div>
    </div>
  );
}
