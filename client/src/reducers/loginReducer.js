import { LOGIN, LOGOUT } from '../actions/index';

const loginReducer = (
  state = {
    isLogin: false,
    oauth: '',
    id: '',
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        oauth: action.payload.oauth,
        id: action.payload.id,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        oauth: '',
        id: '',
      };

    default:
      return state;
  }
};

export default loginReducer;