import React from 'react';
import {
  Button,
  Icon,
} from 'native-base';
import {
  Text,
  View,
} from 'react-native';
import { HomeScreenStyles as styles } from '../styles/styles';

export default class SignOut extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  handleSignupPress = () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
  }
  render() {
    return (
      <View>
        <Button onPress={this.SignOut} color="#F7C04C" style={styles.button} block iconLeft>
          <Icon name='md-checkmark'/>
          <Text style={styles.buttonText}>    Sign Out</Text>
        </Button>
      </View>
    );
  }
}
