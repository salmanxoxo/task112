import * as actionTypes from './types';

export const logOut = () => ({
  type: actionTypes.LOG_OUT,
});

export const updateUserEmail = data => ({
  type: actionTypes.UPDATE_USER_EMAIL,
  payload: data,
});
