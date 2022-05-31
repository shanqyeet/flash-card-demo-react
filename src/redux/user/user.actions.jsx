import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) =>  ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const setAuthOnSignInSuccess = (userAuth) => ({
  type: UserActionTypes.SET_AUTH_ON_SIGN_IN_SUCCESS,
  payload: userAuth
});

export const removeAuthOnSignOut = () => ({
  type: UserActionTypes.REMOVE_AUTH_ON_SIGN_OUT
})