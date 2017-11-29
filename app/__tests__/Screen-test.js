import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { HomeScreen, LinksScreen } from '../screens';

it('renders the loading screen', async () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the root without loading screen', async () => {
  const tree = renderer.create(<LinksScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
