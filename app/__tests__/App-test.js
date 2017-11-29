/* eslint no-undef: 0 */
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';

jest.mock('../navigation/RootNavigation', () => 'RootNavigation');


it('renders the loading screen', async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the root without loading screen', async () => {
  const tree = renderer.create(<App skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
