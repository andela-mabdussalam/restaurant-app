import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RenderInput from '../RenderInput';

const meta = {
  touched: true,
  error: true
};
const input = {
  onChange: jest.fn()
};

it('renders correctly', async () => {
  const tree = renderer.create(<RenderInput meta={meta} input={input}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
