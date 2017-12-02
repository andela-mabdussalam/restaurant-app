import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RenderInput from '../RenderInput';
import { validate } from '../../utils';

it('renders the input', async () => {
  const tree = renderer.create(<RenderInput />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the input', async () => {
  const tree = renderer.create(<validate />).toJSON();
  expect(tree).toMatchSnapshot();
});
