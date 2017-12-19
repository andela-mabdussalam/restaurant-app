import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { reducer as formReducer } from 'redux-form';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getOperationAST } from 'graphql';
import { WebSocketLink } from 'apollo-link-ws';
import PropTypes from 'prop-types';
import RootNavigation from './app/navigation/RootNavigation';
import robotDev from './app/assets/images/robot-dev.png';
import robotProd from './app/assets/images/robot-prod.png';
import spaceMono from './app/assets/fonts/SpaceMono-Regular.ttf';
import allerLight from './app/assets/fonts/aller-light.ttf';
import OpenSansLight from './app/assets/fonts/OpenSans-Light.ttf';
import SinkinSans100Thin from './app/assets/fonts/SinkinSans-100Thin.ttf';
import SinkinSans200XLight from './app/assets/fonts/SinkinSans-200XLight.ttf';
import { CartReducer, ProductReducer, UserReducer } from './app/reducers';


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

const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjawabjc1002t0192hxqdy4uf',
  options: {
    reconnect: true,
  },
});

const uri = 'https://api.graph.cool/simple/v1/cjawabjc1002t0192hxqdy4uf';

const httpLink = new HttpLink({ uri });

const link = ApolloLink.split(
  (operation) => {
    const operationAST = getOperationAST(operation.query, operation.operationName);
    return !!operationAST && operationAST.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const middleware = [thunk];

const store = createStore(combineReducers({
  form: formReducer,
  cart: CartReducer,
  products: ProductReducer,
  user: UserReducer
}), composeWithDevTools(), applyMiddleware(...middleware));

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${store.getState().user.token}`
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: middlewareLink.concat(link),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

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
    /* eslint-disable no-console */
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
