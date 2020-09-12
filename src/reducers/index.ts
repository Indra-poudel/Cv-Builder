import store from 'src/store';
import { combineReducers } from 'redux';

import homeReducer from 'src/components/home/home.reducer';

const rootReducer = combineReducers({
  home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default rootReducer;
