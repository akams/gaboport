import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  Container,
  Row,
  Col
} from 'reactstrap';

import { withFirebase } from '../../components/Firebase';
import { create as createUser, getLastInsert } from '../../firebase/firestore/user';
import * as ROUTES from '../../constants/routes';
import { dispatchSetUsers } from '../../redux/action/user';

import RegisterForm, { 
  initFormData
} from './form';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Init form (create)
   * @param data
   */
  initForm(data = {email: '', passwordOne: '', passwordTwo: ''}) {
    const { dispatch } = this.props;
    dispatch(initFormData(data));
  }

  async handleSubmit(data) {
    const { email, passwordOne } = data;
    const { history, firebase } = this.props;
    try {
      const result = await firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      await createUser(firebase.firestore, { uid: result.user.uid, email});
      const lastUser = await getLastInsert(firebase.firestore, result.user.uid)
      if (lastUser.id) {
        this.props.dispatchSetUsersFunction(lastUser.data);
        sessionStorage.setItem('cgabo_user', JSON.stringify(lastUser.data));
        history.push(ROUTES.HOME);
      }
    }
    catch (e) {
      console.error({e})
    }
  }

  componentDidMount() {
    this.initForm();
  }
  render() {
    return (
      <>
      <main ref="main">
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Inscription</small>
                    </div>
                    <RegisterForm
                      originalOnSubmit={this.handleSubmit}
                      {...this.props}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      </>
    );
  }
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: user => dispatchSetUsers(user),
};
const mapStateToProps = () => ({});

export default compose(
  withRouter,
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterPage)
