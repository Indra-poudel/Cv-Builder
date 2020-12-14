const {
  REACT_APP_BASE_URL,
  REACT_APP_GOOGLE_LOGIN_COOKIE_POLICY,
  REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  REACT_APP_SENTRY_DNS,
  REACT_APP_SENTRY_ENVIRONMENT,
} = process.env;

export default {
  sentryEnvironment: REACT_APP_SENTRY_ENVIRONMENT,
  sentryDns: REACT_APP_SENTRY_DNS,
  baseURL: REACT_APP_BASE_URL,
  googleOauthClientId: REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  googleCookiePolicy: REACT_APP_GOOGLE_LOGIN_COOKIE_POLICY,
  timeout: 0,
  // Number of items loaded at a time during infinite loading
  listSize: 20,
};
