import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from './ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { changeImage, resetImage } from '../../../actions';
import axios from 'axios';

export default function ImageSet({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.imageReducer);

  const onDrop = async (pictureFiles, pictureBase64, imgNum) => {
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
      changeImage({
        content: {
          ...content,
          [imgNum]: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`,
        },
      })
    );
  };

  const deleteImg = (imgNum) => {
    dispatch(changeImage({ content: { ...content, [imgNum]: '' } }));
  };

  return (
    <div className='imageset-container'>
      <div className='box-section-title'>
        <div className='section-title'>이미지</div>
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
            dispatch(resetImage());
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <div className='box-image'>
          <div className='el-img'>
            <div className='el-img-line'>
              <ImageUpload
                imageData={content.img1}
                onDrop={onDrop}
                imgNum='img1'
              />
            </div>

            {content.img1 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className='btn-delete-img'
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img1');
                }}
              />
            )}
          </div>
          <div className='el-img'>
            <div className='el-img-line'>
              <ImageUpload
                imageData={content.img2}
                onDrop={onDrop}
                imgNum='img2'
              />
            </div>

            {content.img2 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className='btn-delete-img'
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img2');
                }}
              />
            )}
          </div>
          <div className='el-img'>
            <div className='el-img-line'>
              <ImageUpload
                imageData={content.img3}
                onDrop={onDrop}
                imgNum='img3'
              />
            </div>

            {content.img3 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className='btn-delete-img'
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img3');
                }}
              />
            )}
          </div>
          <div className='el-img'>
            <div className='el-img-line'>
              <ImageUpload
                imageData={content.img4}
                onDrop={onDrop}
                imgNum='img4'
              />
            </div>

            {content.img4 === '' ? (
              ''
            ) : (
              <FontAwesomeIcon
                className='btn-delete-img'
                icon={faTimesCircle}
                onClick={() => {
                  deleteImg('img4');
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
