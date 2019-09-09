import { ActionTypes } from './actions';
import { combineReducers } from 'redux';

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return state.concat(action.payload);
    case ActionTypes.UPDATE_MESSAGE:
      return state;
    case ActionTypes.INIT_MESSAGES_BOARD:
      return action.payload;

    default:
      return state;
  }
};

const initReducer = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.INIT_DONE:
      return true;
    default:
      return state;
  }
};
export default combineReducers({ messages: messagesReducer , isInitialized: initReducer});
