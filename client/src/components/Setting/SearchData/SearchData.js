import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProfileSet from './ProfileSet';
import NewsSet from './NewsSet';
import ImageSet from './ImageSet';
import MusicSet from './MusicSet';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeProfile,
  changeNews,
  changeImage,
  changeMusic,
} from '../../../actions';
import './SearchData.css';
import './SetComponent.css';
import axios from 'axios';
import checkAutoComplete from '../../../utils/checkAutoComplete';

export default function SearchData({ themeColor }) {
  const {
    type: profileType,
    view: profileView,
    order: profileOrder,
  } = useSelector((state) => state.profileReducer);
  const {
    type: newsType,
    view: newsView,
    order: newsOrder,
  } = useSelector((state) => state.newsReducer);
  const {
    type: imageType,
    view: imageView,
    order: imageOrder,
  } = useSelector((state) => state.imageReducer);
  const {
    type: musicType,
    view: musicView,
    order: musicOrder,
  } = useSelector((state) => state.musicReducer);

  const dispatch = useDispatch();

  const boxModal = useRef();
  const btnSection = useRef();
  const [searchWordList, setSearchWordList] = useState([]);
  const [modalSection, setModalSection] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNews, setOpenNews] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);

  const getSeachDataList = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/search`, {
      withCredentials: true,
    });
    setSearchWordList(
      res.data.map((el) => {
        return {
          value: el.word,
          label: el.word,
        };
      })
    );
  };

  const handleClickOutside = ({ target }) => {
    if (
      !boxModal.current.contains(target) &&
      !btnSection.current.contains(target)
    )
      setModalSection(false);
  };

  const handleDropChange = (result) => {
    if (!result.destination) return;
    const items = [
      { order: profileOrder, type: 'profile' },
      { order: newsOrder, type: 'news' },
      { order: imageOrder, type: 'image' },
      { order: musicOrder, type: 'music' },
    ].sort((a, b) => {
      if (a.order > b.order) return 1;
      else if (a.order < b.order) return -1;
      else return 0;
    });
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.forEach((el, index) => {
      items[index].order = index + 1;
      if (el.type === 'profile') {
        dispatch(changeProfile({ order: items[index].order }));
      } else if (el.type === 'news') {
        dispatch(changeNews({ order: items[index].order }));
      } else if (el.type === 'image') {
        dispatch(changeImage({ order: items[index].order }));
      } else if (el.type === 'music') {
        dispatch(changeMusic({ order: items[index].order }));
      }
    });
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getSeachDataList()
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
          <DragDropContext onDragEnd={handleDropChange}>
            <Droppable droppableId='sections'>
              {(provided) => (
                <div
                  className='sections'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {[
                    {
                      type: profileType,
                      view: profileView,
                      order: String(profileOrder),
                    },
                    {
                      type: newsType,
                      view: newsView,
                      order: String(newsOrder),
                    },
                    {
                      type: imageType,
                      view: imageView,
                      order: String(imageOrder),
                    },
                    {
                      type: musicType,
                      view: musicView,
                      order: String(musicOrder),
                    },
                  ]
                    .sort((a, b) => {
                      if (a.order > b.order) return 1;
                      else if (a.order < b.order) return -1;
                      else return 0;
                    })
                    .map(({ type, view, order }, index) => (
                      <Draggable key={order} draggableId={order} index={index}>
                        {(provided) => {
                          if (type === 'profile' && view) {
                            return (
                              <div
                                className='box-drag'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div {...provided.dragHandleProps}>
                                  <FontAwesomeIcon
                                    className='btn-drag'
                                    icon={faGripVertical}
                                  />
                                </div>
                                <ProfileSet
                                  isOpen={openProfile}
                                  setIsOpen={setOpenProfile}
                                />
                              </div>
                            );
                          }
                          if (type === 'news' && view) {
                            return (
                              <div
                                className='box-drag'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div {...provided.dragHandleProps}>
                                  <FontAwesomeIcon
                                    className='btn-drag'
                                    icon={faGripVertical}
                                  />
                                </div>
                                <NewsSet
                                  isOpen={openNews}
                                  setIsOpen={setOpenNews}
                                />
                              </div>
                            );
                          }
                          if (type === 'image' && view) {
                            return (
                              <div
                                className='box-drag'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div {...provided.dragHandleProps}>
                                  <FontAwesomeIcon
                                    className='btn-drag'
                                    icon={faGripVertical}
                                  />
                                </div>
                                <ImageSet
                                  isOpen={openImage}
                                  setIsOpen={setOpenImage}
                                />
                              </div>
                            );
                          }
                          if (type === 'music' && view) {
                            return (
                              <div
                                className='box-drag'
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div {...provided.dragHandleProps}>
                                  <FontAwesomeIcon
                                    className='btn-drag'
                                    icon={faGripVertical}
                                  />
                                </div>

                                <MusicSet
                                  isOpen={openMusic}
                                  setIsOpen={setOpenMusic}
                                />
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className='box-drag'
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              ></div>
                            );
                          }
                        }}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      {modalAdd && (
        <AddSeachWord setModalAdd={setModalAdd} themeColor={themeColor} />
      )}
    </div>
  );
}

function ModalSection({ themeColor, boxModal, modalSection }) {
  const dispatch = useDispatch();
  const { view: profileView } = useSelector((state) => state.profileReducer);
  const { view: newsView } = useSelector((state) => state.newsReducer);
  const { view: imageView } = useSelector((state) => state.imageReducer);
  const { view: musicView } = useSelector((state) => state.musicReducer);

  const hadleView = (e) => {
    if (e.target.id === 'profile') {
      dispatch(changeProfile({ view: e.target.checked }));
    } else if (e.target.id === 'news') {
      dispatch(changeNews({ view: e.target.checked }));
    } else if (e.target.id === 'image') {
      dispatch(changeImage({ view: e.target.checked }));
    } else if (e.target.id === 'music') {
      dispatch(changeMusic({ view: e.target.checked }));
    }
  };

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
        <input
          type='checkbox'
          id='profile'
          className='profile-check-box'
          checked={profileView}
          onChange={hadleView}
        />
        <label for='profile' className='text-profile'>
          프로필
        </label>
      </div>
      <div>
        <input
          type='checkbox'
          id='news'
          className='news-check-box'
          checked={newsView}
          onChange={hadleView}
        />
        <label for='news' className='text-news'>
          뉴스
        </label>
      </div>
      <div>
        <input
          type='checkbox'
          id='image'
          className='image-check-box'
          checked={imageView}
          onChange={hadleView}
        />
        <label for='image' className='text-image'>
          이미지
        </label>
      </div>
      <div>
        <input
          type='checkbox'
          id='music'
          className='music-check-box'
          checked={musicView}
          onChange={hadleView}
        />
        <label for='music' className='text-music'>
          음악
        </label>
      </div>
    </div>
  );
}

function AddSeachWord({ themeColor, setModalAdd }) {
  const [searchWord, setSearchWord] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [alertText, setAlertText] = useState(
    '검색어는 최대 16자까지 가능합니다. (자음,모음 불가)'
  );

  const addSearhData = async () => {
    if (searchWord !== '' && isChecked) {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/search`,
        { word: searchWord },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        await setAlertText('이미 등록된 단어입니다.');
        await setIsChecked(false);
      } else if (res.status === 201) {
        await setSearchWord('');
        await axios
          .get(`${process.env.REACT_APP_SERVER_API}/auto`, {
            withCredentials: true,
          })
          .then((res) => {
            // setAutoCompleteList(res.data);
            setModalAdd(false);
          });
      }
    }
  };

  const handleCheck = (e) => {
    setSearchWord(e.target.value);
    setAlertText(
      '자동완성 검색어는 최대 16자까지 가능합니다. (자음,모음 불가)'
    );
    if (e.target.value === '') {
      setIsChecked(true);
    } else {
      setIsChecked(checkAutoComplete(e.target.value));
    }
  };

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
          <input
            type='text'
            id='input-new-word'
            value={searchWord}
            onChange={handleCheck}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addSearhData();
              }
            }}
          />
          <div id={isChecked ? 'message-hidden' : 'message'}>{alertText}</div>
          <button
            id={
              isChecked && searchWord !== ''
                ? 'btn-add-seachword'
                : 'btn-add-seachword-none'
            }
            style={{
              backgroundColor:
                isChecked && searchWord !== ''
                  ? themeColor
                  : 'rgb(190, 190, 190)',
            }}
            onClick={addSearhData}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
