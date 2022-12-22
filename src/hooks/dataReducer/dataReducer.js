import { BOOKS_LOAD, ERROR, LOADIG, POST_LOAD } from "../actionTypes/actionTypes";

export const initialState = {
  posts: [],
  books: [],
  member: {},
  passwords: [],
  loading: false,
  error:''
};

export const dataReducer = (state = initialState, action) => {
  switch(action.type){
    case LOADIG:
      return {
        ...state,
        loading: true
      };
      case ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case POST_LOAD:
          return{
            ...state,
            posts:[...action.payload],
            loading: false,
          };
          case BOOKS_LOAD:
            return {
              ...state,
              books: [...action.payload]
            }
    default:
      return state;
  }
}