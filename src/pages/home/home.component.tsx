import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { RootState } from 'src/reducers';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getRole } from 'src/utils/role';
import routes from 'src/constants/routes';
import { USER_ROLE } from 'src/constants/users';
import ServerError from 'src/pages/server-error/index';
import RcNavBar from 'src/components/commons/rc-navbar';
import HomeRouter, { routeBuilder } from './home.router';
import * as tokenService from 'src/services/access-token';
import { ONBOARDING_STEP } from 'src/constants/onboarding';
import LoadingIndicator from 'src/components/loading-indicator';
import * as onboardingAction from 'src/pages/onboarding/onboarding.action';
import * as usageReportAction from 'src/pages/usage-report/usage-report.action';
import * as contactSearchActions from 'src/pages/contact-search/contact-search.action';
import * as userManagementActions from 'src/pages/user-management/user-management.action';

const routeKeys = [routes.SEARCH, routes.USAGE, routes.USERS, routes.ACCOUNT, routes.SUPER_ADMIN_CLIENT];

interface StateProps {
  isResetUsageFilter: boolean;
  isLoading: boolean;
  isError: boolean;
  onboardingStep: string;
  fetchOnboardingStatus: () => void;
  resetContactList: () => void;
  resetUserFilter?: () => void;
  resetUsageFilter: (isResetUsageFilter: boolean) => void;
  location: {
    from: string;
  };
}

const Home = (props: StateProps) => {
  const { t } = useTranslation();

  const { onboardingStep, isLoading, isError, fetchOnboardingStatus } = props;

  useEffect(() => {
    if (tokenService.isAccessTokenAndRoleValid() && getRole() === USER_ROLE.ADMIN) {
      fetchOnboardingStatus();
    }
  }, [fetchOnboardingStatus]);

  if (!tokenService.isAccessTokenAndRoleValid())
    return (
      <Redirect
        to={{
          pathname: routes.LOGIN,
          state: { from: props.location.from },
        }}
      />
    );

  const resetUsageFilter = () => {
    props.resetUsageFilter(!props.isResetUsageFilter);
  };

  const uiRoutes = routeBuilder({
    translate: t,
    resetContact: props.resetContactList,
    resetUserFilter: props.resetUserFilter,
    resetUsageFilter: resetUsageFilter,
  });

  const onboardingRoute = () => {
    if (getRole() === USER_ROLE.ADMIN) {
      switch (onboardingStep) {
        case ONBOARDING_STEP.NOT_STARTED:
        case ONBOARDING_STEP.COMPANY_INFO:
          return <Redirect to={routes.ORGANIZATION_SETUP} />;

        case ONBOARDING_STEP.CREDENTIAL_UPLOAD:
          return <Redirect to={routes.COMPANY_ADMIN_ENVIRONMENT} />;

        case ONBOARDING_STEP.DOMAINS_UPLOAD:
          return <Redirect to={routes.COMPANY_ADMIN_DOMAIN_UPLOAD} />;

        case ONBOARDING_STEP.AWAITING_FETCH:
          return <Redirect to={routes.COMPANY_ADMIN_WAITING_PAGE} />;

        case ONBOARDING_STEP.COMPLETED:
        default:
          break;
      }
    }

    const currentRole = getRole();
    const allowedRouteKeys = routeKeys.filter(
      (routeKey) => currentRole && uiRoutes[routeKey].allowedRoles.includes(currentRole)
    );

    return (
      <>
        <RcNavBar uiRoutes={allowedRouteKeys.map((routeKey) => uiRoutes[routeKey])} />
        <HomeRouter />
      </>
    );
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ServerError />;
  } else {
    return onboardingRoute();
  }
};

function mapStateToProps(state: RootState) {
  return {
    isLoading: state.onboardingStatus.isLoading,
    onboardingStep: state.onboardingStatus.onboardingStep,
    isError: state.onboardingStatus.isError,
    isResetUsageFilter: state.usageReport.resetDateFilterToggle,
  };
}

const mapDispatchToProps = (dispatch: Function) => ({
  fetchOnboardingStatus: () => dispatch(onboardingAction.fetchOnboardingStep()),
  resetContactList: () => dispatch(contactSearchActions.resetContactList()),
  resetUserFilter: () => dispatch(userManagementActions.resetUserFilter()),
  resetUsageFilter: (resetToggle: boolean) => dispatch(usageReportAction.resetUsageReportDate(resetToggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
