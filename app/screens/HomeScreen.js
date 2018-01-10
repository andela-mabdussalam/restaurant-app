import React from 'react';
import { AsyncStorage, Alert, Dimensions, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { reduxForm, destroy } from 'redux-form';
import { Facebook, Google } from 'expo';
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
    authenticateGoogleUserMutation: PropTypes.func,
    authenticateFacebookUserMutation: PropTypes.func,
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

  handleGoogleLogin = async () => {
    const { navigate } = this.props.navigation;
    this.setState({ loading: true });
    try {
      const { type, idToken } = await Google.logInAsync({
        androidClientId: '503598624610-g0jc53rgs0fkgj43jj4o3mqftu8bsn0u.apps.googleusercontent.com',
        iosClientId: '503598624610-mbe0289qv45e534p71eng7q2uei9o52c.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (type === 'success') {
        try {
          const response = await this.props.authenticateGoogleUserMutation({
            variables: { googleToken: idToken }
          });
          this.loadApp(response.data.authenticateGoogleUser);
          navigate('DrawerStack');
          this.setState({ loading: false });
        } catch (error) {
          this.setState({ loading: false });
          Alert.alert(
            'Cancelled!',
            'User already exists!',
          );
          return { error };
        }
        return idToken;
      }
      return { cancelled: true };
    } catch (error) {
      return { error };
    }
  }

  handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1548552298543471',
        { permissions: ['public_profile', 'email', 'user_friends'], behavior: 'native' }
      );
      this.setState({ loading: true });
      switch (type) {
        case 'success': {
          try {
            const response = await this.props.authenticateFacebookUserMutation({
              variables: { facebookToken: token }
            });
            this.loadApp(response.data.authenticateFacebookUser);
          } catch (error) {
            return { error };
          }

          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (error) {
      this.setState({ loading: false });
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
      return { error };
    }
  };

  loadApp = (auth) => {
    const { navigate } = this.props.navigation;
    this.props.removeProducts();
    this.props.addProducts(this.props.productQuery.allProducts);
    this.props.addTokenToStore({
      token: auth.token,
      userId: auth.id
    });
    const tokenToString = auth.token.toString();
    const userId = auth.id.toString();
    this.storeAuthTokensLocally(tokenToString, userId);
    this.setState({ loading: false });
    navigate('DrawerStack');
  }

  loginUser = async (values) => {
    const { email, password } = values;
    const { navigate } = this.props.navigation;
    try {
      this.setState({ loading: true });
      const response = await
        this.props.authenticateUserMutation({ variables: { email, password } });
      Keyboard.dismiss();
      this.loadApp(response.data.authenticateUser);
      this.props.dispatch(destroy('login'));
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
        handleFacebookLogin={this.handleFacebookLogin}
        handleGoogleLogin={this.handleGoogleLogin}
        handleSignupPress= {this.handleSignupPress}
      />
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

const AUTH_FB_USER = gql`
mutation AuthenticateUserMutation($facebookToken: String!) {
  authenticateFacebookUser(facebookToken: $facebookToken) {
    token,
    id
  }
}`;

const AUTH_GOOGLE_USER = gql`
mutation AuthenticateGoogleUserMutation($googleToken: String!) {
  authenticateGoogleUser(googleToken: $googleToken) {
    token,
    id
  }
}`;

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
    AUTH_FB_USER,
    { name: 'authenticateFacebookUserMutation' }
  ),
  graphql(
    AUTH_GOOGLE_USER,
    { name: 'authenticateGoogleUserMutation' }
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
