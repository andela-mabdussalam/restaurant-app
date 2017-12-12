import { Notifications } from 'expo';
import React from 'react';
import { Easing, TouchableHighlight } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import SignupScreen from '../screens/SignupScreen';
import ShopScreen from '../screens/ShopScreen';
import ProductPage from '../screens/ProductScreen';
import SignOut from '../screens/SignOut';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: HomeScreen,
    },
    SignupPage: {
      screen: SignupScreen
    }
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
  Shop: { screen: ShopScreen },
  Cart: { screen: CartScreen },
  SignOut: { screen: SignOut },
}, {
  gesturesEnabled: false,
  drawerWidth: 160
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
  ProductScreen: {
    screen: ProductPage
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
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }


  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
  };

  render() {
    return <PrimaryNav />;
  }
}
