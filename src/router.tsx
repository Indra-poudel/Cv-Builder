import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from 'src/components/home';
import routes from 'src/constants/routes';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.ROOT} component={Home} />
        <Route path={routes.COMPONENT_KIT} component={() => <div>Component</div>} />
        <Route path={routes.PAGE_NOT_FOUND} component={() => <div>PAGE_NOT_FOUND</div>} />
        {/*TODO only enable component kit route for dev environment*/}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
