import { StyleSheet } from 'react-native';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D57E56',
  },
  contentContainer: {
    paddingTop: 30,
  },
  main: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  buttonsView: {
    alignItems: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    height: 40,
    marginTop: '8%',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: 'white',
  },
  errorStyle: {
    borderColor: 'red',
  },
  textInputStyle: {
    fontFamily: 'SinkinSans-200XLight',
    fontSize: 12,
  },
  inputView: {
    marginTop: '3%',
    backgroundColor: '#E0956D',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    padding: 10,
    fontSize: 12,
    color: 'red'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
    fontFamily: 'SinkinSans-200XLight',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#F7C04C',
    marginTop: '4%',
    height: 40
  },
  buttonText: {
    color: 'white',
    fontSize: 12
  },
  largeText: {
    fontSize: 30,
    fontFamily: 'SinkinSans-100Thin',
    color: 'white',
  },
  logoContainer: {
    marginTop: '9%',
    marginBottom: 30
  },
  inputContainer: {
    marginTop: '15%',
  },
  logoText: {
    color: '#F7C04C',
    fontFamily: 'SinkinSans-100Thin',
    fontSize: 18
  },
  googleLoginBtn: {
    backgroundColor: '#C6563B',
    width: '50%'
  },
  facebookLoginBtn: {
    backgroundColor: '#445EA9',
    width: '50%',
    paddingTop: 0,
    paddingBottom: 0
  },
  forgotPassword: {
    color: 'white',
    fontSize: 12,
    marginTop: 20,
  },
  signUpText: {
    color: '#F7C04C',
    fontSize: 12,
    marginTop: 20,
  },
  lineStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#BEB5B2',
    width: 100,
    margin: 7,
  }
});
