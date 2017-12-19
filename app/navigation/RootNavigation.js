import React from 'react';
import { Easing, TouchableHighlight } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import SignupScreen from '../screens/SignupScreen';
import ShopPage from '../screens/ShopScreen';
import ProductPage from '../screens/ProductScreen';
import SignOut from '../screens/SignoutScreen';
import OrdersPage from '../screens/OrdersScreen';
import CartPage from '../screens/CartScreen';
import HomePage from '../screens/HomeScreen';
import CheckOutPage from '../screens/CheckOutScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: HomePage,
    },
    SignupPage: {
      screen: SignupScreen
    },
  },
  {
    navigationOptions: () => ({
      headerMode: 'float',
      headerTitleStyle: {
        fontWeight: 'normal',
        color: 'white',
        marginHorizontal: 80,
        fontFamily: 'SinkinSans-200XLight'
      },
      headerStyle: {
        backgroundColor: '#D57E56'
      },
      headerTintColor: 'white',
      headerBackTitleStyle: {
        color: 'white'
      }
    }),
  }
);

const drawerButton = navigation =>
<TouchableHighlight
  underlayColor='#D57E56'
  onPress={() => {
    if (navigation.state.index === 0) {
      navigation.navigate('DrawerOpen');
    } else {
      navigation.navigate('DrawerClose');
    }
  }
}><Icon style={{ fontSize: 30, color: 'white' }} name='ios-menu-outline'/></TouchableHighlight>;


const DrawerStack = DrawerNavigator({
  Shop: { screen: ShopPage },
  Cart: { screen: CartPage },
  Orders: { screen: OrdersPage },
  SignOut: { screen: SignOut },
}, {
  gesturesEnabled: false,
  drawerWidth: 160
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
  ProductScreen: {
    screen: ProductPage
  },
  CheckOutScreen: {
    screen: CheckOutPage
  }
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#D57E56',
      paddingLeft: 10,
    },
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation),
    headerTitleStyle: {
      fontFamily: 'SinkinSans-200XLight',
      fontWeight: 'normal',
    },
  })
});

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    easing: Easing.step0
  }
});
const PrimaryNav = StackNavigator({
  RootStackNavigator: { screen: RootStackNavigator },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'RootStackNavigator',
  transitionConfig: noTransitionConfig
});

export default class RootNavigator extends React.Component {
  render() {
    return <PrimaryNav />;
  }
}
