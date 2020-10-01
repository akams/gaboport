import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import {
  Button,
  Form,
  Row,
  Col
} from 'reactstrap';
import zxcvbn from 'zxcvbn';
import { createInitFormData } from '../../redux/form/helpers';
import { renderInputGroupField } from '../../redux/form/renderers'
import { compileValidation } from './validate'

export const formName = 'register';
export const initFormData = createInitFormData(formName);

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(data) {
    this.props.originalOnSubmit(data);
  };

  isWeakPassword(mdp){
    let weak = {color: '', msg: ''};
    if (mdp) {
      switch (zxcvbn(mdp).score) {
        case 2:
          weak = {color: 'text-warning', msg: 'Weak'};
          break;
        case 3:
          weak = {color: 'text-info', msg: 'Strong'};
          break;
        case 4:
          weak = {color: 'text-success', msg: 'Too strong'};
          break;
        default:
          weak = {color: 'text-danger', msg: 'Too weak'};
          break;
      }
    }
    return weak;
  };

  render() {
    const { formValues: { passwordOne }, handleSubmit } = this.props;
    return (
      <>
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
              <span className={`${this.isWeakPassword(passwordOne).color} font-weight-700`}>
                {this.isWeakPassword(passwordOne).msg}
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
              onClick={handleSubmit(this.handleSubmit)}
            >
              Create account
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

const selector = formValueSelector(formName);
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
  formValues: {
    email: selector(state, 'email'),
    passwordOne: selector(state, 'passwordOne'),
    passwordTwo: selector(state, 'passwordTwo')
  }
});

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


