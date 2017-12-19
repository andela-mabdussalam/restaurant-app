import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { shallow, } from 'enzyme';
import thunk from 'redux-thunk';
import { StyledText as Text } from '../../components/StyledText';
import ConnectedSignout, { SignoutScreen } from '../SignoutScreen';
import { removeAuth } from '../../actions';

// Test objects


const navigation = {
  navigate: jest.fn(),
};

// Test suites
describe('SIGNOUTSCREEN --- Snapshot', () => {
  it('renders the sign out screen', async () => {
    const tree = renderer.create(<SignoutScreen
    removeAuth={removeAuth}
    navigation={navigation}
    />);
    expect(tree.getInstance().handleCancel()).toMatchSnapshot();
    expect(tree.getInstance().handleLogout()).toMatchSnapshot();
    expect(SignoutScreen.navigationOptions.drawerLabel())
      .toEqual(<Text
        style={{ fontFamily: 'SinkinSans-200XLight', padding: 15 }}
        >
        LogOut
        </Text>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('SIGNOUTSCREEN --- Shallow rendering + passing the store directly', () => {
  const initialState = {
    user: {
      token: 'fesfefs',
      userId: 32342342342,
      loginState: true
    }
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store, container, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedSignout store={store}/>);
  });

  it('renders the connected component', () => {
    expect(container.length).toEqual(1);
  });

  it('renders the connected component', () => {
    wrapper = shallow(<SignoutScreen
    navigation={navigation}
    removeAuth={removeAuth}
    />);
    expect(wrapper.length).toEqual(1);
  });

  it('check action on dispatching ', () => {
    let action = '';
    store.dispatch(removeAuth());
    action = store.getActions();
    expect(action[0].type).toBe('CLEAR_AUTH');
  });
});
