// actions/cartActions.js
import * as actionTypes from "../actions/actionTypes";

export const addToCart = (item) => ({
  type: actionTypes.ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (productId) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: productId,
});

export const removeAllFromCart = () => ({
  type: actionTypes.REMOVE_ALL_FROM_CART,
});

export const increaseQuantity = (productId) => ({
  type: actionTypes.INCREASE_QUANTITY,
  payload: productId,
});

export const decreaseQuantity = (productId) => ({
  type: actionTypes.DECREASE_QUANTITY,
  payload: productId,
});
