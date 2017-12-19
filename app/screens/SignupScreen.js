/* eslint-disable no-console */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { validate } from '../utils';
import Signup from '../components/Signup';

export class SignupPage extends Component {
  static navigationOptions = {
    title: 'Signup',
  };

  static propTypes = {
    signup: PropTypes.func,
    input: PropTypes.object,
    navigation: PropTypes.object,
    handleSubmit: PropTypes.func,
    authenticateUserMutation: PropTypes.func,
    signupUserMutation: PropTypes.func,
  }

  handlePress = async (values) => {
    const {
      firstName, lastName, email, password, phoneNum
    } = values;
    try {
      const response = await this.props.signupUserMutation({
        variables: {
          firstName, lastName, email, password, phoneNum
        }
      });
      const { navigate } = this.props.navigation;
      const tokenToString = response.data.signupUser.token.toString();
      this.storeAuthTokensLocally(tokenToString);
      navigate('ShopScreen', { name: response.data.signupUser.firstName });
    } catch (e) {
      return ('An error occurred: ', e);
    }
  }

  storeAuthTokensLocally = async (graphcoolToken) => {
    await AsyncStorage.setItem('graphcoolToken', graphcoolToken);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Signup handleSubmit={handleSubmit} handlePress={this.handlePress} />
    );
  }
}

const SIGNUP_MUTATION = gql`
mutation SignupUser(
  $firstName: String!,
  $lastName : String!,
  $email: String!,
  $password: String!,
  $phoneNum: String!
){
  signupUser(
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    password: $password,
    phoneNum: $phoneNum) {
      token
      firstName
  }
}
`;

const SignupScreen = reduxForm({
  form: 'signup',
  validate,
})(SignupPage);

const SignupWithMutation =
compose(graphql(SIGNUP_MUTATION, { name: 'signupUserMutation' }))(SignupScreen);

export default SignupWithMutation;
