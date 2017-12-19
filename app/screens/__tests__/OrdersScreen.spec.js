import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import thunk from 'redux-thunk';
import { StyledText as Text } from '../../components/StyledText';
import ConnectedOrders, { OrdersScreen } from '../OrdersScreen';

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

const data = {
  loading: true,
  Orders: {
    node: 'tewtwetwewe'
  }
};
const returned = () => 'hello';

const subscribe = (test) => {
  /* eslint-disable no-unused-vars */
  const unused = test + 1;
  return returned;
};

const newPropsWithoutOrderses = {
  data: {
    subscribeToMore: subscribe,
    Orders: {
      node: 'tewtwetwewe'
    },
    allOrderses: [{
      name: 'beans',
      description: 'beans rocks well'
    }]
  }
};

const allOrderses = [{
  name: 'beans',
  description: 'beans rocks well'
}];

const dataWithoutLoading = {
  Orders: {
    node: 'tewtwetwewe'
  },
  allOrderses: [{
    name: 'beans',
    description: 'beans rocks well'
  }]
};

// Test suites
describe('ORDERSSCREEN --- Snapshot', () => {
  it('renders the orders screen', async () => {
    const tree = renderer.create(<OrdersScreen
      data={data}
      allOrderses={allOrderses}
      />);
    expect(OrdersScreen.navigationOptions.drawerLabel())
      .toEqual(<Text
        style={{ fontFamily: 'SinkinSans-200XLight', padding: 15 }}
        >
        Orders
        </Text>);
    expect(tree).toMatchSnapshot();
  });

  it('renders the loading screen if loading', async () => {
    const tree = renderer.create(<OrdersScreen
      data={dataWithoutLoading}
      />);
    expect(tree).toMatchSnapshot();
  });
});

describe('ORDERSSCREEN --- Shallow rendering + passing the store directly', () => {
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
    container = shallow(<ConnectedOrders store={store}/>);
  });

  it('renders the connected component', () => {
    const wrapper = shallow(<OrdersScreen data={dataWithoutLoading}/>);
    expect(wrapper.length).toEqual(1);
    wrapper.setProps(newPropsWithoutOrderses);
  });

  it('check Prop matches with initialState', () => {
    expect(container.prop('items'))
      .toEqual(initialState.cart.items);
  });
});
