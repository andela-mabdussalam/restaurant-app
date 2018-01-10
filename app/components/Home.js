import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
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
import { StyledText as Text } from './StyledText';
import Loader from './Loader';

const Home = ({
  handleSubmit,
  loginUser,
  handleSignupPress,
  loginFail,
  loading,
  visibleHeight,
  handleFacebookLogin,
  handleGoogleLogin
}) =>
<View style={{ height: visibleHeight, backgroundColor: '#D57E56' }}>
<ScrollView keyboardShouldPersistTaps={'handled'}>
    <View style={styles.main}>
      <View style={styles.logoContainer}>
        <Text style={styles.largeText}>Sign  In</Text>
        <Text style={styles.logoText}>Restaurant</Text>
      </View>
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
      {loginFail &&
      <View style={styles.loginFailView}>
        <Icon name='alert' style={styles.loginFail}/>
        <Text style={styles.loginFailText}>Invalid Username or Password</Text>
      </View>}
      <Button onPress={handleSubmit(loginUser)} color="#F7C04C" style={styles.button} block iconLeft>
        <Icon name='md-checkmark'/>
        <Text style={styles.buttonText}>    Login</Text>
      </Button>
      <Text style={styles.forgotPassword}>
        Forgot Password?
      </Text>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.forgotPassword}>Do not have account?  </Text>
          <TouchableOpacity onPress={handleSignupPress}>
            <Text style={styles.signUpText}>Sign Up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={styles.helpContainer}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.lineStyle}/>
        <Text style={styles.forgotPassword}>
          Or Log In with
        </Text>
        <View style={styles.lineStyle}/>
      </View>
    </View>
    <View style={styles.buttonsView} >
      <Button
      onPress={handleFacebookLogin}
      style={styles.facebookLoginBtn}
      color="#F7C04C"
      block
      iconLeft>
          <Icon name='logo-facebook' />
          <Text style={styles.buttonText}>  Facebook</Text>
      </Button>
      <Button
      onPress={handleGoogleLogin}
      color="#F7C04C"
      style={styles.googleLoginBtn}
      block
      iconLeft>
          <Icon name='logo-google' />
          <Text style={styles.buttonText}>  Google</Text>
      </Button>
    </View>
    <View style={styles.paddingView}/>
    { loading && <Loader loading={loading} />
}
    </ScrollView>
</View>;

Home.propTypes = {
  handleSubmit: PropTypes.func,
  loginUser: PropTypes.func,
  handleSignupPress: PropTypes.func,
  handleFacebookLogin: PropTypes.func,
  handleGoogleLogin: PropTypes.func,
  loginFail: PropTypes.bool,
  loading: PropTypes.bool,
  visibleHeight: PropTypes.number
};

export default Home;
