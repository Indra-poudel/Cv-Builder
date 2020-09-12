import { combineReducers } from 'redux';
import * as homeActions from './home.actions';

const initialState = {
  count: 0,
};

const countReducer = (state = initialState.count, action: homeActions.CountActionTypes) => {
  switch (action.type) {
    case homeActions.INCREMENT_COUNT:
      return state + 1;

    case homeActions.DECREMENT_COUNT:
      return state - 1;

    default:
      return state;
  }
};

export default combineReducers({
  count: countReducer,
});
