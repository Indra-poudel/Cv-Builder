import { Provider } from 'react-redux';
import React, { Suspense } from 'react';

import './public';
import store from './store';
import Router from './router';

const App: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <Router />
      </Provider>
    </Suspense>
  );
};

export default App;
