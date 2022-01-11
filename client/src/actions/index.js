export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHANGE = "CHANGE";
export const RESET = "RESET";

export const login = (state) => {
  return {
    type: LOGIN,
    payload: state,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const change = (state) => {
    return {
      type: CHANGE,
      payload: state,
    };
  };
  
  export const reset = () => {
    return {
      type: RESET,
    };
  };