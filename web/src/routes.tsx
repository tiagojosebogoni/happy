import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Lading';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={LogIn} />
        <Route path="/app" exact component={OrphanagesMap} />

        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanage/:id" component={Orphanage} />
        <Route path="/forgotPassword" component={ForgotPassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
