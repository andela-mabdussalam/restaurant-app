import InitialState from '../constants/InitialState';
import {
  ADD_TO_CART,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
} from '../constants/Actiontypes';

export const getTotal = (state) => {
  let reduced = 0;
  reduced = state.reduce(
    (total, item) =>
      total + (parseInt(item.price, 10) * item.quantity),
    0
  );
  return reduced;
};

export const CartReducer = (state = InitialState.cart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.product],
        total: (parseInt(action.product.price, 10) * action.product.quantity) +
        getTotal(state.items),
      };

    case INCREASE_ITEM_QUANTITY:
      if (action.product.quantity === 0) {
        return {
          ...state,
          items: state.items.filter(element => (element.name !== action.product.name)),
          total: state.total - parseInt(action.product.price, 10)
        };
      }
      return {
        ...state,
        items: state.items.map(element => (element.name === action.product.name ?
          { ...element, quantity: action.product.quantity } : element)),
        total: state.total + parseInt(action.product.price, 10)
      };

    case DECREASE_ITEM_QUANTITY:
      if (action.product.quantity === 0) {
        return {
          ...state,
          items: state.items.filter(element => (element.name !== action.product.name)),
          total: state.total - parseInt(action.product.price, 10)
        };
      }
      return {
        ...state,
        items: state.items.map(element => (element.name === action.product.name ?
          { ...element, quantity: action.product.quantity } : element)),
        total: state.total - parseInt(action.product.price, 10)
      };

    default:
      return state;
  }
};

