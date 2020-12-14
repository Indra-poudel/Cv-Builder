import React from 'react';

import { getRole } from 'src/utils/role';
import PageNotFound from '../page-not-found';

interface StateProps {
  children: React.ReactElement;
  allowedRoles: string[];
  redirectRoute?: string;
}

const AccessControl = (props: StateProps): React.ReactElement | null => {
  const { allowedRoles, children, redirectRoute } = props;

  if (!allowedRoles.includes(getRole())) return redirectRoute ? <PageNotFound /> : null;

  return children;
};

export default AccessControl;
