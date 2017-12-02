/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
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
    navigation: PropTypes.object
  }

  render() {
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
            />
            <Field
              name="passwordConfirm"
              component={RenderInput}
              placeholder="Confirm Password"
            />
            <Field
              name="phoneNum"
              component={RenderInput}
              placeholder="Phone Number"
            />
            <Button color="#F7C04C" style={styles.button} block iconLeft>
              <Icon name='md-checkmark'/>
              <Text style={styles.buttonText}>    Submit</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const SignupScreen = reduxForm({
  form: 'signup',
  validate,
})(SignupPage);

export default SignupScreen;
