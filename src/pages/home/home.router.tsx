import React from 'react';
import { TFunction } from 'i18next';
import { GoGraph } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MdBusiness, MdPeople, MdPerson, MdSearch } from 'react-icons/md';

import { getRole } from 'src/utils/role';
import routes from 'src/constants/routes';
import AccountPage from 'src/pages/account';
import { USER_ROLE } from 'src/constants/users';
import UsageReportPage from 'src/pages/usage-report';
import EmailActivity from 'src/pages/email-activity';
import PageNotFound from 'src/components/page-not-found';
import ContactSearchPage from 'src/pages/contact-search';
import UserManagementPage from 'src/pages/user-management';
import RcRoute from 'src/components/commons/rc-route/rc-route';
import SuperAdminClientPage from 'src/pages/super-admin-client';

interface routeBuilderProps {
  resetUsageFilter?: () => void;
  resetContact?: () => void;
  resetUserFilter?: () => void;
  translate: TFunction;
}

export function routeBuilder(props: routeBuilderProps) {
  return {
    [routes.SUPER_ADMIN_CLIENT]: {
      key: routes.SUPER_ADMIN_CLIENT,
      redirectTo: routes.SUPER_ADMIN_CLIENT,
      routeIcon: () => <MdBusiness />,
      displayName: props.translate('navbar.routes.clientLabel'),
      allowedRoles: [USER_ROLE.SUPER_ADMIN],
      component: SuperAdminClientPage,
      isVisible: true,
    },
    [routes.SEARCH]: {
      onClick: props.resetContact,
      isVisible: true,
      redirectTo: routes.SEARCH,
      component: ContactSearchPage,
      routeIcon: () => <MdSearch />,
      displayName: props.translate('navbar.routes.searchLabel'),
      allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.SUPERVISOR, USER_ROLE.USER],
    },
    [routes.EMAIL_ACTIVITY]: {
      isVisible: false,
      component: EmailActivity,
      redirectTo: routes.EMAIL_ACTIVITY,
      allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.SUPERVISOR, USER_ROLE.USER],
    },
    [routes.USAGE]: {
      onClick: props.resetUsageFilter,
      isVisible: true,
      component: UsageReportPage,
      redirectTo: routes.USAGE,
      routeIcon: () => <GoGraph />,
      displayName: props.translate('navbar.routes.usageLabel'),
      allowedRoles: [USER_ROLE.ADMIN],
    },
    [routes.USERS]: {
      onClick: props.resetUserFilter,
      isVisible: true,
      component: UserManagementPage,
      redirectTo: routes.USERS,
      routeIcon: () => <MdPeople />,
      displayName: props.translate('navbar.routes.usersLabel'),
      allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.SUPERVISOR],
    },
    [routes.ACCOUNT]: {
      isVisible: true,
      component: AccountPage,
      redirectTo: routes.ACCOUNT,
      routeIcon: () => <MdPerson />,
      displayName: props.translate('navbar.routes.accountLabel'),
      allowedRoles: [USER_ROLE.ADMIN, USER_ROLE.SUPERVISOR, USER_ROLE.USER],
    },
  };
}

const HomeRouter = () => {
  const { t } = useTranslation();

  const homeRoutes = routeBuilder({
    translate: t,
  });

  const redirectTo = getRole() === USER_ROLE.SUPER_ADMIN ? routes.SUPER_ADMIN_CLIENT : routes.SEARCH;

  return (
    <Switch>
      <Route exact path={routes.ROOT} component={() => <Redirect to={redirectTo} />} />
      {Object.values(homeRoutes).map((route) => (
        <RcRoute
          key={route.redirectTo}
          allowedRoles={route.allowedRoles}
          path={route.redirectTo}
          component={route.component}
        />
      ))}
      <Route path={routes.PAGE_NOT_FOUND} component={PageNotFound} />
    </Switch>
  );
};

export default HomeRouter;
