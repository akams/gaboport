import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import {
  Button,
  Card,
  CardBody,
  Form,
  Container,
  Row,
  Col
} from 'reactstrap';
import { createInitFormData, createUpdateValue, normalizeFieldValue } from '../../redux/form/helpers';
import { renderInputGroupField } from '../../redux/form/renderers'
import { compileValidation } from './validate'

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

export const formName = 'register';
export const initFormData = createInitFormData(formName);

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    console.log('iciiiii======>>>', this.props);
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
                      <Form role="form">
                        <Field
                          classNameI="ni ni-hat-3"
                          name="email"
                          type="email"
                          placeholder="Email"
                          component={renderInputGroupField}
                        />
                        <Field
                          classNameI="ni ni-lock-circle-open"
                          name="passwordOne" 
                          type="password"
                          autoComplete="off"
                          component={renderInputGroupField}
                        />
                        <Field
                          classNameI="ni ni-lock-circle-open"
                          name="passwordTwo" 
                          type="password"
                          autoComplete="off"
                          component={renderInputGroupField}
                        />
                        <div className="text-muted font-italic">
                          <small>
                            password strength:{" "}
                            <span className="text-success font-weight-700">
                              strong
                            </span>
                          </small>
                        </div>
                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span>
                                  I agree with the{" "}
                                  <a
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
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

const mapDispatchToProps = {};
const mapStateToProps = () => ({});

export default compose(
  reduxForm({
    form: formName,
    validate: compileValidation
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterForm)


