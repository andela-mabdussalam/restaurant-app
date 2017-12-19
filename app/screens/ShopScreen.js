import React, { Component } from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { StyledText as Text } from '../components/StyledText';
import { ShopStyles as styles } from '../styles/styles';
import Shop from '../components/Shop';

/*
* ShopScreen component
*/
export class ShopScreen extends Component {
  static propTypes = {
    data: PropTypes.object,
    navigation: PropTypes.object,
    products: PropTypes.array
  }
  static navigationOptions = {
    title: 'Shop',
    headerTitleStyle: {
      fontFamily: 'SinkinSans-200XLight'
    },
    drawerLabel: () => (
      <Text style={styles.drawer}>Shop</Text>
    ),
  };

  onClickImage = (data) => {
    const { navigate } = this.props.navigation;
    navigate('ProductScreen', data);
  }

  _isLoggedIn = () =>
    this.props.data.loggedInUser && this.props.data.loggedInUser.id !== ''

  render() {
    const { products } = this.props;
    return (
    <Shop products={products} onClickImage={this.onClickImage}/>
    );
  }
}
const LOGGED_IN_USER = gql`
query LoggedInUser {
  loggedInUser {
    id
  }
}`;

const ShopWithQuery = compose(graphql(
  LOGGED_IN_USER,
  { options: { fetchPolicy: 'network-only' } }
))(ShopScreen);

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  null
)(ShopWithQuery);
