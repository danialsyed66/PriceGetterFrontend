import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  SAVE_SHIPPING_INFO,
} from '../consts';

export const addToCart = (product) => (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const updateCart = (id, quantity) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_CART,
    payload: { id, quantity },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (shippingInfo) => (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: shippingInfo,
  });

  localStorage.setItem(
    'shippingInfo',
    JSON.stringify(getState().cart.shippingInfo)
  );
};
