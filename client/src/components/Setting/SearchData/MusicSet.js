import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { changeMusic, resetMusic } from '../../../actions';
import ImageUpload from './ImageUpload'
import axios from 'axios';

export default function MusicSet({isOpen, setIsOpen}) {

  const dispatch = useDispatch();
  const {title, artist, date, album, info} = useSelector((state) => state.musicReducer)

  const handleInput = (e) =>{
    dispatch(changeMusic({[e.target.name] : e.target.value}))
  }

  const onDrop = async(pictureFiles, pictureBase64, imgNum) => {
    const body = new FormData();
    body.append('files', pictureFiles[0]);
    const res = await axios
      .post(`${process.env.REACT_APP_SERVER_API}/post/upload_files`, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      dispatch(changeMusic({album: `${process.env.REACT_APP_SERVER_API}/${res.data.filename}`}));
  };

  return (
    <div className='musicset-container'>
      <div className='box-section-title'>
        <div className='section-title'>음악</div>
        <div
          className='btn-open'
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? '닫기' : '열기'}
        </div>
        <div className='btn-delete-section' onClick={()=>{dispatch(resetMusic())}}>
          <FontAwesomeIcon icon={faMinusCircle} /> 삭제
        </div>
      </div>
      {isOpen && (
        <>
          <input type='text' placeholder='곡명' id='title-music'  name='title' value={title} onChange={handleInput}/>
          <div className='music-subinfo'>
            <input type='text' placeholder='가수' id='singer' name='artist' value={artist} onChange={handleInput}/>
            <input type='text' placeholder='발매일' id='date' name='date' value={date} onChange={handleInput}/>
          </div>
          <div id='img-album'>
            <div id='img-album-line'><ImageUpload  imageData={album} onDrop={onDrop} /></div>
          
          {album!==''&&<FontAwesomeIcon className='btn-delete-album' icon={faTimesCircle} onClick={()=>{dispatch(changeMusic({album:''}))}} />}
          </div>
          
          
          <div id='info-song'>곡 정보</div>
          <textarea type='text' placeholder='곡 정보' id='script-song' name='info' value={info} onChange={handleInput}/>
        </>
      )}
    </div>
  );
}
