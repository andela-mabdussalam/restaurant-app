import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import ConnectedHome, { HomeScreen } from '../HomeScreen';

jest.mock('redux-form/lib/Field', () => 'Field');
// jest.mock('../../navigation/RootNavigation', () => 'RootNavigation');

// Test objects
const navigation = {
  navigate: jest.fn()
};

const items = [{
  name: 'mariam',
  ImageUrl: 'gdfgds',
  Price: 700,
  description: 'the hello is in the world '
},
{
  name: 'tope',
  ImageUrl: 'gdfgds',
  Price: 700,
  description: 'the hello is in the world'
}];

const state = {
  cart: {
    items
  },
  user: {
    loginState: true
  }
};

const productQuery = {
  allProducts: {}
};

const values = {
  email: 'mariam3105@gmail.com',
  password: 'rw840424'
};

const response = {
  data: {
    authenticateUser: {
      token: 12345678
    }
  }
};

// Mocked functions
const rejectedUserMutation = () => Promise.reject(new Error('not found'));
const resolvedUserMutation = () => response;
const handleSubmit = jest.fn();
const LoginFail = jest.fn();
const addProducts = jest.fn();
const addTokenToStore = jest.fn();

// Test suites
describe('HOMESCREEN --- Snapshot', () => {
  it('captures snapshot of homescreen with rejected auth promise', async () => {
    const tree = renderer.create(<HomeScreen
    state={state}
    loginState
    loginFail={LoginFail}
    handleSubmit={handleSubmit}
    navigation={navigation}
    addProducts={addProducts}
    authenticateUserMutation={rejectedUserMutation}
    addTokenToStore={addTokenToStore}
    productQuery={productQuery}
    />);
    expect(tree.getInstance().loginUser(values)).toMatchSnapshot();
    expect(tree.getInstance().storeAuthTokensLocally()).toMatchSnapshot();
    expect(tree.getInstance().handleSignupPress()).toMatchSnapshot();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('captures snapshot of homescreen with resolved auth promise', async () => {
    const tree = renderer.create(<HomeScreen
    state={state}
    loginState
    loginFail={LoginFail}
    handleSubmit={handleSubmit}
    navigation={navigation}
    authenticateUserMutation={resolvedUserMutation}
/>);
    expect(tree.getInstance().loginUser(values)).toMatchSnapshot();
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('HOMESCREEN --- Shallow rendering + passing the store directly', () => {
  const initialState = {
    cart: {
      items
    },
    user: {
      loginState: true
    }
  };
  const mockStore = configureMockStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedHome store={store}/>);
  });

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('loginState'))
      .toEqual(initialState.user.loginState);
  });
});
