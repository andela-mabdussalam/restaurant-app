import * as types from '../constants/Actiontypes';

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
});

const addToCartFn = product => ({
  type: types.ADD_TO_CART,
  product
});

const addToken = token => ({
  type: types.ADD_TOKEN,
  token
});

const login = loginState => ({
  type: types.LOGIN_FAIL,
  loginState
});

const checkOut = () => ({
  type: types.CHECKOUT,
});

const increaseQuantity = product => ({
  type: types.INCREASE_ITEM_QUANTITY,
  product
});

const decreaseQuantity = product => ({
  type: types.DECREASE_ITEM_QUANTITY,
  product
});

const clearAuth = () => ({
  type: types.CLEAR_AUTH,
});

export const addProducts = products => (dispatch) => {
  dispatch(receiveProducts(products));
};
export const addTokenToStore = token => (dispatch) => {
  dispatch(addToken(token));
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

export const clearCart = () => (dispatch) => {
  dispatch(checkOut());
};

export const removeAuth = () => (dispatch) => {
  dispatch(clearAuth());
};

export const loginFail = loginState => (dispatch) => {
  dispatch(login(loginState));
};
