import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledText as Text } from '../components/StyledText';
import Cart from '../components/Cart';
import { increaseItemQuantity, decreaseItemQuantity } from '../actions';
import { CartScreenStyles as styles } from '../styles/styles';

export class CartScreen extends React.Component {
  static navigationOptions = {
    title: 'Cart',
    drawerLabel: () => (
      <Text style={styles.drawer}>Cart</Text>
    ),
  };

  static propTypes = {
    login: PropTypes.func,
    input: PropTypes.object,
    handleSubmit: PropTypes.func,
    authenticateUserMutation: PropTypes.func,
    navigation: PropTypes.object,
    items: PropTypes.array,
    increaseItemQuantity: PropTypes.func,
    decreaseItemQuantity: PropTypes.func,
    total: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      valueSelected: '1',
      quantity: '1',
      isModalVisible: false
    };
  }

  redirectToShop = () => {
    this.props.navigation.navigate('Shop');
  }
  closeModal= () => {
    this.setState({ isModalVisible: false });
  }

  openModal= () => {
    this.setState({ isModalVisible: true });
  }
  render() {
    const {
      items,
      total,
    } = this.props;
    return (
    <Cart
      items={items}
      isModalVisible={this.state.isModalVisible}
      openModal={this.openModal}
      closeModal={this.closeModal}
      increaseItemQuantity={this.props.increaseItemQuantity}
      decreaseItemQuantity={this.props.decreaseItemQuantity}
      total={total}
      redirectToShop={this.redirectToShop}
      navigation={this.props.navigation}
    />
    );
  }
}

const mapStateToProps = (state) => {
  const { items, total } = state.cart;
  return {
    items,
    total
  };
};


export default connect(
  mapStateToProps,
  {
    increaseItemQuantity,
    decreaseItemQuantity
  }
)(CartScreen);

