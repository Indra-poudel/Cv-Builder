import * as loginAction from './company-admin-login.actions';

interface LoginState {
  isLogging: boolean;
  isLoginFail: boolean;
  errorMessage: string;
}

const initialState: LoginState = {
  isLogging: false,
  isLoginFail: false,
  errorMessage: '',
};

const loginReducer = (state = initialState, action: loginAction.GoogleLoginActionTypes): LoginState => {
  switch (action.type) {
    case loginAction.LOGGING:
      return {
        ...state,
        isLogging: true,
        isLoginFail: false,
        errorMessage: '',
      };
    case loginAction.LOGIN_SUCCESS:
      return {
        ...state,
        isLogging: false,
        isLoginFail: !action.payload.isSuccess,
      };
    case loginAction.LOGIN_FAIL:
      return {
        ...state,
        isLogging: false,
        isLoginFail: true,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default loginReducer;
