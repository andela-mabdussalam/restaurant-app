import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, } from 'enzyme';
import ConnectedCheckOut, { CheckOutScreen } from '../CheckOutScreen';
import { clearCart } from '../../actions';

// Test objects
const data = {
  loggedInUser: {
    id: 345656
  }
};

const dataNoAuth = {
  loggedInUser: {
    id: ''
  }
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

// Mocked functions
const checkOutMutation = jest.fn();
const closeModal = jest.fn();

// Test suites
describe('CHECKOUTSCREEN --- Snapshot', () => {
  it('renders the checkout screen if user is logged in', async () => {
    const tree = renderer.create(<CheckOutScreen
      items={items}
      navigation={navigation}
      clearCart={clearCart}
      checkOutMutation={checkOutMutation}
      data={data}
      closeModal={closeModal}
      />);
    expect(tree.getInstance()._isLoggedIn()).toMatchSnapshot();
    expect(tree.getInstance().completed()).toMatchSnapshot();
    expect(CheckOutScreen.navigationOptions(navigation)).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });

  it('renders a logout/login view is user is not logged in', async () => {
    const tree = renderer.create(<CheckOutScreen
      items={items}
      navigation={navigation}
      clearCart={clearCart}
      data={dataNoAuth}
      checkOutMutation={checkOutMutation}
      closeModal={closeModal}
      />);
    expect(tree.getInstance()._isLoggedIn()).toMatchSnapshot();
    expect(tree.getInstance().completed()).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });
});

describe('CHECKOUTSCREEN --- Shallow rendering + passing the store directly', () => {
  const initialState = {
    cart: {
      items
    },
    total: 453543
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedCheckOut store={store}/>);
  });

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('items'))
      .toEqual(initialState.cart.items);
    expect(container.prop('total'))
      .toEqual(initialState.cart.total);
  });

  it('checks action on dispatching ', () => {
    let action = '';
    store.dispatch(clearCart());
    action = store.getActions();
    expect(action[0].type).toBe('CHECKOUT');
  });
});
