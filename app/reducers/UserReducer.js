import InitialState from '../constants/InitialState';
import { ADD_TOKEN, LOGIN_FAIL } from '../constants/Actiontypes';


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

    default:
      return state;
  }
};
