import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: {
    username: ""
  }
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case UserActionTypes.SET_CURRENT_USER: 
      return {
        ...state,
        currentUser: action.payload
      }
    case UserActionTypes.SET_AUTH_ON_SIGN_IN_SUCCESS:
      return  {
        ...state,
        currentUser: action.payload
      }
    case UserActionTypes.REMOVE_AUTH_ON_SIGN_OUT:
      return {
        ...state,
        currentUser: null
      }
    default: 
      return state;
  }
}

export default userReducer;
