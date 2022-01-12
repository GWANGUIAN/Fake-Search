import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer-container'>
      <div className='box-footer'>
        <div className='text-logo-en'><span onClick={()=>{window.location.replace('/')}}>FAKESEARCH</span></div>
        <div className='text-logo-ko'><span onClick={()=>{window.location.replace('/')}}>페이크서치</span></div>
        <div className='creator'>Creator</div>
        <div><a className='blog' href='https://velog.io/@bbaa3218'>GWANGUIAN</a></div>
      </div>
    </div>
  );
}
