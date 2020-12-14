import React from 'react';
import { useTranslation } from 'react-i18next';

import { searchStart } from 'src/assets/images';

const SearchStart = () => {
  const { t } = useTranslation();

  return (
    <div className="container empty-page">
      <div className="content-empty">
        <div className="content-empty__image">
          <img src={searchStart} alt="search start" className="mix-blend-multiply" />
        </div>
        <div className="content-empty__text">
          <p>
            {t('contactSearch.searchStart.description1')}
            <br />
            {t('contactSearch.searchStart.description2')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchStart;
