import * as types from '../constants/Actiontypes';

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
});

const addToCartFn = product => ({
  type: types.ADD_TO_CART,
  product
});

const increaseQuantity = product => ({
  type: types.INCREASE_ITEM_QUANTITY,
  product
});

const decreaseQuantity = product => ({
  type: types.DECREASE_ITEM_QUANTITY,
  product
});

export const addProducts = products => (dispatch) => {
  dispatch(receiveProducts(products));
};

export const addToCart = product => (dispatch) => {
  dispatch(addToCartFn(product));
};

export const increaseItemQuantity = product => (dispatch) => {
  product.quantity += 1;
  dispatch(increaseQuantity(product));
};

export const decreaseItemQuantity = product => (dispatch) => {
  product.quantity -= 1;
  dispatch(decreaseQuantity(product));
};

