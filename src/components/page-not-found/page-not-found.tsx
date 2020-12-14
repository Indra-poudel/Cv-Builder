import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from 'src/constants/routes';
import { notFoundImage } from 'src/assets/images';

interface Props {
  redirectTo?: string;
}

const PageNotFound: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation(['not-found-page']);

  return (
    <React.Fragment>
      <div className="content-wrap mt-8x">
        <div className="container empty-page">
          <div className="content-center">
            <div className="content-empty">
              <div className="content-empty__image">
                <img src={notFoundImage} alt="waiting" />
              </div>
              <h1>{t('notFoundPage.title')}</h1>
              <div className="content-empty__text--sm">
                <p className="mt-6x mb-6x">
                  {t('notFoundPage.description1')}
                  <br />
                  <span>
                    {t('notFoundPage.description2')}
                    <Link to={props.redirectTo || routes.SEARCH}>{t('notFoundPage.home')}</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
