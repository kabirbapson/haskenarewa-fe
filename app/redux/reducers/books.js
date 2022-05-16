import {
  FETCH_USER_BOOKS,
  FETCH_USER_LIBRARY_FAILED,
  FETCH_USER_LIBRARY_SUCCEED,
  FETCH_USER_LIKE_BOOKS_FAILED,
  FETCH_USER_LIKE_BOOKS_SUCCEED,
  GET_BOOKS,
  GET_BOOK_CONTENT,
  GET_READING_LIST,
  GET_SECTIONS,
  GET_TRENDING_BILLBOARD,
  SEARCH_BOOK_FAILED,
  SEARCH_BOOK_SUCCEED,
  UPDATE_USER_BOOKS,
} from '../constants/books';

const initialState = {
  recommended_books: [],
  section: [],
  book_content: [],
  reading_list: [],
  user_library: [],
  like_books: [],
  trending_books: [],
  user_books: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        recommended_books: action.payload,
      };
    case GET_SECTIONS:
      return {
        ...state,
        section: action.payload,
      };
    case GET_BOOK_CONTENT:
      return {
        ...state,
        book_content: [
          ...state.book_content,
          {id: action.payload[0].book, content: action.payload},
        ],
      };
    case GET_TRENDING_BILLBOARD:
      return {
        ...state,
        trending_books: action.payload,
      };
    case FETCH_USER_BOOKS:
      return {
        ...state,
        user_books: action.payload,
      };
    case UPDATE_USER_BOOKS:
      return {
        ...state,
        user_books: state.user_books.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case GET_READING_LIST:
      return {
        ...state,
        reading_list: action.payload,
      };
    case SEARCH_BOOK_SUCCEED:
      return {
        ...state,
      };
    case SEARCH_BOOK_FAILED:
      return {
        ...state,
      };
    case FETCH_USER_LIBRARY_SUCCEED:
      return {
        ...state,
        user_library: action.payload,
      };
    case FETCH_USER_LIBRARY_FAILED:
      return {
        ...state,
      };
    case FETCH_USER_LIKE_BOOKS_SUCCEED:
      return {
        ...state,
        like_books: action.payload,
      };
    case FETCH_USER_LIKE_BOOKS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}
