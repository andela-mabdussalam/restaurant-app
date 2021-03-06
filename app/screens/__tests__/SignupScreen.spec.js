import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import ConnectedSignup, { SignupPage } from '../SignupScreen';
import { addTokenToStore, addProducts, removeProducts } from '../../actions/index';

// Mocked component
jest.mock('redux-form/lib/Field', () => 'Field');

// Test objects
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

const navigation = {
  navigate: jest.fn(),
  state: {
    params: {
      name: 'mariam',
      ImageUrl: 'gdfgds',
      Price: 700,
      description: 'the hello is in the world '
    }
  }
};

const response = {
  data: {
    signupUser: {
      token: 12345678,
      id: 324567,
      firstName: 'mariam'
    }
  }
};

const e = {
  endCoordinates: {
    height: 350
  }
};

const values = {
  firstName: 'mariam',
  lastName: 'tonia',
  phoneNum: '432524523423',
  email: 'mariam3105@gmail.com',
  password: 'rw840424'
};
// Mocked functions
const handleSubmit = jest.fn();
const rejectedSignupMutation = () => Promise.reject(new Error('Email'));
const rejectedSignup = () => Promise.reject(new Error('Other error'));
const resolvedsignupMutation = () => response;
const productQuery = {
  allProducts: [{
    name: 'mariam'
  }]
};
// Test suites
describe('SIGNUPSCREEN --- Snapshot', () => {
  it('renders the sign up screen with rejected promise', async () => {
    const tree = renderer.create(<SignupPage
      navigation={navigation}
      handleSubmit={handleSubmit}
      signupUserMutation={rejectedSignupMutation}
      addTokenToStore={addTokenToStore}
      addProducts={addProducts}
      dispatch={jest.fn()}
      removeProducts={removeProducts}
      productQuery={productQuery}
      />);
    expect(tree.getInstance().handlePress(values)).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });

  it('renders the sign up screen with rejected promise with other error message', async () => {
    const tree = renderer.create(<SignupPage
      navigation={navigation}
      handleSubmit={handleSubmit}
      signupUserMutation={rejectedSignup}
      addTokenToStore={addTokenToStore}
      addProducts={addProducts}
      dispatch={jest.fn()}
      removeProducts={removeProducts}
      productQuery={productQuery}
      />);
    expect(tree.getInstance().handlePress(values)).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });

  it('renders the sign up screen with resolved promise', async () => {
    const tree = renderer.create(<SignupPage
      navigation={navigation}
      handleSubmit={handleSubmit}
      addTokenToStore={addTokenToStore}
      addProducts={addProducts}
      productQuery={productQuery}
      dispatch={jest.fn()}
      removeProducts={removeProducts}
      signupUserMutation={resolvedsignupMutation}
      />);
    expect(tree.getInstance().keyboardDidShow(e)).toMatchSnapshot();
    expect(tree.getInstance().handlePress(values)).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });
});

describe('SIGNUPSCREEN --- Shallow rendering + passing the store directly', () => {
  const initialState = {
    cart: {
      items
    },
    user: {
      loginState: true
    }
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const container = shallow(<ConnectedSignup store={store}/>);

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });
});
