import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import thunk from 'redux-thunk';
import ConnectedShop, { ShopScreen } from '../ShopScreen';
import { StyledText as Text } from '../../components/StyledText';

jest.mock('redux-form/lib/Field', () => 'Field');

// Test objects

const data = {
  loggedInUser: {
    id: 345656
  }
};

const navigation = {
  navigate: jest.fn(),
};

const products = [{
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

// Test suites
describe('SHOPSCREEN --- Snapshot', () => {
  it('captures snapshot of shopscreen', async () => {
    const tree = renderer.create(<ShopScreen
    products={products}
    data={data}
    navigation={navigation}
    />);
    expect(tree.getInstance()._isLoggedIn()).toMatchSnapshot();
    expect(tree.getInstance().onClickImage()).toMatchSnapshot();
    expect(ShopScreen.navigationOptions.drawerLabel())
      .toEqual(<Text
        style={{ fontFamily: 'SinkinSans-200XLight', padding: 15 }}
        >
        Shop
        </Text>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('SHOPSCREEN --- Shallow rendering + passing the store directly', () => {
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
    container = shallow(<ConnectedShop store={store}/>);
  });

  it('renders the connected component', () => {
    container = shallow(<ShopScreen
    products={products}
    navigation={navigation}
    />);
    container.find('Shop').dive().find('TouchableHighlight').first()
      .simulate('press');
    container.find('Shop').dive().find('TouchableHighlight').at(1)
      .simulate('press');
    expect(container.length).toEqual(1);
  });
});
