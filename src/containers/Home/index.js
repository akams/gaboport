import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';

class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <div style={{padding: '20%'}}>
          <h1>Welcome home</h1>
        </div>
      </>
    );
  }
}


export default Home;