import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import RootNavigation from './navigation/RootNavigation';
import robotDev from './assets/images/robot-dev.png';
import robotProd from './assets/images/robot-prod.png';
import spaceMono from './assets/fonts/SpaceMono-Regular.ttf';
import allerLight from './assets/fonts/aller-light.ttf';
import OpenSansLight from './assets/fonts/OpenSans-Light.ttf';
import SinkinSans100Thin from './assets/fonts/SinkinSans-100Thin.ttf';
import SinkinSans200XLight from './assets/fonts/SinkinSans-200XLight.ttf';

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
export default class App extends React.Component {
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
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View>
    );
  }
}
