export const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^.+@.+$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password too short';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Password Confirm is required';
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match';
  }

  if (!values.phoneNum) {
    errors.phoneNum = 'Phone Number is required';
  }
  return errors;
};
