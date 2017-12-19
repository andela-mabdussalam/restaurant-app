import React from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, destroy } from 'redux-form';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { validate } from '../utils';
import { addProducts, addTokenToStore, loginFail } from '../actions';
import Home from '../components/Home';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    input: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    loginState: PropTypes.bool,
    loginFail: PropTypes.func,
    authenticateUserMutation: PropTypes.func,
    navigation: PropTypes.object,
    addProducts: PropTypes.func,
    productQuery: PropTypes.object,
    addTokenToStore: PropTypes.func
  }

  loginUser = async (values) => {
    const { email, password } = values;
    try {
      const response = await
        this.props.authenticateUserMutation({ variables: { email, password } });
      this.props.addProducts(this.props.productQuery.allProducts);
      const { navigate } = this.props.navigation;
      this.props.addTokenToStore({
        token: response.data.authenticateUser.token,
        userId: response.data.authenticateUser.id
      });
      const tokenToString = response.data.authenticateUser.token.toString();
      const userId = response.data.authenticateUser.id.toString();
      this.storeAuthTokensLocally(tokenToString, userId);
      navigate('DrawerStack');
      this.props.dispatch(destroy('login'));
    } catch (e) {
      this.props.loginFail(true);
      return ('An error occured');
    }
  }

  handleSignupPress = () => {
    const { navigate } = this.props.navigation;
    navigate('DrawerStack');
  }

  storeAuthTokensLocally = async (token, userId) => {
    await AsyncStorage.multiSet([['token', token], ['userId', userId]]);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Home
      handleSubmit={handleSubmit}
      loginUser={this.loginUser}
      loginFail={this.props.loginState}
      handleSignupPress= {this.handleSignupPress}/>
    );
  }
}

const AUTHENTICATE_EMAIL_USER = gql`
mutation AuthenticateUser($email: String!, $password: String!) {
  authenticateUser(email: $email, password: $password) {
    token,
    id
  }
}
`;

const PRODUCTS_QUERY = gql`
query allProducts {
  allProducts {
    name,
    description,
    imageUrl,
    price
  }
}
`;


const LoginForm = reduxForm({
  form: 'login',
  validate,
  destroyOnUnmount: true
})(HomeScreen);

const LoginWithMutation = compose(
  graphql(
    AUTHENTICATE_EMAIL_USER,
    { name: 'authenticateUserMutation' }
  ),
  graphql(
    PRODUCTS_QUERY,
    { name: 'productQuery' }
  )
)(LoginForm);

const mapStateToProps = (state) => {
  const { loginState } = state.user;
  return {
    loginState
  };
};

export default connect(
  mapStateToProps,
  { addProducts, addTokenToStore, loginFail }
)(LoginWithMutation);
