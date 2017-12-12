import InitialState from '../constants/InitialState';
import { RECEIVE_PRODUCTS } from '../constants/Actiontypes';


export const ProductReducer = (state = InitialState.products, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return [
        ...state, ...action.products
      ];

    default:
      return state;
  }
};
