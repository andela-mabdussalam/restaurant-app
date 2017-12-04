import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Item,
  Input,
  Button,
  Icon,
} from 'native-base';
import PropTypes from 'prop-types';
import { HomeScreenStyles as styles } from '../styles/styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object
  };

  handleSignupPress = () => {
    const { navigate } = this.props.navigation;
    navigate('SignupPage');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.main}>
            <View style={styles.logoContainer}>
              <Text style={styles.largeText}>Sign  In</Text>
              <Text style={styles.logoText}>Restaurant</Text>
            </View>
            <Item style={styles.inputView}>
              <Input style={styles.textInputStyle} placeholder="Username" placeholderTextColor="white" />
            </Item>
            <Item style={styles.inputView}>
              <Input style={styles.textInputStyle} placeholder="Password" placeholderTextColor="white"/>
            </Item>
            <Button color="#F7C04C" style={styles.button} block iconLeft>
              <Icon name='md-checkmark'/>
              <Text style={styles.buttonText}>    Login</Text>
            </Button>


            <Text style={styles.forgotPassword}>
              Forgot Password?
            </Text>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.forgotPassword}>Do not have account?  </Text>
                <TouchableOpacity
                onPress={this.handleSignupPress}
                >
                  <Text style={styles.signUpText}>Sign Up here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.helpContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.lineStyle}/>
              <Text style={styles.forgotPassword}>
                Or Log In with
              </Text>
              <View style={styles.lineStyle}/>
            </View>
          </View>
          <View style={styles.buttonsView} >
            <Button color="#F7C04C" style={styles.facebookLoginBtn} block iconLeft>
                <Icon name='logo-facebook' />
                <Text style={styles.buttonText}>  Facebook</Text>
            </Button>
            <Button color="#F7C04C" style={styles.googleLoginBtn} block iconLeft>
                <Icon name='logo-google' />
                <Text style={styles.buttonText}>  Google</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
