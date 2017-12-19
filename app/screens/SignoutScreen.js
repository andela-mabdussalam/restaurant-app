import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledText as Text } from '../components/StyledText';
import { HomeScreenStyles as styles } from '../styles/styles';
import Signout from '../components/Signout';
import { removeAuth } from '../actions';

export class SignoutScreen extends Component {
  static navigationOptions = {
    title: 'LogOut',
    drawerLabel: () => (
      <Text style={styles.drawer}>LogOut</Text>
    ),
  };
  static propTypes = {
    navigation: PropTypes.object,
    clearAuth: PropTypes.func,
    removeAuth: PropTypes.func
  }
  handleCancel = () => {
    const { navigate } = this.props.navigation;
    navigate('DrawerStack');
  }
  handleLogout =() => {
    const { navigate } = this.props.navigation;
    this.removeAuthToken();
    navigate('Main');
  }
  removeAuthToken = async () => {
    this.props.removeAuth();
    await AsyncStorage.removeItem('token');
  }
  render() {
    return (
      <Signout
        handleCancel={this.handleCancel}
        handleLogout={this.handleLogout}
      />
    );
  }
}

export default connect(
  null,
  { removeAuth }
)(SignoutScreen);

