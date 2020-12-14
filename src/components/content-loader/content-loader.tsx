import React from 'react';
import ContentLoader from 'react-content-loader';

const ContentLoadIndicator = () => (
  <ContentLoader>
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="15" />
    <rect x="0" y="30" rx="5" ry="5" width="100%" height="15" />
  </ContentLoader>
);

export default ContentLoadIndicator;
