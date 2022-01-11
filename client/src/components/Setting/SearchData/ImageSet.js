import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from './ImageUpload';

export default function ImageSet() {

  const [isOpen, setIsOpen] = useState(true);
  const [imageData, setImageData] = useState('')

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
        <div className='btn-delete-section'>
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <div className='box-image'>
          <div className='el-img'>
            <ImageUpload imageData={imageData} setImageData={setImageData}/>
            {imageData==='' ? '' : <FontAwesomeIcon className='btn-delete-img' icon={faMinusCircle} />}
          </div>
          <div className='el-img'>
          <ImageUpload imageData={imageData} setImageData={setImageData}/>
          {imageData==='' ? '' : <FontAwesomeIcon className='btn-delete-img' icon={faMinusCircle} />}
          </div>
          <div className='el-img'>
          <ImageUpload imageData={imageData} setImageData={setImageData}/>
          {imageData==='' ? '' : <FontAwesomeIcon className='btn-delete-img' icon={faMinusCircle} />}
          </div>
          <div className='el-img'>
          <ImageUpload imageData={imageData} setImageData={setImageData}/>
          {imageData==='' ? '' : <FontAwesomeIcon className='btn-delete-img' icon={faMinusCircle} />}
          </div>
        </div>
      )}
    </div>
  );
}
