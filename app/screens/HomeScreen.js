import React from 'react';
import { AsyncStorage, Dimensions, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, destroy } from 'redux-form';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { validate } from '../utils';
import { addProducts, addTokenToStore, loginFail, removeProducts } from '../actions';
import Home from '../components/Home';

const window = Dimensions.get('window');

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
    addTokenToStore: PropTypes.func,
    removeProducts: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visibleHeight: window.height,
    };
  }

  componentWillMount() {
    this.props.dispatch(destroy('login'));
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardDidShow = (e) => {
    const newSize = window.height - (e.endCoordinates.height * 1.08);
    this.setState({
      visibleHeight: newSize,
    });
  }

  keyboardDidHide = () => {
    this.setState({
      visibleHeight: window.height,
    });
  }

  closeModal = () => {
    this.setState({ loading: false });
  }

  loginUser = async (values) => {
    const { email, password } = values;
    try {
      this.setState({ loading: true });
      const response = await
        this.props.authenticateUserMutation({ variables: { email, password } });
      this.props.removeProducts();
      Keyboard.dismiss();
      this.props.addProducts(this.props.productQuery.allProducts);
      const { navigate } = this.props.navigation;
      this.props.addTokenToStore({
        token: response.data.authenticateUser.token,
        userId: response.data.authenticateUser.id
      });
      const tokenToString = response.data.authenticateUser.token.toString();
      const userId = response.data.authenticateUser.id.toString();
      this.props.dispatch(destroy('login'));
      this.storeAuthTokensLocally(tokenToString, userId);
      this.closeModal();
      navigate('DrawerStack');
    } catch (e) {
      this.setState({ loading: false });
      this.props.loginFail(true);
      return ('An error occured');
    }
  }

  handleSignupPress = () => {
    const { navigate } = this.props.navigation;
    navigate('SignupPage');
  }

  storeAuthTokensLocally = async (token, userId) => {
    await AsyncStorage.multiSet([['token', token], ['userId', userId]]);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Home
      closeModal={this.closeModal}
      handleSubmit={handleSubmit}
      loginUser={this.loginUser}
      loginFail={this.props.loginState}
      loading={this.state.loading}
      visibleHeight={this.state.visibleHeight}
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
    id,
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
  {
    addProducts,
    addTokenToStore,
    loginFail,
    removeProducts
  }
)(LoginWithMutation);
