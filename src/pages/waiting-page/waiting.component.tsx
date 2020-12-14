import React from 'react';
import { useTranslation } from 'react-i18next';

import { logo, waitingPage } from 'src/assets/images';

const WaitingPageUI = () => {
  const { t } = useTranslation(['waiting-page']);

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
        <div className="container empty-page">
          <div className="content-center">
            <div className="content-empty">
              <div className="content-empty__image">
                <img src={waitingPage} alt="waiting" />
              </div>
              <h1>{t('waitingPage.title')}</h1>
              <div className="content-empty__text--sm">
                <p className="mt-6x mb-6x">{t('waitingPage.description1')}</p>
                <p>{t('waitingPage.description2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WaitingPageUI;
