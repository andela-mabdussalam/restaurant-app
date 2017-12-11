import InitialState from '../constants/InitialState';
import { ADD_TO_CART } from '../constants/Actiontypes';

export const CartReducer = (state = InitialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, { name: action.product.Name, url: action.product.ImageUrl }]
      };
    default:
      return state;
  }
};
