import * as superAdminLoginAction from './super-admin-login.action';

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

const superAdminLoginReducer = (
  state = initialState,
  action: superAdminLoginAction.GoogleLoginActionTypes
): LoginState => {
  switch (action.type) {
    case superAdminLoginAction.LOGGING:
      return {
        ...state,
        isLogging: true,
        isLoginFail: false,
        errorMessage: '',
      };
    case superAdminLoginAction.LOGIN_SUCCESS:
      return {
        ...state,
        isLogging: false,
        isLoginFail: false,
      };
    case superAdminLoginAction.LOGIN_FAIL:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLogging: false,
        isLoginFail: true,
      };
    default:
      return state;
  }
};

export default superAdminLoginReducer;
