import React from 'react';

const PageContainer: React.FC = (props: any) => {
  return <div className="container">{props.children}</div>;
};

export default PageContainer;
