import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, destroy, SubmissionError } from 'redux-form';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { validate } from '../utils';
import Signup from '../components/Signup';
import { addProducts, addTokenToStore, loginFail, removeProducts } from '../actions';

const window = Dimensions.get('window');

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
    productQuery: PropTypes.object,
    removeProducts: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: null,
      visibleHeight: window.height,
    };
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardDidShow = (e) => {
    const newSize = window.height - (e.endCoordinates.height * 1.3);
    this.setState({
      visibleHeight: newSize,
    });
  }

  keyboardDidHide = () => {
    this.setState({
      visibleHeight: window.height,
    });
  }

  handlePress = async (values) => {
    const {
      firstName, lastName, email, password, phoneNum
    } = values;
    const { navigate } = this.props.navigation;
    this.setState({ loading: true });
    try {
      const response = await this.props.signupUserMutation({
        variables: {
          firstName, lastName, email, password, phoneNum
        }
      });
      this.props.removeProducts();
      this.props.addProducts(this.props.productQuery.allProducts);
      this.props.addTokenToStore({
        token: response.data.signupUser.token,
        userId: response.data.signupUser.id
      });
      const tokenToString = response.data.signupUser.token.toString();
      const userId = response.data.signupUser.id.toString();
      this.storeAuthTokensLocally(tokenToString, userId);
      this.props.dispatch(destroy('signup'));
      this.setState({ loading: false });
      navigate('DrawerStack');
    } catch (e) {
      if (e.message.includes('Email')) {
        this.setState({ loading: false });
        throw new SubmissionError({ email: 'Invalid credentials' });
      } else {
        return ('An error occurred: ');
      }
    }
  }

  storeAuthTokensLocally = async (graphcoolToken) => {
    await AsyncStorage.setItem('graphcoolToken', graphcoolToken);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Signup
      handleSubmit={handleSubmit}
      handlePress={this.handlePress}
      loading={this.state.loading}
      visibleHeight={this.state.visibleHeight} />
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

export default connect(
  null,
  {
    addProducts,
    addTokenToStore,
    loginFail,
    removeProducts
  }
)(SignupWithMutation);
