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
import { SignupPage } from '../screens/SignupScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { HomeScreen, SignupScreen, ShopScreen } from '../screens';

jest.mock('redux-form/lib/Field', () => 'Field');
jest.mock('../navigation/RootNavigation', () => 'RootNavigation');

const navigation = {
  navigate: jest.fn(),
  state: {
    params: { Name: 'mariam', ImageUrl: 'Helofmdsfsd' }
  }
};
const signupUserMutation = jest.fn();
const items = [{
  Name: 'mariam',
  ImageUrl: 'gdfgds',
  Price: 700,
  description: 'the hello is in the world '
}, {
  Name: 'tope',
  ImageUrl: 'gdfgds',
  Price: 700,
  description: 'the hello is in the world'
}];
const state = {
  cart: {
    items
  }
};
const mockStore = configureMockStore();
const store = mockStore({});
const httpLink = new HttpLink();
const handleSubmit = jest.fn();
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

it('tests func', async () => {
  const tree = renderer.create(<Provider store={store}>
    <HomeScreen />
    </Provider>);
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders the home screen', async () => {
  const wrapper = shallow(<HomeScreen store={store}/>);
  // expect(wrapper.find('HomeScreen').instance().handleSignupPress()).equals(true);
});

it('renders the sign up page', async () => {
  const tree = renderer.create(<SignupPage store={store}
    handleSubmit={handleSubmit}
    navigation={navigation}
    signupUserMutation={signupUserMutation}
    />);
  expect(tree.getInstance().storeAuthTokensLocally()).toMatchSnapshot();
  expect(tree.getInstance().handlePress()).toMatchSnapshot();
});


it('renders the links screen here', async () => {
  const tree = renderer.create(<Provider store={store}>
  <ApolloProvider client={client}>
    <ProductScreen
    state={state}
    items={items}
    navigation={navigation}
    />
  </ApolloProvider>
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the signup screen', async () => {
  const tree = renderer.create(<Provider store={store} >
  <SignupScreen />
  </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('testing things', async () => {
  const wrapper = shallow(<SignupScreen store={store}/>);
  expect(wrapper).toMatchSnapshot();
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

