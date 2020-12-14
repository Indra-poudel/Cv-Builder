import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdErrorOutline } from 'react-icons/md';

interface SearchEmptyState {
  title: string;
  description: string;
}

const SearchEmpty = (props: SearchEmptyState) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container empty-page mt-8x">
        <div className="content-empty">
          <div className="content-empty__icon">
            <MdErrorOutline size={86} />
          </div>
          <h1>{props.title}</h1>
          <div className="content-empty__text content-empty__text--dark mb-12x">
            <p>{props.description}</p>
            <p> {t('contactSearch.searchEmpty.description2')}</p>
            <br />
            <p>{t('contactSearch.searchEmpty.description3')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchEmpty;
