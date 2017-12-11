import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cart from '../components/Cart';

class CartScreen extends React.Component {
  static navigationOptions = {
    title: 'Cart',
    headerTitleStyle: {
      fontFamily: 'SinkinSans-200XLight'
    }
  };

  static propTypes = {
    login: PropTypes.func,
    input: PropTypes.object,
    handleSubmit: PropTypes.func,
    authenticateUserMutation: PropTypes.func,
    navigation: PropTypes.object,
    items: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      valueSelected: '1'
    };
  }

  render() {
    const { items } = this.props;
    return (
    <Cart items={items} />
    );
  }
}

const MapStateToProps = state => ({
  items: state.cart.items,
  another: state
});


export default connect(MapStateToProps, null)(CartScreen);

