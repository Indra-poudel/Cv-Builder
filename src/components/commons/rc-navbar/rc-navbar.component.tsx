import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MdPowerSettingsNew } from 'react-icons/md';
import { Link, NavLink, useHistory } from 'react-router-dom';

import routes from 'src/constants/routes';
import { clearTokens } from 'src/services/auth';
import { USER_ROLE } from 'src/constants/users';
import AccessControl from 'src/components/access-control';
import RecovoLogo from 'src/assets/custom-icons/recovoLogo';
import * as contactSearchActions from 'src/pages/contact-search/contact-search.action';

interface RcRoute {
  isVisible: boolean;
  redirectTo: string;
  routeIcon?: () => React.ReactElement | null;
  displayName?: String;
  onClick?: () => void;
}

interface RcNavbarProps {
  uiRoutes?: RcRoute[];
  resetContactList: () => void;
}

const RcNavBar: React.FC<RcNavbarProps> = (props: RcNavbarProps) => {
  const { uiRoutes } = props;

  const history = useHistory();

  const { t } = useTranslation();

  const handleLogout = () => {
    clearTokens();
    history.push(routes.SUPER_ADMIN_LOGIN);
  };

  return (
    <nav className="navbar navbar--bordered-bottom">
      <div className="container">
        <div className="navbar__wrap navbar__wrap--content-spread">
          <div className="navbar__left">
            <div className="navbar__logo">
              <Link to={routes.ROOT} onClick={props.resetContactList}>
                <RecovoLogo />
              </Link>
            </div>
          </div>
          <div className="navbar__right">
            <div className="nav">
              {uiRoutes && (
                <ul className="nav">
                  {uiRoutes.map((route: RcRoute) => (
                    <li className="nav__node" key={`id:${route.redirectTo}`}>
                      <NavLink
                        onClick={route.onClick}
                        className="nav__link"
                        activeClassName="nav__link--active"
                        to={route.redirectTo}>
                        {route.routeIcon && route.routeIcon()}
                        <span className="nav__link--nav-text">{route.displayName}</span>
                      </NavLink>
                    </li>
                  ))}
                  <AccessControl allowedRoles={[USER_ROLE.SUPER_ADMIN]}>
                    <li className="nav__node nav-link">
                      <span className="nav__link" onClick={handleLogout}>
                        <MdPowerSettingsNew />
                        <span className="nav__link--nav-text">{t('account-page:sideMenu.logout')}</span>
                      </span>
                    </li>
                  </AccessControl>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  resetContactList: () => dispatch(contactSearchActions.resetContactList()),
});

export default connect(null, mapDispatchToProps)(RcNavBar);
