import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { combineReducers, createStore } from 'redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { reducer as formReducer } from 'redux-form';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import WebSocket from 'ws';
import RootNavigation from './app/navigation/RootNavigation';
import robotDev from './app/assets/images/robot-dev.png';
import robotProd from './app/assets/images/robot-prod.png';
import spaceMono from './app/assets/fonts/SpaceMono-Regular.ttf';
import allerLight from './app/assets/fonts/aller-light.ttf';
import OpenSansLight from './app/assets/fonts/OpenSans-Light.ttf';
import SinkinSans100Thin from './app/assets/fonts/SinkinSans-100Thin.ttf';
import SinkinSans200XLight from './app/assets/fonts/SinkinSans-200XLight.ttf';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cja8r6dcn33ui0154xhdkhlel', {
  reconnect: true,
  connectionParams: {
  }
}, WebSocket);
const uri = 'https://api.graph.cool/simple/v1/cja8r6dcn33ui0154xhdkhlel';

const httpLink = new HttpLink({ uri });

const linkWithSubscriptions = addGraphQLSubscriptions(
  httpLink,
  wsClient
);

const client = new ApolloClient({
  link: linkWithSubscriptions,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const store = createStore(combineReducers({
  form: formReducer
}));
export default class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  }
  state = {
    isLoadingComplete: false,
  };
  _loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      robotDev,
      robotProd,
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'space-mono': spaceMono,
      'aller-light': allerLight,
      'OpenSans-Light': OpenSansLight,
      'SinkinSans-100Thin': SinkinSans100Thin,
      'SinkinSans-200XLight': SinkinSans200XLight,
    }),
  ]);

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <RootNavigation />
          </View>
        </ApolloProvider>
      </Provider>
    );
  }
}
