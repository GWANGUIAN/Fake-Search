import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProfileSet from './ProfileSet';
import NewsSet from './NewsSet';
import ImageSet from './ImageSet';
import MusicSet from './MusicSet';
import './SearchData.css';
import './SetComponent.css'

export default function SearchData({ themeColor }) {
  const boxModal = useRef();
  const btnSection = useRef();
  const [searchWordList, setSearchWordList] = useState([
    { value: '김코딩', label: '김코딩', color: themeColor },
    { value: '박해커', label: '박해커', color: themeColor },
  ]);
  const [modalSection, setModalSection] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const [todos, setTodos] = useState([
    { id: '1', title: '프로필' },
    { id: '2', title: '뉴스' },
    { id: '3', title: '이미지' },
    { id: '4', title: '음악' },
  ]);

  const handleClickOutside = ({ target }) => {
    if (
      !boxModal.current.contains(target) &&
      !btnSection.current.contains(target)
    )
      setModalSection(false);
  };

  const handleDropChange = (result) => {
    if (!result.destination) return;
    console.log(result);
    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.forEach((el,index) => {items[index].id=String(index+1)})

    setTodos(items);
    console.log(items)
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='searchdata-container'>
      <div className='box-control'>
        <div id='text-searchWord'>검색어</div>
        <Select id='input-seachWord' options={searchWordList} />
        <button id='btn-save' style={{ backgroundColor: themeColor }}>
          저장
        </button>
        <div id='btn-preview'>
          <span>미리보기</span>
        </div>
        <div id='btn-add-word'>
          <span
            onClick={() => {
              setModalAdd(!modalAdd);
            }}
          >
            + 검색어 추가
          </span>
        </div>
        <div id='btn-delete-word'>삭제</div>
      </div>
      <div className='box-section'>
        <div id='btn-add-section'>
          <span
            ref={btnSection}
            onClick={() => {
              setModalSection(!modalSection);
            }}
          >
            + 섹션 추가
          </span>
          <ModalSection
            themeColor={themeColor}
            boxModal={boxModal}
            modalSection={modalSection}
          />
        </div>
        <div className='setting-section'>
          {/* <DragDropContext onDragEnd={handleDropChange}>
            <Droppable droppableId='todos'>
              {(provided) => (
                <div
                  className='todos'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todos.map(({ id, title }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {title}
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext> */}
          <ProfileSet/>
          <NewsSet/>
          <ImageSet/>
          <MusicSet/>
        </div>
      </div>
      {modalAdd && (
        <AddSeachWord setModalAdd={setModalAdd} themeColor={themeColor} />
      )}
    </div>
  );
}

function ModalSection({ themeColor, boxModal, modalSection }) {
  return (
    <div
      ref={boxModal}
      className={
        modalSection
          ? 'modalsection-container'
          : 'modalsection-container hidden'
      }
      style={{ border: `1px solid ${themeColor}` }}
    >
      <div>
        <input type='checkbox' id='profile' className='profile-check-box' />
        <label for='profile' className='text-profile'>
          프로필
        </label>
      </div>
      <div>
        <input type='checkbox' id='news' className='news-check-box' />
        <label for='news' className='text-news'>
          뉴스
        </label>
      </div>
      <div>
        <input type='checkbox' id='image' className='image-check-box' />
        <label for='image' className='text-image'>
          이미지
        </label>
      </div>
      <div>
        <input type='checkbox' id='music' className='music-check-box' />
        <label for='music' className='text-music'>
          프로필
        </label>
      </div>
    </div>
  );
}

function AddSeachWord({ themeColor, setModalAdd }) {
  return (
    <div className='bg-modal'>
      <div className='add-container'>
        <div
          className='btn-close'
          onClick={() => {
            setModalAdd(false);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
        </div>
        <div className='box-input-add'>
          <input type='text' id='input-new-word' />
          <div id='message'>검색어를 입력하세요</div>
          <button
            id='btn-add-seachword'
            style={{ backgroundColor: themeColor }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
