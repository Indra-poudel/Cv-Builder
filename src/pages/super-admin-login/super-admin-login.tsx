import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import Config from 'src/config';
import Route from 'src/constants/routes';
import { logo } from 'src/assets/images';
import { RootState } from 'src/reducers';
import { getRole } from 'src/utils/role';
import { FcGoogle } from 'react-icons/fc';
import { loading } from 'src/assets/images';
import { USER_ROLE } from 'src/constants/users';
import * as googleLoginService from 'src/services/google-login';
import * as superAdminLoginActions from './super-admin-login.action';

interface LoginState {
  isLogging: boolean;
  isLoginFail: boolean;
  isLoginSuccess: boolean;
  errorMessage: string;
  login: (payload: GoogleLoginResponse | GoogleLoginResponseOffline) => Promise<void>;
}

const SuperAdminLogin = (props: LoginState) => {
  const [isGoogleLoginError, setGoogleLoginError] = React.useState<boolean>(false);

  const { isLogging, isLoginFail, login } = props;

  const { t } = useTranslation();

  const googleClientId = googleLoginService.getGoogleClientId();

  const onLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => login(response);

  const ContinueWithGoogle = () => (
    <div className="tile__header tile__header--card">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <span className="login-title"> {t('loginPage.signInInfoSuperAdmin')}</span>
      <GoogleLogin
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled || props.isLogging}
            className="btn btn--with-icon btn--outlined-white btn--shadowed-grey btn--block"
            type="button">
            {isLogging && <img src={loading} alt="loading" width={20} />}
            <FcGoogle className="mx-2x"></FcGoogle>
            {props.isLogging ? t('loginPage.signingLabel') : t('loginPage.loginBtnLabel')}
          </button>
        )}
        clientId={googleClientId}
        prompt="select_account"
        onSuccess={onLoginSuccess}
        onFailure={() => setGoogleLoginError(true)}
        cookiePolicy={Config.googleCookiePolicy}
      />
      {(isLoginFail || isGoogleLoginError) && (
        <p className="login__fail"> {props.errorMessage || t('loginPage.loginFailError')}</p>
      )}
    </div>
  );

  if (getRole() === USER_ROLE.SUPER_ADMIN) return <Redirect to={Route.SUPER_ADMIN_CLIENT} />;

  return (
    <div>
      <div className="container tile-container">
        <div className="tile">
          <ContinueWithGoogle />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoginFail: state.superAdminLogin.isLoginFail,
  isLogging: state.superAdminLogin.isLogging,
  errorMessage: state.superAdminLogin.errorMessage,
});

const mapDispatchToProps = (dispatch: Function) => ({
  login: (payload: GoogleLoginResponse | GoogleLoginResponseOffline) =>
    dispatch(superAdminLoginActions.superAdminGoogleLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminLogin);
