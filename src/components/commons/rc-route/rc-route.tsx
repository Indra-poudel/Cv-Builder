import React from 'react';
import { Route } from 'react-router-dom';

import routes from 'src/constants/routes';
import AccessControl from 'src/components/access-control';

interface IProps {
  allowedRoles: string[];
  [key: string]: any;
}

const RcRoute = (props: IProps) => {
  const { allowedRoles, ...otherProps } = props;

  return (
    <AccessControl allowedRoles={allowedRoles} redirectRoute={routes.PAGE_NOT_FOUND}>
      <Route {...otherProps} />
    </AccessControl>
  );
};

export default RcRoute;
