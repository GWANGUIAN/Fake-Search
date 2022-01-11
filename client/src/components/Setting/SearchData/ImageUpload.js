import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import './ImageUpload.css';

export default function ImageUpload({imageData, onDrop, imgNum}) {

  // const onDrop = (pictureFiles, pictureBase64) => {
  //   const body = new FormData();
  //   body.append('files', pictureFiles[0]);
  //   axios
  //     .post(`${process.env.REACT_APP_SERVER_API}/post/upload_files`, body, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     })
  //     .then((res) => {
  //       setImageData(`${process.env.REACT_APP_SERVER_API}/${res.data.filename}`);
  //     });
  // };

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
