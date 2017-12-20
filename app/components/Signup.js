import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Icon,
} from 'native-base';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { HomeScreenStyles as styles } from '../styles/styles';
import RenderInput from '../components/RenderInput';


const Signup = ({ handleSubmit, handlePress }) =>
  <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.main}>
        <Icon name='md-person-add' style={styles.signupIcon}/>
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
        <Button onPress={handleSubmit(handlePress)} color="#F7C04C" style={styles.button} block iconLeft>
          <Icon name='md-checkmark'/>
          <Text style={styles.buttonText}>    Submit</Text>
        </Button>
      </View>
    </ScrollView>
  </View>;

Signup.propTypes = {
  handleSubmit: PropTypes.func,
  handlePress: PropTypes.func
};

export default Signup;
