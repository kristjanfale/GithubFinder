// Actions(fetch data, search users, request to Alert,...) go in this file
import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

// Create initial state
const AlertState = props => {
  const initialState = null; // Instead of doing { alert: null }

  // After we call an action, we dispatch an object, that has a type, back to a reducer (AlertReducer)
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set alert
  const setAlert = (msg, style) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, style }
    });
    // Delete alert after 4sec
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT
      });
    }, 4000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
