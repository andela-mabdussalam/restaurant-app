import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { HomeScreen, LinksScreen, SignupScreen, ShopScreen, ProductScreen } from '../screens';

jest.mock('../navigation/RootNavigation', () => 'RootNavigation');

const navigation = {
  navigate: jest.fn(),
  state: {
    params: ''
  }
};
const mockStore = configureMockStore();
const store = mockStore({});

it('renders the home screen', async () => {
  const tree = renderer.create(<HomeScreen navigation={navigation} />);
  expect(tree.getInstance().handleSignupPress()).toMatchSnapshot();
  expect(tree).toMatchSnapshot();
});

it('renders the links screen', async () => {
  const tree = renderer.create(<LinksScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the links screen', async () => {
  const tree = renderer.create(<ShopScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the links screen', async () => {
  const tree = renderer.create(<Provider store={store}>
  <ProductScreen navigation={navigation}/></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the signup screen', async () => {
  const tree = renderer.create(<Provider store={store} >
  <SignupScreen />
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

