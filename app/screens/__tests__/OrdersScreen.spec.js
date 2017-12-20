import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import thunk from 'redux-thunk';
import { StyledText as Text } from '../../components/StyledText';
import ConnectedOrders, { OrdersScreen } from '../OrdersScreen';
import Orders from '../../components/Orders';
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
    allOrders: [{
      name: 'beans',
      description: 'beans rocks well'
    }]
  }
};

const allOrders = [{
  name: 'beans',
  description: 'beans rocks well',
  items: [[{ mariam: 'me' }]]
}];

const dataWithoutLoading = {
  Orders: {
    node: 'tewtwetwewe'
  },
  allOrders: [{
    name: 'beans',
    description: 'beans rocks well'
  }]
};

const selectedOrder = [{
  name: 'beans',
  description: 'beans rocks well'
}];

const ratingStarCount = {
  2: 'fdsfsdfs'
};

const order = [[{
  name: 'beans',
  description: 'beans rocks well'
}]];

const addReview = review => review;

const userId = 324567;

// Test suites
describe('ORDERSSCREEN --- Snapshot', () => {
  it('renders the orders screen', async () => {
    const tree = renderer.create(<OrdersScreen
      data={data}
      allOrders={allOrders}
      addReview={addReview}
      userId={userId}
      />);
    expect(tree.getInstance().openModal(order)).toMatchSnapshot();
    expect(OrdersScreen.navigationOptions.drawerLabel())
      .toEqual(<Text
        style={{ fontFamily: 'SinkinSans-200XLight', padding: 15 }}
        >
        Orders
        </Text>);
    expect(tree.getInstance().onChangeText('mariam', 25)).toMatchSnapshot();
    expect(tree.getInstance().addReview()).toMatchSnapshot();
    expect(tree.getInstance().closeModal()).toMatchSnapshot();
    expect(tree).toMatchSnapshot();
  });
  it('renders the orders screen', async () => {
    const tree = renderer.create(<Orders
      allOrders={allOrders}
      ratingStarCount={ratingStarCount}
      onReviewStarRatingPress={jest.fn()}
      addReview={jest.fn()}
      selectedOrder={selectedOrder}
      openModal={jest.fn()}
      closeModal={jest.fn()}
      onChangeText={jest.fn()}
      isModalVisible
      />);
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

  it('renders the presentational component', () => {
    container = shallow(<Orders
      allOrders={allOrders}
      ratingStarCount={ratingStarCount}
      onReviewStarRatingPress={jest.fn()}
      addReview={jest.fn()}
      selectedOrder={selectedOrder}
      openModal={jest.fn()}
      closeModal={jest.fn()}
      onChangeText={jest.fn()}
      isModalVisible
    />);
    expect(container.length).toEqual(1);
  });
});
