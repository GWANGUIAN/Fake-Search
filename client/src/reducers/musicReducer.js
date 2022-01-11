import { CHANGE, RESET } from '../actions/index';

const musicReducer = (
  state = {
    type: 'music',
    view: 0,
    album: '',
    info: '',
    order: 4,
    title: '',
    artist: ''
  },
  action
) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        ...action.payload
      };
    case RESET:
      return {
        ...state,
        type: 'music',
        view: 0,
        album: '',
        info: '',
        order: '4',
        title: '',
        artist: ''
      };

    default:
      return state;
  }
};

export default musicReducer;