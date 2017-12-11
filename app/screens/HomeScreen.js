import React from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { validate } from '../utils';
import Home from '../components/Home';

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
      navigate('DrawerStack');
    } catch (e) {
      return ('An error occured');
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
      <Home
      handleSubmit={handleSubmit}
      loginUser={this.loginUser}
      handleSignupPress= {this.handleSignupPress}/>
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
