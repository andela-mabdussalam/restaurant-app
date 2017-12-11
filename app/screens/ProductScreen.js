import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart } from '../actions';
import StackButton from '../components/StackButton';
import Product from '../components/Product';
/*
* Stories component
*/

class ProductScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Product Details',
    headerLeft: StackButton(navigation)
  });

  static propTypes = {
    navigation: PropTypes.object,
    addToCart: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      starCount: 3.5,
      isModalVisible: false
    };
  }

  componentDidMount() {
    Image.getSize(this.props.navigation.state.params.ImageUrl, () => {
      const screenWidth = Dimensions.get('window').width;
      this.setState({ imgWidth: screenWidth * 0.98, imgHeight: 260 });
    });
  }
  showModal = () => this.setState({ isModalVisible: true })

  hideModal = () => {
    this.setState({ isModalVisible: false });
    this.props.addToCart(this.props.navigation.state.params);
    this.props.navigation.navigate('DrawerStack');
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const { imgWidth, imgHeight, starCount } = this.state;
    return (
      <Product
      params={params}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      showModal={this.showModal}
      hideModal={this.hideModal}
      onStarRatingPress={this.onStarRatingPress}
      starCount={starCount}
      />
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart
});

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductScreen);
