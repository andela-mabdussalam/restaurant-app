import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { validate } from '../validateInput';

const emptyVal = {
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirm: '',
  phoneNum: '',
  email: ''
};
const lengthyVal = {
  firstName: 'mariamandsfdsfsdfds',
  lastName: 'fsdfdsfdsfdsffdvfvdf',
  password: 'mari',
  passwordConfirm: 'sdasda',
  email: 'mariam'
};
const correctVal = {
  firstName: 'gfgdffd',
  lastName: 'fsdfdsfd',
  password: 'mariam67',
  passwordConfirm: 'mariam67',
  email: 'mariam3105@gmail.com',
  phoneNum: '0802803456'
};
const emptyValError = {
  email: 'Required',
  firstName: 'Required',
  lastName: 'Required',
  password: 'Password is required',
  passwordConfirm: 'Password Confirm is required',
  phoneNum: 'Phone Number is required'
};
const lengthyValError = {
  email: 'Invalid email address',
  firstName: 'Must be 15 characters or less',
  lastName: 'Must be 15 characters or less',
  password: 'Password too short',
  passwordConfirm: 'Passwords do not match',
  phoneNum: 'Phone Number is required'
};
const correctValError = {};

it('renders correctly', async () => {
  const tree = renderer.create(<validate />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test validate function', () => {
  it('should return correct values if input is valid', () => {
    expect(validate(emptyVal)).toEqual(emptyValError);
  });
  it('should return correct values if input is invalid', () => {
    expect(validate(lengthyVal)).toEqual(lengthyValError);
  });
  it('should return correct values when all values are correct', () => {
    expect(validate(correctVal)).toEqual(correctValError);
  });
});
