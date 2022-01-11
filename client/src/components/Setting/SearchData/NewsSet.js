import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { changeNews, resetNews } from '../../../actions';
import ImageUpload from './ImageUpload';
import axios from 'axios';

export default function NewsSet({ isOpen, setIsOpen }) {

  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.newsReducer);

  const addNews = () => {
    const data = [...content];
    data.push({ title: '', content: '', datetime: '', reporter: '', img: '' });
    dispatch(changeNews({ content: data }));
  };

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
        <div
          className='btn-delete-section'
          onClick={() => {
            dispatch(resetNews());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <>
          {content.map((el, id) => {
            return <ElOfNews key={id} el={el} id={id} />;
          })}
          <button id='btn-add-news' onClick={addNews}>
            + 뉴스 추가
          </button>
        </>
      )}
    </div>
  );
}

function ElOfNews({ el, id }) {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.newsReducer);

  const hadleInput = (e) => {
    const data = [...content];
    data[id] = { ...data[id], [e.target.name]: e.target.value };
    dispatch(changeNews({ content: data }));
  };

  const deleteNews = () => {
    const data = [...content];
    data.splice(id, 1);
    dispatch(changeNews({ content: data }));
  };

  const deleteImg = () => {
    const data = [...content];
    data[id] = { ...data[id], img: '' };
    dispatch(changeNews({ content: data }));
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
    const data = [...content];
    data[id] = {
      ...data[id],
      img: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`,
    };
    dispatch(changeNews({ content: data }));
  };

  return (
    <div className='box-news'>
      <div className='inline-box-news'>
        <div className='box-news-content'>
          <div className='news-line-first'>
            <input
              type='text'
              className='reporter'
              placeholder='신문사'
              name='reporter'
              value={el.reporter}
              onChange={hadleInput}
            />
            <input
              type='text'
              className='news-date'
              placeholder='기사 날짜'
              name='datetime'
              value={el.datetime}
              onChange={hadleInput}
            />
          </div>
          <input
            type='text'
            className='title-news'
            value={el.title}
            placeholder='뉴스 제목'
            name='title'
            onChange={hadleInput}
          />
          <textarea
            value={el.content}
            className='content-news'
            placeholder='뉴스 내용'
            name='content'
            onChange={hadleInput}
          />
        </div>
        <div className='img-news'>
          <div className='img-news-line'>
            <ImageUpload imageData={el.img} onDrop={onDrop} />
          </div>

          {el.img !== '' && (
            <FontAwesomeIcon
              className='btn-delete-img'
              icon={faTimesCircle}
              onClick={deleteImg}
            />
          )}
        </div>
      </div>
      {id !== 0 && (
        <FontAwesomeIcon
          className='btn-delete-news'
          icon={faMinusCircle}
          onClick={deleteNews}
        />
      )}
    </div>
  );
}
