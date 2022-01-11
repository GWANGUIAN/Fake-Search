import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { changeProfile, resetProfile } from '../../../actions';
import ImageUpload from './ImageUpload';
import axios from 'axios';

export default function ProfileSet({ isOpen, setIsOpen }) {
  const temp = {
    job: '웹 개발자',
    info: [
      { title: '신체', content: '175cm' },
      { title: '출생', content: '1996.12.10' },
      { title: '학력', content: '카이스트' },
    ],
    name: '김코딩',
    type: 'profile',
    view: 1,
    order: 1,
    subinifo: [
      {
        title: '방송',
        content: [
          { image: '', title: '코딩은 무엇인가' },
          { image: '', title: '코딩은 무엇이다' },
        ],
      },
    ],
  };
  const dispatch = useDispatch();
  const { job, info, name, subinfo, profileImg } = useSelector(
    (state) => state.profileReducer
  );

  const handleInput = (e) => {
    dispatch(changeProfile({ [e.target.name]: e.target.value }));
  };

  const addInfo = () => {
    const data = [...info];
    data.push({ title: '', content: '' });
    dispatch(changeProfile({ info: data }));
  };

  const addSubinfo = () => {
    const data = [...subinfo];
    data.push({
      title: '',
      content: [{ image: '', title: '' }],
    });
    dispatch(changeProfile({ subinfo: data }));
  };

  const onDrop = async (pictureFiles, pictureBase64) => {
    const body = new FormData();
    body.append('files', pictureFiles[0]);
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/post/upload_files`,
      body,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    dispatch(
      changeProfile({
        profileImg: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`,
      })
    );
  };

  const deleteProfile = () => {
    dispatch(changeProfile({ profileImg: '' }));
  };

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
        <div
          className='btn-delete-section'
          onClick={() => {
            dispatch(resetProfile());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <>
          <div className='box-maininfo'>
            <input
              type='text'
              placeholder='이름'
              value={name}
              name='name'
              onChange={handleInput}
            ></input>
            <input
              type='text'
              placeholder='직업'
              value={job}
              name='job'
              onChange={handleInput}
            ></input>
          </div>
          <div className='box-detail'>
            <div className='img-profile'>
              <div className='img-profile-line'>
                <ImageUpload imageData={profileImg} onDrop={onDrop} />
              </div>
              {profileImg !== '' && (
                <FontAwesomeIcon
                  className='btn-delete-profileImg'
                  icon={faTimesCircle}
                  onClick={deleteProfile}
                />
              )}
            </div>
            <div className='box-detail-text'>
              {info.map((el, id) => (
                <ElOfDetilText key={id} el={el} id={id} />
              ))}
              {info.length < 5 && (
                <button id='btn-add-detail' onClick={addInfo}>
                  + 정보 추가
                </button>
              )}
            </div>
          </div>
          {subinfo.map((el, id) => (
            <BoxOfSubinfo el={el} key={id} id={id} />
          ))}
          {subinfo.length < 2 && (
            <button id='btn-add-subinfo' onClick={addSubinfo}>
              + 기타 정보 추가
            </button>
          )}
        </>
      )}
    </div>
  );
}

function ElOfDetilText({ el, id }) {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.profileReducer);

  const handleInput = (e) => {
    const data = [...info];
    data[id] = { ...data[id], [e.target.name]: e.target.value };
    dispatch(changeProfile({ info: data }));
  };

  const deleteInfo = () => {
    const data = [...info];
    data.splice(id, 1);
    dispatch(changeProfile({ info: data }));
  };

  return (
    <>
      <input
        type='text'
        placeholder='정보'
        value={el.title}
        className='title-detail-text'
        name='title'
        onChange={handleInput}
      />
      <input
        type='text'
        placeholder='내용'
        value={el.content}
        className='content-detail-text'
        name='content'
        onChange={handleInput}
      />
      <FontAwesomeIcon
        className={
          id === 0 ? 'btn-delete-detail unvisible' : 'btn-delete-detail'
        }
        icon={faMinusCircle}
        onClick={deleteInfo}
      />
    </>
  );
}

function BoxOfSubinfo({ el, id }) {
  const dispatch = useDispatch();
  const { subinfo } = useSelector((state) => state.profileReducer);

  const handleInput = (e) => {
    const data = [...subinfo];
    data[id] = { ...data[id], [e.target.name]: e.target.value };
    dispatch(changeProfile({ subinfo: data }));
  };

  const deleteSubinfo = () => {
    const data = [...subinfo];
    data.splice(id, 1);
    dispatch(changeProfile({ subinfo: data }));
  };

  const addSubinfoContent = () => {
    const data = [...subinfo];
    data[id]['content'].push({ image: '', title: '' });
    dispatch(changeProfile({ subinfo: data }));
  };

  return (
    <div className='box-subinfo'>
      <div className='box-subinfo-title'>
        <input
          type='text'
          className='title-subinfo'
          placeholder='타입'
          value={el.title}
          name='title'
          onChange={handleInput}
        />
        <div className='box-delete-subinfo' onClick={deleteSubinfo}>
          <FontAwesomeIcon
            className='btn-delete-subinfo'
            icon={faMinusCircle}
          />
          <div>삭제</div>
        </div>
      </div>
      <div className='box-subinfo-content'>
        {el.content.map((el, index) => (
          <ElOfSubinfo key={index} el={el} index={index} id={id} />
        ))}
        {el.content.length < 5 && (
          <button id='btn-add-subinfo-content' onClick={addSubinfoContent}>
            + 추가
          </button>
        )}
      </div>
    </div>
  );
}

function ElOfSubinfo({ el, id, index }) {
  const dispatch = useDispatch();
  const { subinfo } = useSelector((state) => state.profileReducer);

  const handleInput = (e) => {
    const data = [...subinfo];
    data[id]['content'][index] = {
      ...data[id]['content'][index],
      [e.target.name]: e.target.value,
    };
    dispatch(changeProfile({ subinfo: data }));
  };

  const deleteSubinfoContent = () => {
    const data = [...subinfo];
    data[id]['content'].splice(index, 1);
    dispatch(changeProfile({ subinfo: data }));
  };

  const onDrop = async (pictureFiles, pictureBase64) => {
    const body = new FormData();
    body.append('files', pictureFiles[0]);
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/post/upload_files`,
      body,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    const data = [...subinfo]
    data[id]['content'][index]['image']=`${process.env.REACT_APP_SERVER_API}/${res.data.filename}`
    dispatch(
      changeProfile({
        subinfo : data
      })
    );
  };

  const deleteSubinfoImg = () => {
    const data = [...subinfo]
    data[id]['content'][index]['image']=''
    dispatch(
      changeProfile({
        subinfo : data
      }))
  };

  return (
    <div className='el-subinfo'>
      <div className='img-subinfo'>
        <div className='img-subinfo-line'>
          <ImageUpload onDrop={onDrop} imageData={el.image}/>
        </div>
        {el.image!==''&&<FontAwesomeIcon
          className='btn-delete-subinfo-img'
          icon={faTimesCircle}
          onClick={deleteSubinfoImg}
        />}
      </div>
      <input
        type='text'
        placeholder='제목'
        value={el.title}
        className='title-subinfo-content'
        name='title'
        onChange={handleInput}
      />
      {index !== 0 && (
        <FontAwesomeIcon
          className='btn-delete-el-subinfo'
          icon={faMinusCircle}
          onClick={deleteSubinfoContent}
        />
      )}
    </div>
  );
}
