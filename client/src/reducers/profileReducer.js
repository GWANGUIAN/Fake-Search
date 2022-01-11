import { CHANGE, RESET } from '../actions/index';

const profileReducer = (
  state = {
    type: 'profile',
    order: 1,
    view: 0,
    job: '',
    name: '',
    info: [{title:'',content:''}],
    subinfo: [],
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
        type: 'profile',
        order: 1,
        view: 0,
        job: '',
        name: '',
        info: [{title:'',content:''}],
        subinfo: [],
      };

    default:
      return state;
  }
};

export default profileReducer;