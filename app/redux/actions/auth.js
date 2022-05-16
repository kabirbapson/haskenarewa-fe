import EncryptedStorage from 'react-native-encrypted-storage';
import {AxiosRequestConfig} from 'axios';
const FormData = global.FormData;

import axios from '../../axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  USER_LOGOUT,
  SET_TOKEN,
  USER_RESTORING,
  VERIFICATION_SEND_SUCCESS,
  VERIFICATION_SEND_FAILED,
  VERIFICATION_VERIFY_FAILED,
  VERIFICATION_VERIFY_SUCCESS,
  GET_USER_FOLLOW,
  FOLLOW_USER,
  UN_FOLLOW_USER,
} from '../constants/auth';

export const restoreUser = () => (dispatch, getState) => {
  // dispatch({type: USER_LOADING});
  //Get Token from the state

  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Check to see if there is an token and to header
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios
    .get('/api/v1/user', config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: AUTH_ERROR,
        });
      } else {
        alert('Network error Please check your connection');
      }
    });
};

export const getUserFollow = () => (dispatch, getState) => {
  // dispatch({type: USER_LOADING});
  //Get Token from the state

  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Check to see if there is an token and to header
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios
    .get('/api/v1/follow', config)
    .then(res => {
      dispatch({
        type: GET_USER_FOLLOW,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        // do nothing
      } else {
        // do nothing
      }
    });
};

export const followUser = user_id => (dispatch, getState) => {
  // dispatch({type: USER_LOADING});
  //Get Token from the state

  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Check to see if there is an token and to header
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get(`/api/v1/follow/${user_id}/`, config)
    .then(res => {
      dispatch({
        type: FOLLOW_USER,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        // do nothing
      } else {
        // do nothing
      }
    });
};

export const unFollowUser = user_id => (dispatch, getState) => {
  // dispatch({type: USER_LOADING});
  //Get Token from the state

  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Check to see if there is an token and to header
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get(`/api/v1/follow/${user_id}/`, config)
    .then(res => {
      dispatch({
        type: UN_FOLLOW_USER,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        // do nothing
      } else {
        // do nothing
      }
    });
};

export const logUserOut = () => (dispatch, getState) => {
  dispatch({type: USER_LOADING});
  //Get Token from the state

  const token = getState().auth.token;
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //Check to see if there is an token and to header
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios
    .post('/api/v1/logout', config)
    .then(res => {
      dispatch({
        type: USER_LOGOUT,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: USER_LOGOUT,
        });
      } else {
        dispatch({type: USER_LOGOUT});
      }
    });
};

// Registration Actions
export const sendVerification = (userData, ErrorOccur) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/v1/verify', body, config)
    .then(res => {
      dispatch({
        type: VERIFICATION_SEND_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data.username) {
          ErrorOccur('Sorry account with this phone number already exist');
          dispatch({type: LOGIN_FAIL});
        }
      } else {
        ErrorOccur(error.message);
        dispatch({type: LOGIN_FAIL});
      }
    });
};

export const signUp = (userData, callBackFunc) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/v1/register', body, config)
    .then(res => {
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        callBackFunc(error.response.data, error.response.status);
        dispatch({type: REGISTER_FAIL});
      } else {
        // eslint-disable-next-line no-alert
        alert(error.message);
        dispatch({type: REGISTER_FAIL});
      }
    });
};

export const verifyEmail = (userData, callBackFunc) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/v1/verify', body, config)
    .then(res => {
      callBackFunc(res.data, res.status);
      dispatch({
        VERIFICATION_SEND_SUCCESS,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({type: VERIFICATION_SEND_FAILED});
        callBackFunc(error.response.data, error.response.status);
      } else {
        console.log('network error');
        dispatch({type: VERIFICATION_SEND_FAILED});
      }
    });
};

export const confirmEmail = (userData, token, callBackFunc) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Session: token,
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/v1/verify-confirmation', body, config)
    .then(res => {
      callBackFunc(res.data, res.status);
      dispatch({
        VERIFICATION_SEND_SUCCESS,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({type: VERIFICATION_SEND_FAILED});
        callBackFunc(error.response.data, error.response.status);
      } else {
        console.log('network error');
        dispatch({type: VERIFICATION_SEND_FAILED});
      }
    });
};

export const signIn = (userData, handleError) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/v1/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      if (error.response) {
        if (error.response) {
          dispatch({type: LOGIN_FAIL});
          handleError({
            data: error.response.data,
            status: error.response.status,
          });
        }
      } else {
        console.log('network error');
        dispatch({type: LOGIN_FAIL});
      }
    });
};

export const resetPassword = (userData, callBackFunc) => dispatch => {
  dispatch({type: USER_LOADING});

  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(userData);

  axios
    .post('/api/v1/reset-password-request', body, config)
    .then(res => {
      callBackFunc(res.data, res.status);
      dispatch({
        VERIFICATION_SEND_SUCCESS,
      });
    })
    .catch(error => {
      if (error.response) {
        dispatch({type: VERIFICATION_SEND_FAILED});
        callBackFunc(error.response.data, error.response.status);
      } else {
        console.log('network error');
        dispatch({type: VERIFICATION_SEND_FAILED});
      }
    });
};

export const resetPasswordVerify =
  (userData, token, callBackFunc) => dispatch => {
    dispatch({type: USER_LOADING});

    // Header
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Session: `${token}`,
      },
    };

    const body = JSON.stringify(userData);

    axios
      .post('/api/v1/reset-password-verify', body, config)
      .then(res => {
        callBackFunc(res.data, res.status);
        dispatch({
          VERIFICATION_SEND_SUCCESS,
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({type: VERIFICATION_SEND_FAILED});
          callBackFunc(error.response.data, error.response.status);
        } else {
          console.log('network error');
          dispatch({type: VERIFICATION_SEND_FAILED});
        }
      });
  };

export const resetPasswordChange =
  (userData, token, callBackFunc) => dispatch => {
    dispatch({type: USER_LOADING});

    // Header
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Session: `${token}`,
      },
    };

    const body = JSON.stringify(userData);

    axios
      .post('/api/v1/reset-password-change', body, config)
      .then(res => {
        callBackFunc(res.data, res.status);
        dispatch({
          VERIFICATION_SEND_SUCCESS,
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch({type: VERIFICATION_SEND_FAILED});
          callBackFunc(error.response.data, error.response.status);
        } else {
          console.log('network error');
          dispatch({type: VERIFICATION_SEND_FAILED});
        }
      });
  };

export const updateUserProfile =
  (form, callBackFunc) => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const token = getState().auth.token;

    const formData = new FormData();
    formData.append('profile_picture', form.profile_picture);
    formData.append('about_me', form.about_me);

    const config = {
      method: 'POST',
      url: '/api/v1/update',
      responseType: 'json',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
        // if backend supports we can use gzip request encoding
        // "Content-Encoding": "gzip",
      },
      transformRequest: (data, headers) => {
        // !!! override data to return formData
        // since axios converts that to string
        return formData;
      },
      data: formData,
    };

    axios
      .request(config)
      .then(res => {
        dispatch({type: UPDATE_USER, payload: res.data});
        callBackFunc(200);
      })
      .catch(error => {
        dispatch({type: UPDATE_USER_FAIL});
        console.log(error.response.data);
        callBackFunc(400);
      });

    // fetch('http://192.168.43.39:8000/api/v1/update', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Token ${token}`,
    //   },
    //   body: data,
    // })
    //   .then(response => {
    //     if (!rdispatch({type: UPDATE_USER, payload: res});
    //     callBackFunc(200);esponse.ok) {
    //       return response.text().then(text => {
    //         throw new Error(`status code: ${response.status} error: ${text}`);
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then(res => {
    //     dispatch({type: UPDATE_USER, payload: res});
    //     callBackFunc(200);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     dispatch({type: UPDATE_USER_FAIL});
    //     callBackFunc(400);
    //   });
  };
