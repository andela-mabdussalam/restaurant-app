import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import thunk from 'redux-thunk';
import ConnectedHome, { HomeScreen } from '../HomeScreen';
import { addProducts, addTokenToStore, loginFail, removeProducts } from '../../actions';

// Mocked component
jest.mock('redux-form/lib/Field', () => 'Field');

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

const products = [{
  name: 'rice and beans',
  description: 'the rice and beans is dsldks'
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
  allProducts: [{
    name: 'manny'
  }]
};

const values = {
  email: 'mariam3105@gmail.com',
  password: 'rw840424'
};

const response = {
  data: {
    authenticateUser: {
      token: 12345678,
      id: 534534543543
    }
  }
};

const e = {
  endCoordinates: {
    height: 350
  }
};

// Mocked functions
const rejectedUserMutation = () => Promise.reject(new Error('not found'));
const resolvedUserMutation = () => response;
const handleSubmit = jest.fn();
const LoginFail = jest.fn();

// Test suites
describe('HOMESCREEN --- Snapshot', () => {
  it('captures snapshot of homescreen with rejected auth promise', async () => {
    const tree = renderer.create(<HomeScreen
    state={state}
    loginState
    loginFail={LoginFail}
    handleSubmit={handleSubmit}
    navigation={navigation}
    addProducts={jest.fn()}
    removeProducts={removeProducts}
    authenticateUserMutation={rejectedUserMutation}
    addTokenToStore={addTokenToStore}
    dispatch={jest.fn()}
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
    addProducts={addProducts}
    addTokenToStore={addTokenToStore}
    handleSubmit={handleSubmit}
    removeProducts={removeProducts}
    navigation={navigation}
    productQuery={productQuery}
    dispatch={jest.fn()}
    authenticateUserMutation={resolvedUserMutation}
/>);
    expect(tree.getInstance().loginUser(values)).toMatchSnapshot();
    expect(tree.getInstance().keyboardDidShow(e)).toMatchSnapshot();
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
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedHome
      removeProducts={removeProducts}
      store={store}/>);
  });

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('loginState'))
      .toEqual(initialState.user.loginState);
  });
  it('check action on dispatching ', () => {
    let action = '';
    store.dispatch(addProducts(products));
    store.dispatch(addTokenToStore('klmkmkl67890'));
    store.dispatch(loginFail(true));
    store.dispatch(removeProducts());
    action = store.getActions();
    expect(action[0].type).toBe('RECEIVE_PRODUCTS');
    expect(action[1].type).toBe('ADD_TOKEN');
    expect(action[2].type).toBe('LOGIN_FAIL');
    expect(action[3].type).toBe('REMOVE_PRODUCTS');
  });
});
