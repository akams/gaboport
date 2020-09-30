import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import InAppRouteur from '../routes/InAppRouteur';
import AuthRouteur from '../routes/AuthRouteur';

function Main(props) {
  return (
    <>
      <Switch>
        <Route exact path="/admin" render={() => <InAppRouteur {...props} />} />
        <Route exact path="/auth" render={() => <AuthRouteur {...props} />} />
        <Redirect from="/" to="/admin/home" />
      </Switch>
    </>
  );
}


export default Main;