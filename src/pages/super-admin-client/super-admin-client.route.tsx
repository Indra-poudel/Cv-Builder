import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'src/constants/routes';
import ClientDetails from 'src/pages/client-details';
import SuperAdminClient from './super-admin-client.container';

const ClientRoute = () => {
  return (
    <Switch>
      <Route exact path={routes.SUPER_ADMIN_CLIENT} component={SuperAdminClient} />
      <Route path={routes.SUPER_ADMIN_CLIENT_DETAILS} component={ClientDetails} />
    </Switch>
  );
};

export default ClientRoute;
