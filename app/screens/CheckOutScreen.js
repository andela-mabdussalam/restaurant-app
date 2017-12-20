import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { View, Text } from 'react-native';
import CheckOut from '../components/CheckOut';
import { clearCart } from '../actions';

export class CheckOutScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Order Detail',
  });

  static propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    closeModal: PropTypes.func,
    navigation: PropTypes.object,
    data: PropTypes.object,
    checkOutMutation: PropTypes.func,
    clearCart: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  _isLoggedIn = () => this.props.data.loggedInUser && this.props.data.loggedInUser.id !== '';

  completed = () => {
    const {
      total,
      data: { loggedInUser: { id } }
    } = this.props;
    const items = JSON.stringify(this.props.items);
    this.props.navigation.navigate('Shop');
    const userId = id;
    this.props.checkOutMutation({ variables: { items, total, userId } });
    this.props.clearCart();
  }
  render() {
    const { items, total } = this.props;
    if (this._isLoggedIn()) {
      return <CheckOut
      items={items}
      closeModal={this.props.closeModal.bind(this)}
      total={total}
      value={this.state.value}
      completed={this.completed}
    />;
    }
    return <View>
      <Text>Log out and Log in again</Text>
      </View>;
  }
}

const mapStateToProps = (state) => {
  const { items, total } = state.cart;
  return {
    items,
    total
  };
};

const CHECKOUT_MUTATION = gql`
mutation createOrder(
  $items: [Json!]
  $total: Int!
  $userId: ID
  ){
    createOrder(
      items: $items,
      total: $total,
      userId: $userId,
    ){
      id
    }
  }
`;

const LOGGED_IN_USER = gql`
query LoggedInUser {
  loggedInUser {
    id
  }
}
`;
const checkOutWithMutation = compose(
  graphql(
    CHECKOUT_MUTATION,
    { name: 'checkOutMutation' }
  ),
  graphql(
    LOGGED_IN_USER,
    { options: { fetchPolicy: 'network-only' } }
  )
)(CheckOutScreen);

export default connect(
  mapStateToProps,
  { clearCart }
)(checkOutWithMutation);
