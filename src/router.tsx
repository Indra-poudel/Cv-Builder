import React from 'react';
import { DEVELOPMENT_ENV } from 'src/constants/constants';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from 'src/pages/home';
import routes from 'src/constants/routes';
import OnBoarding from 'src/pages/onboarding/index';
import SuperAdminLogin from 'src/pages/super-admin-login';
import DesignKitRoutes from './design-kit/design-kit-router';
import CompanyAdminLogin from 'src/pages/company-admin-login';
import CompanyAdminSignUp from 'src/pages/company-admin-sign-up';
import EmailVerification from 'src/components/email-verification/email-verification';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.SUPER_ADMIN_LOGIN} component={SuperAdminLogin} />
        <Route path={routes.LOGIN} component={CompanyAdminLogin} />
        <Route path={routes.SIGN_UP} component={CompanyAdminSignUp} />
        <Route path={routes.VERIFY_EMAIL} component={EmailVerification} />
        <Route path={routes.ON_BOARDING} component={OnBoarding} />
        {process.env.NODE_ENV === DEVELOPMENT_ENV && <Route path={routes.DESIGN_KIT} component={DesignKitRoutes} />}
        <Route path={routes.ROOT} component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
