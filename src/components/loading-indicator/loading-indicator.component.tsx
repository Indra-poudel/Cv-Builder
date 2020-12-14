import React from 'react';
import { useTranslation } from 'react-i18next';

import { loading } from 'src/assets/images';

interface StateProps {
  loadingTitle?: string;
  width?: number;
}

const LoadingIndicator = (props: StateProps) => {
  const { t } = useTranslation();
  const loadingTitle = props.loadingTitle || t('loadingIndicator.titleIndicator');

  return (
    <div className="content-wrap loading-container mt-6x">
      <div className="loading">
        <img src={loading} alt="loading" title={loadingTitle} width={props.width} />
      </div>
    </div>
  );
};

LoadingIndicator.defaultProps = {
  width: 150,
};

export default LoadingIndicator;
