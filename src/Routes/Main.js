import React, { Component }  from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';

import { withAuthentication } from '../components/Session';
import { dispatchSetUsers } from '../redux/action/user';

import Register from '../containers/Register';
import Login from '../containers/Login';
import Home from '../containers/Home';
import Sidebar from '../components/Sidebar/Sidebar'
import AdminNavbar from '../components/Navbars/AdminNavbar'

import * as ROUTES from '../constants/routes'


class Main extends Component {
  state = {};

  componentWillMount() {
    this.loadUserFromToken();
  }

  loadUserFromToken() {
    const { user, history } = this.props;
    let token = sessionStorage.getItem('cgabo_user');
    if (!token || token === '') {
      //if there is no token, dont bother
      if (user === null) {
        return history.push("/signin");
      }
      return;
    }
    return this.props.dispatchSetUsersFunction(JSON.parse(token));
  }

  render() {
    const { user, location: { pathname } } = this.props;
    const path = pathname.split("/")[pathname.split("/").length-1]
    return (
      <>
        {user ? <Sidebar {...this.props} /> : null}
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            brandText={path}
          />
          <Switch>
            <Route path="/signin" render={() => <Login {...this.props} />} />
            <Route path="/signup" render={() => <Register {...this.props} />} />
            <Route exact path="/admin/home" render={() => <Home {...this.props} />} />
            <Redirect from="/" to="/admin/home" />
          </Switch>
        </div>
      </>
    );
  }
}

function App(props) {
  const { firebase } = props;
  const [ user ] = useAuthState(firebase.auth);
  return (
    <>
      <Main
        user={user}
        {...props}
      />
    </>
  );
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: user => dispatchSetUsers(user),
};

const mapStateToProps = () => ({
});


const AppRedux = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);

export default withAuthentication(AppRedux);