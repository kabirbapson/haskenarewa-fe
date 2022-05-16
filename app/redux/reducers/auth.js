import {
  SET_TOKEN,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  USER_LOGOUT,
  SET_TOKEN_FAILED,
  USER_RESTORING,
  VERIFICATION_SEND_SUCCESS,
  VERIFICATION_SEND_FAILED,
  GET_USER_FOLLOW,
  FOLLOW_USER,
  UN_FOLLOW_USER,
} from '../constants/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

async function storeUserSession(token) {
  try {
    await EncryptedStorage.setItem('user_token', token);

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

async function removeUserSession() {
  try {
    await EncryptedStorage.removeItem('user_token');
  } catch (error) {}
}

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isRestoring: false,
  user: null,
  follow: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_TOKEN_FAILED:
      return {
        ...state,
        isRestoring: false,
      };
    case USER_RESTORING:
      return {
        ...state,
        isRestoring: true,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FOLLOW_USER:
    case UN_FOLLOW_USER:
    case GET_USER_FOLLOW:
      return {
        ...state,
        follow: action.payload,
      };
    case VERIFICATION_SEND_SUCCESS:
    case VERIFICATION_SEND_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isRestoring: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      storeUserSession(action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isRestoring: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case USER_LOGOUT:
      removeUserSession();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
