import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './login';
import Shared from './shared';
import Account from './account';
import Loading from './loading';
import ErrorCsv from './error-csv';
import SmallModal from './small-modal';
import SearchPage from './search-page';
import LayoutUser from './layout-user';
import EmailSearch from './email-search';
import EmailThread from './email-thread';
import SearchEmpty from './search-empty';
import routes from './constants/routes';
import SuccessDialog from './success-dialog';
import DesignKitHome from './design-kit-home';
import LayoutUserDetail from './layout-user-detail';
import OrganizationSetup from './organization-setup';
import OrganizationProgress from './organization-progress';

const DesignKitRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path={routes.DESIGN_KIT} component={() => <Redirect to="/designKit/components" />} />
      <Route path={routes.COMPONENTS} component={DesignKitHome} />
      <Route path={routes.SHARED} component={Shared} />
      <Route path={routes.LAYOUT_USER} component={LayoutUser} />
      <Route path={routes.LOGIN} component={Login} />
      <Route path={routes.LAYOUT_USERDETAIL} component={LayoutUserDetail} />
      <Route path={routes.ORGANIZATION_SETUP} component={OrganizationSetup} />
      <Route path={routes.ORGANIZATION_PROGRESS} component={OrganizationProgress} />
      <Route path={routes.ERROR_CSV} component={ErrorCsv} />
      <Route path={routes.SEARCH_EMPTY} component={SearchEmpty} />
      <Route path={routes.SEARCH_PAGE} component={SearchPage} />
      <Route path={routes.LOADING} component={Loading} />
      <Route path={routes.SUCCESS_DIALOG} component={SuccessDialog} />
      <Route path={routes.SMALLMODAL} component={SmallModal} />
      <Route path={routes.EMAILSEARCH} component={EmailSearch} />
      <Route path={routes.EMAILTHREAD} component={EmailThread} />
      <Route path={routes.ACCOUNT} component={Account} />
    </Switch>
  );
};

export default DesignKitRouter;
