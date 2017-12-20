import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { addToCart } from '../actions';
import StackButton from '../components/StackButton';
import Product from '../components/Product';

/*
* ProductScreen component
*/

export class ProductScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Product Details',
    headerLeft: StackButton(navigation)
  });

  static propTypes = {
    navigation: PropTypes.object,
    addToCart: PropTypes.func,
    items: PropTypes.array,
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      starCount: 3.5,
      isAddModalVisible: false,
      isCancelModalVisible: false,
      disabled: false
    };
  }

  componentDidMount() {
    Image.getSize(this.props.navigation.state.params.imageUrl, () => {
      const screenWidth = Dimensions.get('window').width;
      this.setState({ imgWidth: screenWidth * 0.98, imgHeight: 260 });
    });
  }

  toggleModal = () => {
    const { items, navigation: { state: { params } } } = this.props;
    const locateItem = !!items.find(el => el.name === params.name);
    return locateItem ? this.showCancelModal() : this.showAddModal();
  }

  showAddModal = () => {
    this.setState({ isAddModalVisible: true });
  }

  showCancelModal = () => {
    this.setState({ isCancelModalVisible: true });
  }

  hideAddModal = () => {
    this.setState({ disabled: true });
    const { params } = this.props.navigation.state;
    this.setState({ isAddModalVisible: false });
    this.props.addToCart({ ...params, quantity: 1 });
    this.props.navigation.navigate('DrawerStack');
  }

  hideCancelModal = () => {
    this.setState({ isCancelModalVisible: false });
    this.props.navigation.navigate('DrawerStack');
  }

  redirectToCart = () => {
    this.setState({ isCancelModalVisible: false });
    this.props.navigation.navigate('Cart');
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const { allReviews } = this.props.data;
    const {
      imgWidth,
      imgHeight,
      starCount,
      isAddModalVisible,
      isCancelModalVisible,
    } = this.state;
    return (
      <Product
        allReviews={allReviews}
        params={params}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        toggleModal={this.toggleModal}
        onStarRatingPress={this.onStarRatingPress}
        starCount={starCount}
        isAddModalVisible={isAddModalVisible}
        isCancelModalVisible={isCancelModalVisible}
        hideAddModal={this.hideAddModal}
        hideCancelModal={this.hideCancelModal}
        redirectToCart={this.redirectToCart}
        disabled={this.state.disabled}
      />
    );
  }
}

const mapStateToProps = state => ({
  items: state.cart.items
});

const REVIEWS_QUERY = gql`
query reviews($productId: ID){
  allReviews(filter: {
    product: {
      id_contains: $productId
    }
  }){
    review
    createdAt
    rating
    user {
      firstName
    }
  }
}
`;

const ProductWithReviews = compose(graphql(
  REVIEWS_QUERY,
  {
    options: props => ({
      variables: {
        productId: props.navigation.state.params.id,
      },
    }),
  }
))(ProductScreen);

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductWithReviews);
