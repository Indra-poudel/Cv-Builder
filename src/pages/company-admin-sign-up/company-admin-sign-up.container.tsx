import React from 'react';
import { connect } from 'react-redux';
import { MdError } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { logo } from 'src/assets/images';
import Route from 'src/constants/routes';
import { RootState } from 'src/reducers';
import { formatEmailWithAsterisk } from 'src/utils/string';
import * as googleLoginService from 'src/services/google-login';
import CompanyAdminSignUpUI from './company-admin-sign-up.component';
import * as companyAdminLoginActions from '../company-admin-login/company-admin-login.actions';

const CompanyAdminSignUp: React.FC = (props: any) => {
  const history = useHistory();
  const { verifiedUserDetails, login, setLoginState } = props;

  const { t } = useTranslation();

  const googleClientId = googleLoginService.getGoogleClientId();

  const onLoginSuccess = async (response: any) => {
    const loginResponse = await googleLoginService.googleLogin(response);
    if (loginResponse) {
      history.push(Route.ROOT);
    } else {
      setLoginState({
        isLoginError: true,
      });
    }
  };

  const onLoginFail = () => {
    setLoginState({
      isLoginError: true,
    });
  };

  if (verifiedUserDetails.isVerifiedUser) {
    return (
      <CompanyAdminSignUpUI
        email={formatEmailWithAsterisk(verifiedUserDetails.email)}
        googleClientId={googleClientId}
        onLoginSuccess={onLoginSuccess}
        onLoginFail={onLoginFail}
        isLoginError={login.isLoginFail}
      />
    );
  } else {
    return (
      <React.Fragment>
        <nav className="navbar navbar--bordered-bottom">
          <div className="container">
            <div className="navbar__wrap navbar__wrap--content-spread">
              <div className="navbar__left">
                <div className="navbar__logo">
                  <img src={logo} alt="logo" />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="content-wrap mt-8x">
          <div className="container">
            <div className="d-flex align-items-center  flex-column">
              <div className="card card--elevated upload_domain__card p-10x">
                <MdError size={80} style={{ color: '#F82B60' }} />
                <h1>{t('signUpPage.invitationOnlyTitle')}</h1>
                {t('signUpPage.invitationOnlyMessage')}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  verifiedUserDetails: state.emailVerifiedUser.verfiedUserDetails,
  login: state.login,
});

const mapDispatchToProps = (dispatch: Function) => ({
  setLoginState: (payload: GoogleLoginResponse | GoogleLoginResponseOffline) =>
    dispatch(companyAdminLoginActions.googleLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAdminSignUp);
