import React from 'react';
import { connect } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import Config from 'src/config';
import Route from 'src/constants/routes';
import { logo } from 'src/assets/images';
import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import { loading } from 'src/assets/images';
import * as tokenService from 'src/services/access-token';
import * as googleLoginService from 'src/services/google-login';
import * as companyAdminLoginActions from './company-admin-login.actions';

interface LoginState {
  isLogging: boolean;
  errorMessage: string;
  isLoginFail: boolean;
  isLoginSuccess: boolean;
  login: (payload: GoogleLoginResponse | GoogleLoginResponseOffline) => Promise<void>;
}

const CompanyAdminLogin = (props: LoginState) => {
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
      <span className="login-title"> {t('loginPage.signInInfo')}</span>
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
        <p className="login__fail">{props.errorMessage || t('loginPage.loginFailError')}</p>
      )}
    </div>
  );

  if (tokenService.isAccessTokenAndRoleValid()) return <Redirect to={Route.ROOT} />;

  return (
    <div>
      <div className="container tile-container">
        <div className="tile">
          <ContinueWithGoogle />
          <div className="d-flex justify-content-center">
            <NavLink to={routes.SUPER_ADMIN_LOGIN} className="nav__link text-small">
              {t('loginPage.loginAsSuperAdmin')}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLogging: state.login.isLogging,
  isLoginFail: state.login.isLoginFail,
  errorMessage: state.login.errorMessage,
});

const mapDispatchToProps = (dispatch: Function) => ({
  login: (payload: GoogleLoginResponse | GoogleLoginResponseOffline) =>
    dispatch(companyAdminLoginActions.googleLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAdminLogin);
