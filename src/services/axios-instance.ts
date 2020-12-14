import axios from 'axios';

import Config from 'src/config';
import Route from '../constants/routes';
import { redirect } from 'src/utils/redirect-path-to';
import { httpConstants } from '../constants/http-constants';
import { clearTokens, refreshAccessToken, getAccessToken, getTenantName } from './auth';

const axiosInstance = (config: any) => axios.create(config);

export const RecovoHttp = axiosInstance({
  timeout: Config.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const RecovoHttpWithoutToken = axios.create({
  baseURL: Config.baseURL,
  timeout: Config.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

RecovoHttp.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;

    const tenant = getTenantName();
    if (tenant) {
      config.baseURL = `${Config.baseURL}/tenant/${tenant}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

RecovoHttp.interceptors.response.use(
  /**
   * Leave response as it is for a success response.
   *
   * @param {any} response
   */
  (response) => response,
  /**
   * This interceptor checks if the response had a 401 status code, which means
   * that the access token used for the request has expired. It then refreshes
   * the access token and resends the original request.
   */
  unauthorizedResponseHandlerInterceptor
);

/**
 * Interceptor to catch the unauthorized responses and refresh the access token.
 *
 * @param {any} err
 */
export async function unauthorizedResponseHandlerInterceptor(err: any) {
  const originalRequest = err.config;
  const code = err.response && err.response.status;

  // If the request is a retry request, simply clear the tokens.
  if (originalRequest['__isRetryRequest']) {
    clearTokens();

    return Promise.reject(err);
  }

  if (code === httpConstants.statusCode.UNAUTHORIZED) {
    originalRequest.__isRetryRequest = true;

    try {
      const accessToken = await refreshAccessToken();

      const newRequest = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          [httpConstants.authorizationHeader]: `Bearer ${accessToken}`,
        },
      };

      return RecovoHttp(newRequest);
    } catch (error) {
      redirect(Route.ROOT);
      clearTokens();
    }
  }

  return Promise.reject(err);
}
