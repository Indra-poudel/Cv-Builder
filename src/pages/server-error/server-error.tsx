import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from 'src/constants/routes';
import { logo, serverErrorImage } from 'src/assets/images';

interface Props {
  disableHeader?: boolean;
}

const ServerError = (props: Props) => {
  const { t } = useTranslation(['server-error-page']);

  return (
    <React.Fragment>
      {!props.disableHeader && (
        <nav className="navbar navbar--bordered-bottom">
          <div className="container">
            <div className="navbar__wrap navbar__wrap--content-spread">
              <div className="navbar__left">
                <div className="navbar__logo">
                  <Link to={routes.SEARCH}>
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      <div className="content-wrap mt-8x">
        <div className="container empty-page">
          <div className="content-center">
            <div className="content-empty">
              <div className="content-empty__image">
                <img src={serverErrorImage} alt="waiting" />
              </div>
              <h1>{t('serverErrorPage.title')}</h1>
              <div className="content-empty__text--sm">
                <p className="mt-6x mb-6x">
                  {t('serverErrorPage.description1')}
                  <br />
                  <span>{t('serverErrorPage.description2')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServerError;
