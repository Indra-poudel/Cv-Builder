import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdPerson, MdSettings } from 'react-icons/md';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getRole } from 'src/utils/role';
import routes from 'src/constants/routes';
import { USER_ROLE } from 'src/constants/users';
import RcRoute from 'src/components/commons/rc-route/rc-route';
import AccountProfile from '../account-profile/account-profile';
import AccountSettings from '../account-settings/account-settings';

export function accountRouteBuilder(translate: Function) {
  return {
    [routes.ACCOUNT_SETTINGS]: {
      key: routes.ACCOUNT_SETTINGS,
      redirectTo: routes.ACCOUNT_SETTINGS,
      routeIcon: () => <MdSettings className="mr-2x" />,
      displayName: translate('account-page:sideMenu.setting'),
      allowedRoles: [USER_ROLE.ADMIN],
      component: AccountSettings,
    },
    [routes.ACCOUNT_PROFILE]: {
      key: routes.ACCOUNT_PROFILE,
      redirectTo: routes.ACCOUNT_PROFILE,
      routeIcon: () => <MdPerson className="mr-2x" />,
      displayName: translate('account-page:sideMenu.myProfile'),
      allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.SUPERVISOR, USER_ROLE.USER],
      component: AccountProfile,
    },
  };
}

const AccountRouter = () => {
  const { t } = useTranslation();

  const accountRoutes = accountRouteBuilder(t);

  const redirectTo = getRole() === USER_ROLE.ADMIN ? routes.ACCOUNT_SETTINGS : routes.ACCOUNT_PROFILE;

  return (
    <Switch>
      <Route exact path={routes.ACCOUNT} component={() => <Redirect to={redirectTo} />} />
      {Object.values(accountRoutes).map((route) => (
        <RcRoute
          key={route.redirectTo}
          allowedRoles={route.allowedRoles}
          path={route.redirectTo}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default AccountRouter;
