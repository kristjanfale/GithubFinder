// Actions(fetch data, search users, request to github,...) go in this file
import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
// Types
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

// Check environment
if (process.env.NODE_ENV !== 'production') {
  // If we are not in production
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  // If we are in production
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// Create initial state
const GithubState = props => {
  // This is global state for anything that has to do with github
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  // After we call an action, we dispatch an object, that has a type, back to a reducer (GithubReducer)
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const response = await fetch(
      `https://api.github.com/search/users?q=${text}&client_io=${githubClientId}&client_secret=${githubClientSecret}`
    );
    const data = await response.json();

    dispatch({
      type: SEARCH_USERS,
      payload: data.items
    }); // After we call an action, we dispatch an object, that has a type (and payload with data), back to a reducer (GithubReducer)
  };

  // Get Single User
  const getSingleUser = async username => {
    setLoading();

    const response = await fetch(
      `https://api.github.com/users/${username}?client_io=${githubClientId}&client_secret=${githubClientSecret}`
    );
    const data = await response.json();

    dispatch({
      type: GET_USER,
      payload: data
    });
  };

  // Get Repos
  const getUserRepos = async username => {
    setLoading();

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:ascc&client_io=${githubClientId}&client_secret=${githubClientSecret}`
    );
    const data = await response.json();

    dispatch({
      type: GET_REPOS,
      payload: data
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING }); // After we call an action, we dispatch an object, that has a type (and payload with data), back to a reducer (GithubReducer)

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getSingleUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
