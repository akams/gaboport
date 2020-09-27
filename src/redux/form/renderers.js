import React from 'react';
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

import './style.scss'

/** Render complex input group sans label
 * @param {*} param0 
 */
export const renderInputGroupField = ({
  classNameI,
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <FormGroup>
    <InputGroup className="input-group-alternative mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={classNameI} />
        </InputGroupText>
      </InputGroupAddon>
      <Input {...input} type={type} />
    </InputGroup>
    {touched &&
      ((error && <span className="error-render-form">{error}</span>) ||
        (warning && <span>{warning}</span>))}
</FormGroup>
)

/** render sans label
 * @param {*} param0 
 */
export const renderSimpleInputTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <>
    <Input {...input} type={type} />
    {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </>
)

/** render avec label
 * @param {*} param0 
 */
export const renderInputTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <>
      <Input {...input} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </>
  </div>
)

