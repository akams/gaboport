import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import * as ROUTES from '../constants/routes';
import { withAuthentication } from '../components/Session';
import { dispatchSetUsers } from '../redux/action/user';

import Register from '../containers/Register'
import Login from '../containers/Login'

class Main extends Component {
  state = {};

  componentWillMount() {
    this.loadUserFromToken();
  }

  loadUserFromToken() {
    let token = sessionStorage.getItem('cookie_user');
    if (!token || token === '') {
      //if there is no token, dont bother
      return;
    }
    console.log({token})
    return this.props.dispatchSetUsersFunction(JSON.parse(token));
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.SIGN_UP} render={props => <Register {...props} />} />
          <Route
            path={ROUTES.SIGN_IN}
            exact
            render={props => <Login {...props} />}
          />
          <Redirect to={ROUTES.SIGN_UP} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: user => dispatchSetUsers(user),
};

const mapStateToProps = () => ({
});


const AppRedux = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Main);


export default withAuthentication(AppRedux);