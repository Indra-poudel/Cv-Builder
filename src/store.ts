import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const enhancers = [applyMiddleware(thunk, promise)];

const store = createStore(rootReducer, composeWithDevTools(...enhancers));

export default store;
