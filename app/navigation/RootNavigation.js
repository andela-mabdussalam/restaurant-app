import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import SignupScreen from '../screens/SignupScreen';
import ShopScreen from '../screens/ShopScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    SignupPage: {
      screen: SignupScreen
    },
    ShopScreen: {
      screen: ShopScreen
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'center',
        marginHorizontal: 110
      },
      headerStyle: {
        backgroundColor: '#D57E56'
      },
      title: 'Shop',
      headerBackTitleStyle: {
        color: 'white'
      }
    }),
  }
);

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
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };

  render() {
    return <RootStackNavigator />;
  }
}
