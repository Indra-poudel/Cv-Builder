import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { MdError } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/reducers';
import { logo } from 'src/assets/images';
import Route from 'src/constants/routes';
import { isObjectEmpty } from 'src/utils/object';
import LoadingIndicator from 'src/components/loading-indicator';
import * as emailVerificationAction from './email-verification.action';

const EmailVerification: React.FC<any> = (props: any) => {
  const { fetchVerifiedUserDetails, verifiedUserDetails } = props;
  const { tokenId, schemaName } = props.match.params;

  const { t } = useTranslation();

  useEffect(() => {
    fetchVerifiedUserDetails(tokenId, schemaName);
  }, []);

  if (!isObjectEmpty(verifiedUserDetails) && !verifiedUserDetails.isVerifiedUser) {
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
                <h1>{t('signUpPage.linkExpired')} </h1>
                {t('signUpPage.linkExpiredMessage')}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (verifiedUserDetails.isVerifiedUser) {
    return <Redirect to={Route.SIGN_UP} />;
  }

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
              <LoadingIndicator />
              <h1>{t('signUpPage.validationTitle')} </h1>
              {t('signUpPage.validationMessage')}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state: RootState) {
  return {
    verifiedUserDetails: state.emailVerifiedUser.verfiedUserDetails,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchVerifiedUserDetails: (tokenId: string, schemaName: string) => {
      dispatch(emailVerificationAction.fetchVerifiedUserDetails(tokenId, schemaName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
