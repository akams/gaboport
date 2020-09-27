export const compileValidation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.passwordOne) {
    errors.passwordOne = 'Required'
  } else if (values.passwordOne.length < 6) {
    errors.passwordOne = 'Must be 6 characters or more'
  }
  if (!values.passwordTwo) {
    errors.passwordTwo = 'Required'
  } else if (values.passwordTwo.length < 6) {
    errors.passwordTwo = 'Must be 6 characters or more'
  } else if (values.passwordOne !== values.passwordTwo) {
    errors.passwordTwo = 'Les mots de passe ne correspondent pas'
  }
  return errors;
};
