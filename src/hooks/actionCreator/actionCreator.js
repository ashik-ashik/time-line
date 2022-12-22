import { BOOKS_LOAD, ERROR, LOADIG, POST_LOAD } from "../actionTypes/actionTypes";

export const loadPosts = posts => {
  return {
    type: POST_LOAD,
    payload: posts
  }
};
export const loadBooks = books => {
  return {
    type: BOOKS_LOAD,
    payload: books
  }
};
export const loading = () => {
  return {
    type: LOADIG,
  }
};
export const error = errMg => {
  return {
    type: ERROR,
    payload: errMg
  }
};