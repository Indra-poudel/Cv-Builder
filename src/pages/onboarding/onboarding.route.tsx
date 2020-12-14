import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { getRole } from 'src/utils/role';
import routes from 'src/constants/routes';
import { USER_ROLE } from 'src/constants/users';
import AwaitingPage from 'src/pages/waiting-page';
import DomainUpload from 'src/pages/domain-upload';
import PageNotFound from 'src/components/page-not-found';
import OrganizationSetup from 'src/pages/organization-setup';
import EnvironmentSetup from 'src/pages/organization-environment-setup';

const OnboardingRoute = () => {
  if (getRole() !== USER_ROLE.ADMIN) {
    return <Redirect to={routes.ROOT} />;
  }

  return (
    <Switch>
      <Route path={routes.ORGANIZATION_SETUP} component={OrganizationSetup} />
      <Route path={routes.COMPANY_ADMIN_ENVIRONMENT} component={EnvironmentSetup} />
      <Route path={routes.COMPANY_ADMIN_DOMAIN_UPLOAD} component={DomainUpload} />
      <Route path={routes.COMPANY_ADMIN_WAITING_PAGE} component={AwaitingPage} />
      <Route path={routes.PAGE_NOT_FOUND} component={PageNotFound} />
    </Switch>
  );
};

export default OnboardingRoute;
