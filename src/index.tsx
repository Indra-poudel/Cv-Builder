import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './app';
import config from 'src/config';
import './assets/sass/style.css';
import * as serviceWorker from './serviceWorker';
import { DEVELOPMENT_ENV } from './constants/constants';

/**
 * Sentry react setup info : https://sentry.io/onboarding/recovvo-inc/get-started/
 */
process.env.NODE_ENV !== DEVELOPMENT_ENV &&
  Sentry.init({
    dsn: config.sentryDns,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: config.sentryEnvironment,
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
