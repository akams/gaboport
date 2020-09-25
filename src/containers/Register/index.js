import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import ENV from '../../constants/environment/common.env';
import RegisterForm, { 
  initFormData
} from './form';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Init GeoGroup form (create)
   * @param data
   */
  initForm(data = {email: '', passwordOne: '', passwordTwo: ''}) {
    const { dispatch } = this.props;
    dispatch(initFormData(data));
  }

  componentDidMount() {
    this.initForm();
  }
  render() {
    return (
      <>
        <RegisterForm />
      </>
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = () => ({});

export default compose(
  withRouter,
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterPage)
