import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';

import { withAuthentication } from '../components/Session';
import Sidebar from '../components/Sidebar/Sidebar'
import { dispatchSetUsers } from '../redux/action/user';
import routes from '../constants/routes';

class App extends Component {
  state = {};

  componentWillMount() {
    this.loadUserFromToken();
  }

  getRoutes = routeurs => {
    return routeurs.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

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
      <Sidebar {...this.props} />
      <div className="main-content" ref="mainContent">
        <Switch>
          {this.getRoutes(routes)}
          <Redirect from="*" to="/admin/home" />
        </Switch>
      </div>
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
)(App);

export default withAuthentication(AppRedux);