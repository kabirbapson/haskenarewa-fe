import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/cart';

const initialState = {
  cart_items: [],
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart_items: action.payload,
        total: action.payload.length,
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        cart_items: action.payload,
        total: action.payload.length,
      };
    default:
      return state;
  }
}
