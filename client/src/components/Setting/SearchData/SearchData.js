import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faGripVertical,
  faCheckCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProfileSet from './ProfileSet';
import NewsSet from './NewsSet';
import ImageSet from './ImageSet';
import MusicSet from './MusicSet';
import Preview from './Preview';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeProfile,
  changeNews,
  changeImage,
  changeMusic,
  resetProfile,
  resetNews,
  resetImage,
  resetMusic,
} from '../../../actions';
import './SearchData.css';
import './SetComponent.css';
import axios from 'axios';
import checkAutoComplete from '../../../utils/checkAutoComplete';

export default function SearchData({ themeColor }) {
  const { view: profileView, order: profileOrder } = useSelector(
    (state) => state.profileReducer
  );
  const { view: newsView, order: newsOrder } = useSelector(
    (state) => state.newsReducer
  );
  const { view: imageView, order: imageOrder } = useSelector(
    (state) => state.imageReducer
  );
  const { view: musicView, order: musicOrder } = useSelector(
    (state) => state.musicReducer
  );

  const profileReducer = useSelector((state) => state.profileReducer);
  const newsReducer = useSelector((state) => state.newsReducer);
  const imageReducer = useSelector((state) => state.imageReducer);
  const musicReducer = useSelector((state) => state.musicReducer);

  const dispatch = useDispatch();
  const boxModal = useRef();
  const btnSection = useRef();
  const [searchWordList, setSearchWordList] = useState([]);
  const [selected, setSelected] = useState('');
  const [modalSection, setModalSection] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalSave, setModalSave] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNews, setOpenNews] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [resetDrag, setResetDrag] = useState(false);

  const [windowPreview, setWindowPreview] = useState(false);

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

  const selectSearchData = async (e) => {
    setSelected(e);
    setResetDrag(true);
    setOpenProfile(false);
    setOpenNews(false);
    setOpenImage(false);
    setOpenMusic(false);
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/search/word`,
      {
        params: { word: e.value },
        withCredentials: true,
      }
    );
    dispatch(changeProfile(res.data.profile));
    dispatch(changeNews(res.data.news));
    dispatch(changeImage(res.data.image));
    dispatch(changeMusic(res.data.music));
    setResetDrag(false);
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

  const submitSearchData = () => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_API}/search`,
        {
          word: selected.value,
          profile: profileReducer,
          news: newsReducer,
          image: imageReducer,
          music: musicReducer,
        },
        { withCredentials: true }
      )
      .then(() => {
        alertSave();
      });
  };

  const alertSave = () => {
    setModalSave(true);
    setTimeout(() => {
      setModalSave(false);
    }, 1000);
  };

  const deleteSearchData = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_API}/search`, {
        data: { word: selected.value },
        withCredentials: true,
      })
      .then(() => {
        dispatch(resetProfile());
        dispatch(resetNews());
        dispatch(resetImage());
        dispatch(resetMusic());
        setConfirmDelete(false);
        setSelected('');
        getSeachDataList();
        alertDelete();
      });
  };

  const alertDelete = () => {
    setModalDelete(true);
    setTimeout(() => {
      setModalDelete(false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(resetProfile());
    dispatch(resetNews());
    dispatch(resetImage());
    dispatch(resetMusic());
    getSeachDataList();
  }, [dispatch]);

  return (
    <div className='searchdata-container'>
      <div className='box-control'>
        <div className='box-subcontrol1'>
        <div id='text-searchWord'>?????????</div>
        <Select
          id='input-seachWord'
          options={searchWordList}
          onChange={selectSearchData}
          value={selected}
        />
        <button
          id='btn-save'
          style={{
            backgroundColor:
              selected !== '' ? themeColor : 'rgb(190, 190, 190)',
          }}
          onClick={submitSearchData}
        >
          ??????
        </button>
        </div>
        <div className='box-subcontrol2'>
        <div id='btn-preview'>
          <span
            onClick={async () => {
              if (selected !== '') {
                await setWindowPreview(false);
                await setWindowPreview(true);
              }
            }}
          >
            ????????????
          </span>
        </div>
        <div id='btn-add-word'>
          <span
            onClick={() => {
              setModalAdd(!modalAdd);
            }}
          >
            + ????????? ??????
          </span>
        </div>
        <div
          id='btn-delete-word'
          onClick={() => {
            if (selected !== '') setConfirmDelete(true);
          }}
        >
          ??????
        </div>
        </div>
      </div>
      <div className='box-section'>
        <div id='btn-add-section'>
          <span
            ref={btnSection}
            onClick={() => {
              if(selected!==""){
                setModalSection(!modalSection);
              }
            }}
          >
            + ?????? ??????
          </span>
          <ModalSection
            themeColor={themeColor}
            boxModal={boxModal}
            modalSection={modalSection}
          />
        </div>
        <div className='setting-section'>
        {selected === '' && (
              <div className='box-no-data'>
                ???????????? ???????????????.
              </div>
            )}
          {!profileView &&
            !newsView &&
            !imageView &&
            !musicView &&
            selected !== '' && (
              <div className='box-no-data'>
                ????????? ???????????? ????????????.
                <br />
                ????????? ???????????????.
              </div>
            )}
          {!resetDrag && (
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
                        type: 'profile',
                        view: profileView,
                        order: String(profileOrder),
                      },
                      {
                        type: 'news',
                        view: newsView,
                        order: String(newsOrder),
                      },
                      {
                        type: 'image',
                        view: imageView,
                        order: String(imageOrder),
                      },
                      {
                        type: 'music',
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
                        <Draggable
                          key={order}
                          draggableId={order}
                          index={index}
                        >
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
          )}
        </div>
      </div>
      {modalAdd && (
        <AddSeachWord
          setModalAdd={setModalAdd}
          themeColor={themeColor}
          getSeachDataList={getSeachDataList}
        />
      )}
      <ModalSave modalSave={modalSave} />
      {confirmDelete && (
        <ConfirmDelete
          themeColor={themeColor}
          setConfirmDelete={setConfirmDelete}
          deleteSearchData={deleteSearchData}
        />
      )}
      <ModalDelete modalDelete={modalDelete} />
      {windowPreview && <Preview word={selected} />}
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
          ?????????
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
          ??????
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
          ?????????
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
          ??????
        </label>
      </div>
    </div>
  );
}

function AddSeachWord({ themeColor, setModalAdd, getSeachDataList }) {
  const [searchWord, setSearchWord] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [alertText, setAlertText] = useState(
    '???????????? ?????? 16????????? ???????????????. (??????,?????? ??????)'
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
        await setAlertText('?????? ????????? ???????????????.');
        await setIsChecked(false);
      } else if (res.status === 201) {
        await setSearchWord('');
        await axios
          .get(`${process.env.REACT_APP_SERVER_API}/auto`, {
            withCredentials: true,
          })
          .then(() => {
            getSeachDataList();
            setModalAdd(false);
          });
      }
    }
  };

  const handleCheck = (e) => {
    setSearchWord(e.target.value);
    setAlertText(
      '???????????? ???????????? ?????? 16????????? ???????????????. (??????,?????? ??????)'
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
            ??????
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalSave({ modalSave }) {
  return (
    <div
      className={
        modalSave ? 'modalsave-container' : 'modalsave-container hidden'
      }
    >
      <FontAwesomeIcon
        icon={faCheckCircle}
        className='icon-save'
      ></FontAwesomeIcon>
      <div className='text-save'>?????? ??????</div>
    </div>
  );
}

function ConfirmDelete({ setConfirmDelete, deleteSearchData, themeColor }) {
  return (
    <div className='confirmdelete-container'>
      <FontAwesomeIcon icon={faTrash} className='icon-delete'></FontAwesomeIcon>
      <div className='text-delete'>?????? ???????????? ?????????????????????????</div>
      <div className='box-btn-delete'>
        <button
          className='btn-delete-cancel'
          onClick={() => {
            setConfirmDelete(false);
          }}
        >
          ??????
        </button>
        <button
          className='btn-delete-accept'
          style={{
            backgroundColor: themeColor,
          }}
          onClick={deleteSearchData}
        >
          ??????
        </button>
      </div>
    </div>
  );
}

function ModalDelete({ modalDelete }) {
  return (
    <div
      className={
        modalDelete ? 'modaldelete-container' : 'modaldelete-container hidden'
      }
    >
      <FontAwesomeIcon
        icon={faCheckCircle}
        className='icon-delete-complete'
      ></FontAwesomeIcon>
      <div className='text-delete-complete'>?????????????????????.</div>
    </div>
  );
}
