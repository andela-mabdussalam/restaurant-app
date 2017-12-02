import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { HomeScreen, LinksScreen, SignupScreen } from '../screens';

const mockStore = configureMockStore();
const store = mockStore({});
it('renders the loading screen', async () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the root without loading screen', async () => {
  const tree = renderer.create(<LinksScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the root without loading screen', async () => {
  const tree = renderer.create(<Provider store={store} >
  <SignupScreen />
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
