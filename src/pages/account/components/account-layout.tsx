import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdPowerSettingsNew } from 'react-icons/md';

import { RootState } from 'src/reducers';
import routes from 'src/constants/routes';
import * as accountAction from '../account.action';
import AccessControl from 'src/components/access-control';
import AccountRouter, { accountRouteBuilder } from '../account.router';

interface StateProps {
  isLogoutSuccessful: boolean;
  logOut: () => void;
}

const routeKeys = [routes.ACCOUNT_SETTINGS, routes.ACCOUNT_PROFILE];

const AccountLayout = (props: StateProps) => {
  const { t } = useTranslation(['account-page']);

  const logOut = () => props.logOut();

  if (props.isLogoutSuccessful) {
    return <Redirect to={routes.LOGIN} />;
  }

  const uiRoutes = accountRouteBuilder(t);
  const accountRoutes = routeKeys.map((key) => uiRoutes[key]);

  const SideBar = () => (
    <div className="sidebar">
      <h2>{t('account-page:sideMenu.account')}</h2>
      <ul className="side-list">
        {accountRoutes.map((route) => {
          return (
            <AccessControl key={`id:${route.redirectTo}`} allowedRoles={route.allowedRoles}>
              <li className="side-item">
                <NavLink className="nav__link" activeClassName="nav__link--active" to={route.redirectTo}>
                  {route.routeIcon && route.routeIcon()}
                  <span className="nav__link--nav-text">{route.displayName}</span>
                </NavLink>
              </li>
            </AccessControl>
          );
        })}
        <li className="side-item">
          <span className="nav__link cursor-pointer-navbar" onClick={logOut}>
            <MdPowerSettingsNew className="mr-2x" />
            <span className="nav__link--nav-text">{t('account-page:sideMenu.logout')}</span>
          </span>
        </li>
      </ul>
    </div>
  );

  return (
    <React.Fragment>
      <div className="content-wrap">
        <div className="container">
          <div className="columns-leftsidbar">
            <SideBar />
            <div className="main">
              <AccountRouter />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({ isLogoutSuccessful: state.account.logout.isLogoutSuccessful });

const mapDispatchToProps = (dispatch: Function) => ({
  logOut: () => {
    dispatch(accountAction.logOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountLayout);
