import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from 'reactstrap';
import { toast } from 'react-toastify';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../../components/Firebase';
import { getLastInsert } from '../../firebase/firestore/user';
import { dispatchSetUsers } from '../../redux/action/user';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit = event => {
    const { email, password } = this.state;
    const { firebase } = this.props;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((result) => {
        getLastInsert(firebase.firestore, result.user.uid).then((userInfo) => {
          this.props.dispatchSetUsersFunction(userInfo.data);
          sessionStorage.setItem('cgabo_user', JSON.stringify(userInfo.data));
          this.setState({ ...INITIAL_STATE });
          this.props.history.push("/admin/home");
        })
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`);
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;
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
                        <small>Connexion</small>
                      </div>
                      <Form role="form" onSubmit={this.onSubmit}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              placeholder="Email"
                              type="email"
                              name="email"
                              value={email}
                              onChange={this.onChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              name="password"
                              value={password}
                              onChange={this.onChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link
                        className="text-light"
                        to={ROUTES.SIGN_UP}
                      >
                        <small>Create new account</small>
                      </Link>
                    </Col>
                  </Row>
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
)(Login)
