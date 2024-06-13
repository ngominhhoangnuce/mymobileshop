import * as actionTypes from "./actionTypes";

export const addToCart = (product) => ({
  type: actionTypes.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: productId,
});

export const removeAllFromCart = () => ({
  type: actionTypes.REMOVE_ALL_FROM_CART,
});
