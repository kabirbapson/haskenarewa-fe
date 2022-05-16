import axios from '../../axios';
import {
  BOOK_CHECK_OUT_FAILED,
  BOOK_CHECK_OUT_LOADING,
  BOOK_CHECK_OUT_SUCCESS,
} from '../constants/checkout';

export const purchaseBooks = books => (dispatch, getState) => {
  dispatch({type: BOOK_CHECK_OUT_LOADING});

  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const data = JSON.stringify(books);

  //Check to see if there is an token and to header
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .post('/payment/flutterwave/card', data, config)
    .then(res => {
      dispatch({
        type: BOOK_CHECK_OUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: BOOK_CHECK_OUT_FAILED,
        });
      } else {
        alert('Network error Please check your connection');
      }
    });
};

export const checkOutBooks = (books, callBackFunc) => (dispatch, getState) => {
  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const data = JSON.stringify(books);

  //Check to see if there is an token and to header
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .post('/payment/flutterwave/card', data, config)
    .then(res => {
      // console.log(res.data, res.status);
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: BOOK_CHECK_OUT_FAILED,
        });
      } else {
        alert('Network error Please check your connection');
      }
    });
};
