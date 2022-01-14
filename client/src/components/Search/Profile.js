import React from 'react';

export default function Profile({ profileData }) {
  return (
    <div className='profile-container'>
      <div className='box-maininfo'>
        <div className='text-name'>{profileData.name}</div>
        <div className='text-job'>{profileData.job}</div>
      </div>
      <div className='box-detail'>
        <div className='section-title'>프로필</div>
        <div className='box-detail-profile'>
          {profileData.profileImg !== '' ? (
            <img
              src={profileData.profileImg}
              alt='img-profile'
              className='img-profile'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '../../img/no-image-column.png';
              }}
            />
          ) : (
            <div className='img-profile'>
              설정된 이미지가
              <br />
              존재하지 않습니다.
            </div>
          )}
          <div className='box-detail-text'>
            {profileData.info.map((el, id) => (
              <ElOfDetilText key={id} el={el} id={id} />
            ))}
          </div>
        </div>
      </div>
      {profileData.subinfo.map((el, id) => (
        <BoxOfSubinfo el={el} key={id} />
      ))}
    </div>
  );
}

function ElOfDetilText({ el }) {
  return (
    <>
      <div className='title-detail-text'>{el.title}</div>
      <div className='content-detail-text'>{el.content}</div>
    </>
  );
}

function BoxOfSubinfo({ el }) {
  return (
    <div className='box-subinfo'>
      <div className='box-subinfo-title'>
        <div className='title-subinfo'>{el.title}</div>
      </div>
      <div className='box-subinfo-content'>
        {el.content.map((el, id) => (
          <ElOfSubinfo key={id} el={el} />
        ))}
      </div>
    </div>
  );
}

function ElOfSubinfo({ el }) {
  return (
    <div className='el-subinfo'>
      {el.image !== '' ? (
        <img
          src={el.image}
          alt='img-subinfo'
          className='img-subinfo'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '../../img/no-image-column.png';
          }}
        />
      ) : (
        <div className='img-subinfo'>
          설정된 이미지가
          <br />
          존재하지 않습니다.
        </div>
      )}

      <div className='title-subinfo-content'>{el.title}</div>
    </div>
  );
}
