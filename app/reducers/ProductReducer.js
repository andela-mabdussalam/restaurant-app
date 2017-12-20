import InitialState from '../constants/InitialState';
import { RECEIVE_PRODUCTS, REMOVE_PRODUCTS } from '../constants/Actiontypes';


export const ProductReducer = (state = InitialState.products, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return [
        ...state, ...action.products
      ];

    case REMOVE_PRODUCTS:
      return [];


    default:
      return state;
  }
};
