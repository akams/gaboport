export const compileValidation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.passwordOne) {
    errors.passwordOne = 'Required'
  } else if (values.passwordOne.length > 4) {
    errors.passwordOne = 'Must be 4 characters or less'
  }
  if (!values.passwordTwo) {
    errors.passwordTwo = 'Required'
  } else if (values.passwordTwo.length > 4) {
    errors.passwordTwo = 'Must be 4 characters or less'
  } else if (values.passwordOne !== values.passwordTwo) {
    errors.passwordTwo = 'Les mots de passe ne correspondent pas'
  }
  return errors;
};
