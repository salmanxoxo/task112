const initialState = {
  userToken: null,
  name: null,
  email: null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_EMAIL':
      return {
        ...state,
        email: action.payload,
      };

    case 'UPDATE_USER_DETAIL':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };

    case 'LOG_OUT':
      return {
        ...initialState,
      };
  }
  return state;
};

export default userDataReducer;
