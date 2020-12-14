import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from 'src/constants/routes';
import UserDetails from 'src/pages/user-details';
import UserManagement from './user-management.container';

const UserRoute = () => {
  return (
    <Switch>
      <Route exact path={routes.USERS} component={UserManagement} />
      <Route path={routes.USER_DETAILS} component={UserDetails} />
    </Switch>
  );
};

export default UserRoute;
