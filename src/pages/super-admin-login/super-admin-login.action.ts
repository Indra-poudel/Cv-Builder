import { Dispatch } from 'redux';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import * as googleLoginService from 'src/services/google-login';
import { clearTokens, saveAccessToken, saveRefreshToken } from 'src/services/auth';

export const LOGGING = '@@action/GOOGLE_LOGIN/SUPER_ADMIN_LOGIN_LOADER';
export const LOGIN_FAIL = '@@action/GOOGLE_LOGIN/SUPER_ADMIN_LOGIN_FAIL';
export const LOGIN_SUCCESS = '@@action/GOOGLE_LOGIN/SUPER_ADMIN_LOGIN_SUCCESS';

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
}

interface LoginFail {
  type: typeof LOGIN_FAIL;
  payload: {
    errorMessage: string;
  };
}

interface LoginLoader {
  type: typeof LOGGING;
}

export type GoogleLoginActionTypes = LoginFail | LoginLoader | LoginSuccess;

export const superAdminGoogleLogin = (payload: GoogleLoginResponse | GoogleLoginResponseOffline) => async (
  dispatch: Dispatch<GoogleLoginActionTypes>
): Promise<void> => {
  try {
    clearTokens();

    dispatch({
      type: LOGGING,
    });

    const response = await googleLoginService.superAdminGoogleLogin(payload);
    saveAccessToken(response.accessToken);
    saveRefreshToken(response.refreshToken);

    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (error) {
    const message = (error.response && error.response.data.message) || error.message;
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        errorMessage: message,
      },
    });
  }
};
