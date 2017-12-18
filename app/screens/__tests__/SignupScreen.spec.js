import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import ConnectedSignup, { SignupPage } from '../SignupScreen';

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
      firstName: 'mariam'
    }
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
const rejectedSignupMutation = () => Promise.reject(new Error('not found'));
const resolvedsignupMutation = () => response;

// Test suites
describe('PRODUCTSCREEN --- Snapshot', () => {
  it('renders the links screen here', async () => {
    const tree = renderer.create(<SignupPage
      navigation={navigation}
      handleSubmit={handleSubmit}
      signupUserMutation={rejectedSignupMutation}
      />);
    expect(tree.getInstance().handlePress(values)).toMatchSnapshot();
    // expect(SignupPage.navigationOptions(navigation)).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });

  it('renders the links screen here', async () => {
    const tree = renderer.create(<SignupPage
      navigation={navigation}
      handleSubmit={handleSubmit}
      signupUserMutation={resolvedsignupMutation}
      />);
    expect(tree.getInstance().handlePress(values)).toMatchSnapshot();
    // expect(SignupPage.navigationOptions(navigation)).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
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
    container = shallow(<ConnectedSignup store={store}/>);
  });

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });
});
