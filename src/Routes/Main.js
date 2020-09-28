import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router'

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
      <>
        <Switch>
          <Route exact path={ROUTES.SIGN_UP} render={props => <Register {...this.props} />} />
          <Route
            path={ROUTES.SIGN_IN}
            render={props => <Login {...this.props} />}
          />
          <Redirect to={ROUTES.SIGN_IN} />
        </Switch>
      </>
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