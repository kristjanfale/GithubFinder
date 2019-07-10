// Reducer - function that decides what is going to happen to the state, based on the action
// Types
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

export default (state, action) => {
  // We want to evaluate the type
  switch (action.type) {
    case SET_LOADING:
      // we want to return whatever is already in the state. So make a copy of it, and add any changes to it.
      return {
        ...state,
        loading: true
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
