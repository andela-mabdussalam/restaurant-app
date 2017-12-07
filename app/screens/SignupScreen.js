/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import RenderInput from '../components/RenderInput';
import { validate } from '../utils';
import { HomeScreenStyles as styles } from '../styles/styles';

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
    console.log(email, password);
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
      console.error('An error occurred: ', e);
    }
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
            <Icon name='md-person-add' style={{ color: 'white', fontSize: 60 }}/>
            <Field
              name="firstName"
              component={RenderInput}
              placeholder="First Name"
            />
            <Field
              name="lastName"
              component={RenderInput}
              placeholder="Last Name"
            />
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
            <Field
              name="passwordConfirm"
              component={RenderInput}
              placeholder="Confirm Password"
              secureTextEntry
            />
            <Field
              name="phoneNum"
              component={RenderInput}
              placeholder="Phone Number"
            />
            <Button onPress={handleSubmit(this.handlePress)} color="#F7C04C" style={styles.button} block iconLeft>
              <Icon name='md-checkmark'/>
              <Text style={styles.buttonText}>    Submit</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
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
