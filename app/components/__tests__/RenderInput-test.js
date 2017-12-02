import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RenderInput from '../RenderInput';
import { validate } from '../../utils';

const meta = {
  touched: true,
  error: true
};
const input = {
  onChange: jest.fn()
};
const values = {
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirm: '',
  phoneNum: '',
  email: ''
};
const lengthyValues = {
  firstName: 'mariamandsfdsfsdfds',
  lastName: 'fsdfdsfdsfdsffdvfvdf',
  password: 'mari',
  passwordConfirm: 'sdasda',
  email: 'mariam'
};
const errors = {
  email: 'Required',
  firstName: 'Required',
  lastName: 'Required',
  password: 'Password is required',
  passwordConfirm: 'Password Confirm is required',
  phoneNum: 'Phone Number is required'
};
const lengthValuesErrors = {
  email: 'Invalid email address',
  firstName: 'Must be 15 characters or less',
  lastName: 'Must be 15 characters or less',
  password: 'Password too short',
  passwordConfirm: 'Passwords do not match',
  phoneNum: 'Phone Number is required'
};
it('renders correctly', async () => {
  const tree = renderer.create(<RenderInput meta={meta} input={input}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly', async () => {
  const tree = renderer.create(<validate />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test validate function', () => {
  it('should do what I like', () => {
    expect(validate(values)).toEqual(errors);
  });
  it('should do what I like', () => {
    expect(validate(lengthyValues)).toEqual(lengthValuesErrors);
  });
});
