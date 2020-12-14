import { Dispatch } from 'redux';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import * as googleLoginService from 'src/services/google-login';

export const LOGGING = '@@action/GOOGLE_LOGIN/LOGIN_LOADER';
export const LOGIN_FAIL = '@@action/GOOGLE_LOGIN/LOGIN_FAIL';
export const LOGIN_SUCCESS = '@@action/GOOGLE_LOGIN/LOGIN_SUCCESS';

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    isSuccess: boolean;
  };
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

export const googleLogin = (payload: GoogleLoginResponse | GoogleLoginResponseOffline) => async (
  dispatch: Dispatch<GoogleLoginActionTypes>
): Promise<void> => {
  try {
    dispatch({
      type: LOGGING,
    });

    const response = await googleLoginService.googleLogin(payload);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        isSuccess: response,
      },
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
