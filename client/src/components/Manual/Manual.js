import React from 'react';
import './Manual.css';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Manual({ setDate }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='manual-container'>
      <div className='box-manual'>
        <Slider {...settings}>
          <div>
            <Manual1 />
          </div>
          <div>
            <Manual2 />
          </div>
          <div>
            <Manual3 />
          </div>
          <div>
            <Manual4 />
          </div>
          <div>
            <Manual5 />
          </div>
        </Slider>
        <span
          className='btn-close'
          onClick={() => {
            setDate();
          }}
        >
          닫기(일주일간 보지 않기)
        </span>
      </div>
    </div>
  );
}

function Manual1() {
  return (
    <div className='slide-manual-first'>
      <div className='box-thank'>
        <div className='text-thank'>
          <span>FAKESEARCH</span>에 방문해주셔서 감사합니다.
        </div>
        <div className='text-script'>
          FAKESEARCH는 드라마, 영화 등에서 활용할 수 있도록 <br />
          검색어와 검색 데이터를 커스터마이징할 수 있는 서비스입니다.
        </div>
        <div className='text-next'>페이지를 넘겨 매뉴얼을 확인해주세요</div>
      </div>
    </div>
  );
}

function Manual2() {
  return (
    <div className='slide-manual-second'>
      <img className='img-login' src='img/로그인 모달.png' alt='modal-login' />
      <div className='box-login-script'>
        <div className='text-login-guide1'>
          검색 페이지 설정을 위해
          <br />
          로그인을 진행해주세요.
        </div>
        <div className='text-login-guide2'>
          간단하게 게스트 로그인이 가능합니다.
        </div>
      </div>
    </div>
  );
}

function Manual3() {
  return (
    <div className='slide-manual-third'>
      <div className='box-site-img'>
        <img
          className='setting'
          src='img/사이트 이름 및 테마 색성 설정.png'
          alt='img/setting-siteName'
        />
        <FontAwesomeIcon icon={faForward} className='icon-next' />
        <img
          className='complete'
          src='img/사이트,테마 설정 완료.png'
          alt='img/setting-siteName'
        />
      </div>
      <div className='text-sitename-guide'>
        <span>설정 > 사이트 이름 및 테마 색상 설정 </span>에서 검색 사이트의
        이름과 색상을 변경 할 수 있습니다.
      </div>
    </div>
  );
}

function Manual4() {
  return (
    <div className='slide-manual-fourth'>
      <div className='box-auto-img'>
        <img
          className='setting'
          src='img/자동 검색어 설정.png'
          alt='img/setting-auto'
        />
        <FontAwesomeIcon icon={faForward} className='icon-next' />
        <img
          className='complete'
          src='img/자동 검색어 완료.png'
          alt='img/setting-auto'
        />
      </div>
      <div className='text-auto-guide'>
        <span>설정 > 자동 완성 검색어 설정 </span>에서 검색 창에 표시되는
        검색어를 추가/삭제 할 수 있습니다.
      </div>
    </div>
  );
}

function Manual5() {
  return (
    <div className='slide-manual-fifth'>
      <div className='box-search-img'>
        <img
          className='setting1'
          src='img/섹션추가.png'
          alt='img/setting-search'
        />
        <img
          className='setting2'
          src='img/검색페이지 설정.png'
          alt='img/setting-search'
        />
        <FontAwesomeIcon icon={faForward} className='icon-next' />
        <img
          className='complete'
          src='img/검색페이지.png'
          alt='img/setting-search'
        />
      </div>
      <div className='text-search-guide'>
        <span>설정 > 검색 페이지 설정 </span>에서 검색 페이지의 섹션을 추가하고
        내용을 설정할 수 있습니다.
      </div>
      <div className='box-drag'>
        <img
          className='drag'
          src='img/섹션 순서 변경.png'
          alt='img/setting-drag'
        />
        <div className='text-drag-guide'>
          <span>
            <FontAwesomeIcon icon={faGripVertical} />
          </span>{' '}
          아이콘을 드래그하여
          <br />
          섹션의 순서를 변경할 수 있습니다.
        </div>
      </div>
    </div>
  );
}
