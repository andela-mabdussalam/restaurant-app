import { StyleSheet } from 'react-native';

export const ShopStyles = StyleSheet.create({
  shopView: {
    flexDirection: 'row',
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  productView: {
    padding: 4,
    backgroundColor: 'white',
    height: '100%'
  },
  productName: {
    fontSize: 17,
    marginTop: 10,
    fontFamily: 'SinkinSans-200XLight',
  },
  productPrice: {
    fontSize: 12,
    marginTop: 12,
    color: '#848482',
    fontFamily: 'SinkinSans-200XLight',
  },
  description: {
    fontSize: 15,
    fontFamily: 'SinkinSans-200XLight'
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: 'SinkinSans-200XLight',
    marginTop: 10,
    color: '#848482',
    lineHeight: 22
  },
  drawer: {
    fontFamily: 'SinkinSans-200XLight',
    padding: 15
  },
  hr: {
    borderTopWidth: 0.5,
    borderTopColor: '#848482',
    marginTop: 15,
    marginBottom: 5
  },
  shopContainer: {
    width: '49%'
  },
  fontFamily: {
    fontFamily: 'SinkinSans-200XLight',
    textAlign: 'center',
    fontSize: 11,
  },
  headerText: {
    width: '50%',
    borderWidth: 0.5,
    borderColor: '#F6E2B8',
    padding: 5,
    textAlign: 'center',
    fontFamily: 'SinkinSans-200XLight'
  },
  foodItems: {
    width: '100%',
    alignItems: 'center'
  },
  fiText: {
    textAlign: 'center',
    fontFamily: 'SinkinSans-200XLight',
    marginBottom: 10
  },
  Image: {
    width: '100%',
    height: 150,
    marginTop: 15
  },
  viewBody: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tabs: {
    width: '100%',
    flexDirection: 'row'
  }
});

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
  drawer: {
    fontFamily: 'SinkinSans-200XLight',
    padding: 15
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
  logoutButton: {
    backgroundColor: '#F7C04C',
    borderColor: '#F7C04C',
    borderWidth: 0.5,
    marginTop: '4%',
    height: 35
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: '#F7C04C',
    borderWidth: 0.5,
    marginTop: '4%',
    height: 35
  },
  buttonText: {
    color: 'white',
    fontSize: 12
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'SinkinSans-200XLight',
  },
  logoutBody: {
    fontSize: 14,
    fontFamily: 'SinkinSans-200XLight',
    marginBottom: 20
  },
  cancelText: {
    color: '#F7C04C',
    fontSize: 14,
    fontFamily: 'SinkinSans-200XLight',
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
export const ModalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  heading: {
    fontFamily: 'SinkinSans-200XLight',
    fontSize: 16
  },
  okButton: {
    backgroundColor: '#F7C04C',
    marginTop: '4%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'SinkinSans-200XLight'
  }
});
export const CartScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#F7C04C',
    marginTop: '4%',
    height: 40
  },
  Image: {
    width: 40,
    height: 40,
    marginTop: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  cartBody: {
    fontSize: 12,
    marginTop: 15,
  },
  pickerStyle: {
    width: 90,
  },
  cardItem: {
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 5
  },
  flex: {
    flex: 1,
    flexDirection: 'row'
  },
  cardItemView: {
    width: '40%',
    borderRightWidth: 0.5,
    borderRightColor: '#B2BEB5',
    padding: 6,
  },
  content: {
    width: '40%',
    borderRightWidth: 0.5,
    borderRightColor: '#f5f5f5',
    padding: 6,
    flex: 1,
    flexDirection: 'row'
  },
  quantity: {
    width: '15%'
  },
  price: {
    width: '15%'
  },
  itemNo: {
    width: '15%',
    height: '100%',
    borderRightWidth: 0.5,
    borderRightColor: '#f5f5f5',
    padding: 6
  },
  subTotal: {
    width: '20%',
    height: '100%',
    padding: 6,
    borderRightWidth: 0,
  },
  cardContent: {
    width: '15%',
    height: '100%',
    borderRightWidth: 0.5,
    borderRightColor: '#f5f5f5',
    padding: 6
  },
  fontSmall: {
    fontSize: 12
  },
  modal: {
    borderWidth: 0.5,
    borderColor: '#B2BEB5',
    padding: 3,
    marginTop: 10
  },
  modalText: {
    fontFamily: 'SinkinSans-100Thin',
    fontSize: 14
  },
  total: {
    padding: 10
  },
  dropdownText: {
    fontFamily: 'SinkinSans-100Thin',
    fontSize: 14,
    padding: 3
  },
  drawer: {
    fontFamily: 'SinkinSans-200XLight',
    padding: 15
  },
  removeAdd: {
    width: '7%',
  }
});
