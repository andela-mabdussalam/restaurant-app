import * as types from '../constants/Actiontypes';

const addToCartFn = product => ({
  type: types.ADD_TO_CART,
  product
});

export const addToCart = product => (dispatch) => {
  dispatch(addToCartFn(product));
};
