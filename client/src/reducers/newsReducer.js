import { CHANGE, RESET } from '../actions/index';

const newsReducer = (
  state = {
    type: 'news',
    view: 0,
    order: 2,
    content: [{title:'', content: '', datetime: '', reporter:''}],
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
        type: 'news',
        view: 0,
        order: 2,
        content: [{title:'', content: '', datetime: '', reporter:''}],
      };

    default:
      return state;
  }
};

export default newsReducer;