import InitialState from '../constants/InitialState';
import { ADD_TOKEN, CLEAR_AUTH, LOGIN_FAIL } from '../constants/Actiontypes';


export const UserReducer = (state = InitialState.user, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        ...action.userId,
        ...action.token
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loginState: action.loginState
      };

    case CLEAR_AUTH:
      return {
        ...state,
        userId: '',
        token: '',
        loginState: null
      };

    default:
      return state;
  }
};
