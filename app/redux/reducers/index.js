import {combineReducers} from 'redux';
import auth from './auth';
import books from './books';
import cart from './cart';

export default combineReducers({
  auth,
  books,
  cart,
});
