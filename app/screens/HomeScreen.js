import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import {
  Button,
  Icon,
} from 'native-base';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { validate } from '../utils';
import { HomeScreenStyles as styles } from '../styles/styles';
import RenderInput from '../components/RenderInput';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    login: PropTypes.func,
    input: PropTypes.object,
    handleSubmit: PropTypes.func,
    authenticateUserMutation: PropTypes.func,
    navigation: PropTypes.object
  }

  loginUser = async (values) => {
    const { email, password } = values;
    try {
      const response = await
        this.props.authenticateUserMutation({ variables: { email, password } });
      const { navigate } = this.props.navigation;
      const tokenToString = response.data.authenticateUser.token.toString();
      this.storeAuthTokensLocally(tokenToString);
      navigate('ShopScreen');
    } catch (e) {
      console.log('An error occurred: ', e);
    }
  }
  handleSignupPress = () => {
    const { navigate } = this.props.navigation;
    navigate('SignupPage');
  }
  storeAuthTokensLocally = async (graphcoolToken) => {
    await AsyncStorage.setItem('graphcoolToken', graphcoolToken);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.main}>
            <View style={styles.logoContainer}>
              <Text style={styles.largeText}>Sign  In</Text>
              <Text style={styles.logoText}>Restaurant</Text>
            </View>
            <Field
              name="email"
              component={RenderInput}
              placeholder="E-mail"
            />
            <Field
              name="password"
              component={RenderInput}
              placeholder="Password"
              secureTextEntry
            />
            <Button onPress={handleSubmit(this.loginUser)} color="#F7C04C" style={styles.button} block iconLeft>
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

const AUTHENTICATE_EMAIL_USER = gql`
mutation AuthenticateUser($email: String!, $password: String!) {
  authenticateUser(email: $email, password: $password) {
    token
  }
}
`;


const LoginForm = reduxForm({
  form: 'login',
  validate,
})(HomeScreen);

const LoginWithMutation = compose(graphql(AUTHENTICATE_EMAIL_USER, { name: 'authenticateUserMutation' }))(LoginForm);

export default LoginWithMutation;
