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

it('renders the input', async () => {
  const tree = renderer.create(<RenderInput meta={meta} input={input}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the input', async () => {
  const tree = renderer.create(<validate />).toJSON();
  expect(tree).toMatchSnapshot();
});
