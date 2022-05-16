import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/cart';

export const removeCartItems = id => (dispatch, getState) => {
  const cart_items = getState().cart.cart_items;

  const new_cart_items = cart_items.filter(item => item.id !== id);

  dispatch({type: REMOVE_CART_ITEM, payload: new_cart_items});
};

export const addCartItems = book => (dispatch, getState) => {
  const cart_items = getState().cart.cart_items;

  const new_cart_items = [book, ...cart_items];

  dispatch({type: ADD_CART_ITEM, payload: new_cart_items});
};
