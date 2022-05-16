import axios from '../../axios';
import {
  GET_BOOKS,
  GET_TRENDING_BILLBOARD,
  GET_SECTIONS,
  GET_BOOK_CONTENT,
  GET_READING_LIST,
  SEARCH_BOOK_SUCCEED,
  SEARCH_BOOK_FAILED,
  FETCH_USER_LIBRARY_SUCCEED,
  FETCH_USER_LIBRARY_FAILED,
  FETCH_USER_LIKE_BOOKS_SUCCEED,
  FETCH_USER_LIKE_BOOKS_FAILED,
  START_NEW_BOOK_FAILED,
  START_NEW_BOOK_SUCCEED,
  START_NEW_BOOK_LOADING,
  FETCH_USER_BOOKS,
  UPDATE_USER_BOOKS,
} from '../constants/books';

export const generateHome = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('/catalog/categories/', config)
    .then(res => {
      dispatch({type: GET_SECTIONS, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        //handle error
      } else {
        // handle network error
      }
    });
};

export const getSections = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('/catalog/index', config)
    .then(res => {
      dispatch({type: GET_SECTIONS, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      } else {
        // handle network error
      }
    });
};

export const getBook = id => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get(`/catalog/content/${id}/`, config)
    .then(res => {
      dispatch({type: GET_BOOK_CONTENT, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        //handle error
      } else {
        // handle network error
      }
    });
};

export const getTrendingBillboard = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('/catalog/trending_books/', config)
    .then(res => {
      dispatch({type: GET_TRENDING_BILLBOARD, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      } else {
        // handle network error
      }
    });
};

export const getReadingList = () => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('/catalog/reading', config)
    .then(res => {
      dispatch({type: GET_READING_LIST, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
      } else {
        // handle network error
      }
    });
};

export const searchBook = (query, callBackFunc) => (dispatch, getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get(`/catalog/search?q=${query}`, config)
    .then(res => {
      dispatch({type: SEARCH_BOOK_SUCCEED});
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        dispatch({type: SEARCH_BOOK_FAILED});
        callBackFunc(error.response.data, error.response.status);
      } else {
        dispatch({type: SEARCH_BOOK_FAILED});
        callBackFunc(error.message, 404);

        // handle network error
      }
    });
};

export const getMyLibrary = callBackFunc => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('/catalog/user/library/', config)
    .then(res => {
      dispatch({type: FETCH_USER_LIBRARY_SUCCEED, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.status);
        dispatch({type: FETCH_USER_LIBRARY_FAILED});
      } else {
        dispatch({type: FETCH_USER_LIBRARY_FAILED});
        // handle network error
      }
    });
};

export const getAuthorProfile =
  (book_id, callBackFunc) => (dispatch, getState) => {
    const token = getState().auth.token;

    // dispatch()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    axios
      .get(`/api/v1/author/${book_id}/`, config)
      .then(res => {
        callBackFunc(res.data, res.status);
      })
      .catch(error => {
        if (error.response) {
          callBackFunc(error.response.data, error.response.status);
        } else {
          callBackFunc(error.message, 1010);
          // handle network error
        }
      });
  };

export const getLikeBooks = () => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('catalog/like/', config)
    .then(res => {
      dispatch({type: FETCH_USER_LIKE_BOOKS_SUCCEED, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        dispatch({type: FETCH_USER_LIKE_BOOKS_FAILED});
      } else {
        dispatch({type: FETCH_USER_LIKE_BOOKS_FAILED});
        // handle network error
      }
    });
};

export const likeBook =
  (book_id, callBackFunc = () => {}) =>
  (dispatch, getState) => {
    const token = getState().auth.token;

    // dispatch()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    axios
      .post(`/catalog/like/${book_id}/`, {}, config)
      .then(res => {
        dispatch({type: FETCH_USER_LIKE_BOOKS_SUCCEED, payload: res.data});
        callBackFunc(res.data, res.status);
      })
      .catch(error => {
        if (error.response) {
          dispatch({type: FETCH_USER_LIKE_BOOKS_FAILED});
          callBackFunc(error.response.data, error.response.status);
        } else {
          dispatch({type: FETCH_USER_LIKE_BOOKS_FAILED});

          callBackFunc(error.message, 1010);
          // handle network error
        }
      });
  };

export const readBook =
  (book_id, callBackFunc = () => {}) =>
  (dispatch, getState) => {
    const token = getState().auth.token;

    // dispatch()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    axios
      .get(`/catalog/read/${book_id}/`, config)
      .then(res => {
        dispatch({type: GET_READING_LIST, payload: res.data});
        callBackFunc(res.data, res.status);
      })
      .catch(error => {
        if (error.response) {
          callBackFunc(error.response.data, error.response.status);
        } else {
          callBackFunc(error.message, 1010);
          // handle network error
        }
      });
  };

export const startNewBook = (form, callBackFunc) => (dispatch, getState) => {
  dispatch({type: START_NEW_BOOK_LOADING});

  const token = getState().auth.token;

  const formData = new FormData();

  const genre_list = form.genre.map(item => {
    return item.id;
  });

  formData.append('book_cover', form.book_cover);
  formData.append('title', form.title);
  formData.append('book_summary', form.description);
  formData.append('genre', genre_list.toString());

  const config = {
    method: 'POST',
    url: '/catalog/user-book',
    responseType: 'json',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data, headers) => {
      // !!! override data to return formData
      // since axios converts that to string
      return formData;
    },

    data: formData,
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .request(config)
    .then(res => {
      callBackFunc(res.data, 200);
      dispatch({type: START_NEW_BOOK_SUCCEED, payload: res.data});
    })
    .catch(error => {
      callBackFunc('error', 400);
      dispatch({type: START_NEW_BOOK_FAILED});
    });
};

export const getUserBooks = () => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('catalog/user-book', config)
    .then(res => {
      dispatch({type: FETCH_USER_BOOKS, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        //
      } else {
        //
        // handle network error
      }
    });
};

export const getBookContent =
  (book_id, callBackFunc) => (dispatch, getState) => {
    const token = getState().auth.token;

    // dispatch()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    axios
      .get(`catalog/content/${book_id}`, config)
      .then(res => {
        callBackFunc(res.data, res.status);
      })
      .catch(error => {
        if (error.response) {
          callBackFunc(error.response.data, error.response.status);
        } else {
          //
          // handle network error
        }
      });
  };

export const addBookContent = (data, callBackFunc) => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .post('catalog/content', JSON.stringify(data), config)
    .then(res => {
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        callBackFunc(error.response.data, error.response.status);
      } else {
        //
        // handle network error
      }
    });
};

export const editBookContent = (data, callBackFunc) => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .put(`catalog/content/${data.id}/`, JSON.stringify(data), config)
    .then(res => {
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        callBackFunc(error.response.data, error.response.status);
      } else {
        //
        // handle network error
      }
    });
};

export const publishBook = (data, callBackFunc) => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .post('catalog/publish', JSON.stringify(data), config)
    .then(res => {
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        callBackFunc(error.response.data, error.response.status);
      } else {
        //
        // handle network error
      }
    });
};

export const getBookGenre = callBackFunc => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('catalog/genre', config)
    .then(res => {
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        callBackFunc(error.response.data, error.response.status);
      } else {
        //
        // handle network error
      }
    });
};

export const updateBookType = (data, callBackFunc) => (dispatch, getState) => {
  const token = getState().auth.token;

  // dispatch()
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .post('catalog/update-book-type', JSON.stringify(data), config)
    .then(res => {
      callBackFunc(res.data, res.status);
      dispatch({type: UPDATE_USER_BOOKS, payload: res.data});
    })
    .catch(error => {
      if (error.response) {
        callBackFunc(error.response.data, error.response.status);
      } else {
        //
        // handle network error
      }
    });
};

export const uploadBook = (form, callBackFunc) => (dispatch, getState) => {
  const token = getState().auth.token;

  const formData = new FormData();

  formData.append('user_book_id', form.user_book_id);
  formData.append('book_pdf', {
    uri: form.book_pdf.fileCopyUri,
    type: form.book_pdf.type,
    name: form.book_pdf.name,
  });

  const config = {
    method: 'POST',
    url: '/catalog/upload-pdf',
    responseType: 'json',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data, headers) => {
      // !!! override data to return formData
      // since axios converts that to string
      return formData;
    },

    data: formData,
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  console.log(formData);

  axios
    .request(config)
    .then(res => {
      callBackFunc(res.data, res.status);
    })
    .catch(error => {
      if (error.response) {
        error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      console.log(error.config);
    });
};
