import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import ConnectedCartScreen, { CartScreen } from '../CartScreen';
import { increaseItemQuantity, decreaseItemQuantity } from '../../actions';

// Mocked component
jest.mock('../CheckOutScreen', () => 'CheckOut');
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
const emptyItem = [];

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

const product = {
  name: 'rice and beans',
  description: 'the rice and beans is dsldks',
  quantity: 4
};
// // Test suites
describe('CARTSCREEN --- Snapshot', () => {
  it('renders the cart screen if user is logged in', async () => {
    const tree = renderer.create(<CartScreen
      items={items}
      navigation={navigation}
      increaseItemQuantity={increaseItemQuantity}
      decreaseItemQuantity={decreaseItemQuantity}
      />);
    expect(tree.getInstance().redirectToShop()).toMatchSnapshot();
    expect(tree.getInstance().closeModal()).toMatchSnapshot();
    expect(tree.getInstance().openModal()).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });


  it('renders a logout/login view is user is not logged in', async () => {
    const tree = renderer.create(<CartScreen
      items={emptyItem}
      navigation={navigation}
      increaseItemQuantity={increaseItemQuantity}
      decreaseItemQuantity={decreaseItemQuantity}
      />);

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
    container = shallow(<ConnectedCartScreen store={store}/>);
  });

  it('renders the cart component', () => {
    container = shallow(<CartScreen
      items={items}
      increaseItemQuantity={increaseItemQuantity}
      decreaseItemQuantity={decreaseItemQuantity}
    />);
    container.find('Cart').dive().find('TouchableHighlight').first()
      .simulate('press');
    container.find('Cart').dive().find('TouchableHighlight').at(1)
      .simulate('press');
    expect(container.length).toEqual(1);
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

  it('check action on dispatching ', () => {
    let action = '';
    store.dispatch(increaseItemQuantity(product));
    store.dispatch(decreaseItemQuantity(product));
    action = store.getActions();
    expect(action[0].type).toBe('INCREASE_ITEM_QUANTITY');
    expect(action[1].type).toBe('DECREASE_ITEM_QUANTITY');
  });
});
