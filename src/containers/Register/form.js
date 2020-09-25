import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Fields, change, formValueSelector } from 'redux-form';
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
import { createInitFormData, createUpdateValue, normalizeFieldValue } from '../../redux/form/helpers';
import { compileValidation } from './validate'

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

export const formName = 'register';
export const initFormData = createInitFormData(formName);

const warn = values => {
  const warnings = {}
  if (values.email < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

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
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" name="email" value={email} onChange={this.onChange} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              name="passwordOne" 
                              type="password"
                              autoComplete="off"
                              value={passwordOne}
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
                              name="passwordTwo"
                              value={passwordTwo}
                              onChange={this.onChange} 
                            />
                          </InputGroup>
                        </FormGroup>
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

export default reduxForm({
  form: formName,
  validate: compileValidation,
  warn
})(connect(state => ({
  initialData: {}
}))(RegisterForm));
