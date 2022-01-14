import React from 'react';
import ImageUploader from 'react-images-upload';
import './ImageUpload.css';

export default function ImageUpload({imageData, onDrop, imgNum}) {

  return (
    <div className='whole-box-img'>
    {imageData==='' ? (
      <ImageUploader
      withIcon={true}
      onChange={(pictureFiles, pictureBase64)=>{onDrop(pictureFiles, pictureBase64, imgNum)}}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
      singleImage={true}
      className='box-img-upload'
      buttonClassName='btn-img-upload'
    />
    ) : (
      <img className='img-uploaded' src={imageData} alt='img-upload'/>
    )}
    
    
    </div>
  );
}
