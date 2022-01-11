import { CHANGE, RESET } from '../actions/index';

const imageReducer = (
  state = {
    type: 'image',
    view: 0,
    order: 3,
    content: {img1:'',img2:'',img3:'',img4:''}
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
        type: 'image',
        view: 0,
        order: 3,
        content: {img1:'',img2:'',img3:'',img4:''}
      };

    default:
      return state;
  }
};

export default imageReducer;