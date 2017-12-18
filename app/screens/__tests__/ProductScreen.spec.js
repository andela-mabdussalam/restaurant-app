import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import thunk from 'redux-thunk';
import ConnectedProduct, { ProductScreen } from '../ProductScreen';
import { addToCart } from '../../actions';

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

const product = {
  name: 'rice and beans',
  description: 'the rice and beans is dsldks',
  quantity: 4
};

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
const navigationWithoutValue = {
  navigate: jest.fn(),
  state: {
    params: {
      name: 'topeez',
      ImageUrl: 'jandus',
      Price: 800,
      description: 'the hello is in the world right heer '
    }
  }
};


// Test suites
describe('PRODUCTSCREEN --- Snapshot', () => {
  it('renders the links screen here', async () => {
    const tree = renderer.create(<ProductScreen
      items={items}
      navigation={navigation}
      addToCart={addToCart}
      />);
    expect(tree.getInstance().toggleModal()).toMatchSnapshot();
    expect(tree.getInstance().showAddModal()).toMatchSnapshot();
    expect(tree.getInstance().showCancelModal()).toMatchSnapshot();
    expect(tree.getInstance().hideAddModal()).toMatchSnapshot();
    expect(tree.getInstance().hideCancelModal()).toMatchSnapshot();
    expect(tree.getInstance().redirectToCart()).toMatchSnapshot();
    expect(tree.getInstance().onStarRatingPress(5)).toMatchSnapshot();
    expect(ProductScreen.navigationOptions({ navigation })).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });

  it('renders the links screen here', async () => {
    const tree = renderer.create(<ProductScreen
      navigation={navigationWithoutValue}
      addToCart={addToCart}
      items={items}
      />);
    expect(tree.getInstance().toggleModal()).toMatchSnapshot();
    expect(tree.getInstance().onStarRatingPress()).toMatchSnapshot();
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
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedProduct store={store}/>);
  });

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('items'))
      .toEqual(initialState.cart.items);
  });

  it('check action on dispatching ', () => {
    let action = '';
    store.dispatch(addToCart(product));
    action = store.getActions();
    expect(action[0].type).toBe('ADD_TO_CART');
  });
});
