import React from 'react';

import { logo } from 'src/assets/images';
import GoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';

const CompanyAdminSignUpUI: React.FC<any> = (props: any) => {
  const { isLoginError, email, googleClientId, onLoginSuccess, onLoginFail } = props;

  const { t } = useTranslation();

  return (
    <div>
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
          <div className="content-7x">
            <div className="content-heading">
              <h1>{t('signUpPage.greetingLabel')}</h1>
            </div>
            <div className="block-setup">
              <p className="fs-small-light">{t('signUpPage.instructionLabel')}</p>
              <p className="fs-small">
                {t('signUpPage.instructionOne')} <span className="link-cursor"> {email}</span>{' '}
                {t('signUpPage.instructionTwo')}
              </p>
              <GoogleLogin
                className="btn btn--with-icon btn--outlined-grey btn--shadowed-grey"
                clientId={googleClientId}
                buttonText={t('signUpPage.signUpBtnLabel')}
                onSuccess={onLoginSuccess}
                onFailure={onLoginFail}
              />
              {isLoginError ? <p className="login__fail"> {t('signUpPage.signUpFailError')}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAdminSignUpUI;
