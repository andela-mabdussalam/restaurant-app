/* eslint-disable no-console */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, destroy } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { validate } from '../utils';
import Signup from '../components/Signup';
import { addProducts, addTokenToStore, loginFail } from '../actions';

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
    addProducts: PropTypes.func,
    addTokenToStore: PropTypes.func,
    dispatch: PropTypes.func,
    productQuery: PropTypes.object
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
      this.props.addProducts(this.props.productQuery.allProducts);
      const { navigate } = this.props.navigation;
      this.props.addTokenToStore({
        token: response.data.signupUser.token,
        userId: response.data.signupUser.id
      });
      const tokenToString = response.data.signupUser.token.toString();
      const userId = response.data.signupUser.id.toString();
      this.storeAuthTokensLocally(tokenToString, userId);
      navigate('DrawerStack');
      this.props.dispatch(destroy('login'));
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

const PRODUCTS_QUERY = gql`
query allProducts {
  allProducts {
    id,
    name,
    description,
    imageUrl,
    price
  }
}
`;

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
      id
      token
      firstName
  }
}
`;


const SignupScreen = reduxForm({
  form: 'signup',
  validate,
})(SignupPage);

const SignupWithMutation = compose(
  graphql(
    SIGNUP_MUTATION,
    { name: 'signupUserMutation' }
  ),
  graphql(
    PRODUCTS_QUERY,
    { name: 'productQuery' }
  )
)(SignupScreen);

const mapStateToProps = (state) => {
  const { loginState } = state.user;
  return {
    loginState
  };
};

export default connect(
  mapStateToProps,
  { addProducts, addTokenToStore, loginFail }
)(SignupWithMutation);
