import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import configureMockStore from 'redux-mock-store';
import { HttpLink } from 'apollo-link-http';
import { shallow } from 'enzyme';

import { HomeScreen, SignupScreen, ShopScreen, ProductScreen } from '../screens';

jest.mock('../navigation/RootNavigation', () => 'RootNavigation');

const navigation = {
  navigate: jest.fn(),
  state: {
    params: { Name: 'mariam', ImageUrl: 'Helofmdsfsd' }
  }
};
const mockStore = configureMockStore();
const store = mockStore({});
const httpLink = new HttpLink();

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

it('tests func', async () => {
  const tree = renderer.create(<Provider store={store}>
    <HomeScreen />
    </Provider>);
  // console.log('=====', tree.getInstance());
  // tree.getInstance().handleSignupPress();
  // expect(tree.getInstance().handleSignupPress().toMatchSnapshot());
  expect(tree.toJSON()).toMatchSnapshot();
  // expect(tree).toMatchSnapshot();
});
it('renders the home screen', async () => {
  const wrapper = shallow(<HomeScreen store={store}/>);
  // expect(wrapper.find('HomeScreen').instance().handleSignupPress()).equals(true);
});

// it('renders the links screen', async () => {
//   const tree = renderer.create(<ShopScreen />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

it('renders the links screen', async () => {
  const tree = renderer.create(<Provider store={store}>
  <ApolloProvider client={client}>
  <ProductScreen navigation={navigation}/></ApolloProvider></Provider>).toJSON();
  // expect(tree.getInstance()).toMatchSnapshot();
  // expect(tree.getInstance().onStarRatingPress().toMatchSnapshot());
  // expect(tree.getInstance().hideModal().toMatchSnapshot());
  expect(tree).toMatchSnapshot();
});

it('renders the signup screen', async () => {
  const tree = renderer.create(<Provider store={store} >
  <SignupScreen />
  </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders the signup screen', async () => {
  const tree = renderer.create(<Provider store={store} >
  <ApolloProvider client={client}>
  <ShopScreen />
  </ApolloProvider>
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
it('tests nav options', async () => {
  expect(ProductScreen.navigationOptions(navigation)).toMatchSnapshot();
});

