import axios from 'axios';

import Config from 'src/config';
import * as storageUtil from 'src/utils/storage';
import * as tokens from 'src/constants/constants';
import * as endpoints from 'src/constants/endpoints';

const axiosInstance = axios.create({
  baseURL: Config.baseURL,
  timeout: Config.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Refresh the access token using the refresh token.
 */
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw Error("Refresh Token isn't set yet");
  }

  const response = await axiosInstance.post('/auth/refresh', { refreshToken });
  const newAccessToken = response.data.data;

  saveAccessToken(newAccessToken);

  return newAccessToken;
};

/**
 * Save access token in the local storage.
 *
 * @param {string} accessToken
 */
export const saveAccessToken = (accessToken: string) => {
  storageUtil.set(tokens.ACCESS_TOKEN, accessToken);
};

/**
 * Save refresh token in the local storage.
 *
 * @param {string} accessToken
 */
export const saveRefreshToken = (refreshToken: string) => {
  storageUtil.set(tokens.REFRESH_TOKEN, refreshToken);
};

/**
 * Save Role in the local storage.
 *
 * @param {string} role
 */
export const saveRole = (role: string) => {
  storageUtil.set(tokens.ROLE, role);
};

/**
 * Save Tenant Name in the local storage.
 *
 * @param {string} tenantName
 */
export const saveTenantName = (tenantName: string) => {
  storageUtil.set(tokens.TENANT_NAME, tenantName);
};

/**
 * get refresh token from the local storage.
 *
 */
export const getRefreshToken = () => {
  return storageUtil.get(tokens.REFRESH_TOKEN);
};

/**
 * get access token from the local storage.
 *
 */
export const getAccessToken = () => {
  return storageUtil.get(tokens.ACCESS_TOKEN);
};

/**
 * get Role from the local storage.
 *
 */
export const getRole = () => {
  return storageUtil.get(tokens.ROLE);
};

/**
 * get Tenant Name from the local storage.
 *
 */
export const getTenantName = () => {
  return storageUtil.get(tokens.TENANT_NAME);
};

/**
 * Clear the tokens saved in the local storage.
 */
export const clearTokens = () => {
  storageUtil.remove(tokens.REFRESH_TOKEN);
  storageUtil.remove(tokens.ACCESS_TOKEN);
  storageUtil.remove(tokens.ROLE);
  storageUtil.remove(tokens.TENANT_NAME);
};

/**
 * @returns response from logout
 */
export const logOut = async () => {
  const URL = endpoints.LOGOUT;
  const requestBody = {
    refreshToken: getRefreshToken(),
  };
  const response = await axiosInstance.post(URL, requestBody);
  localStorage.clear();

  return response;
};
