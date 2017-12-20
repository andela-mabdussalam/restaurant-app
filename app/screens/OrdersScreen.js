import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { View } from 'react-native';
import { StyledText as Text } from '../components/StyledText';
import { OrdersScreenStyles as styles } from '../styles/styles';
import Orders from '../components/Orders';

export class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders',
    drawerLabel: () => (
      <Text style={styles.drawer}>Orders</Text>
    ),
  };

  static propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    closeModal: PropTypes.func,
    navigation: PropTypes.object,
    data: PropTypes.object,
    userId: PropTypes.string,
    addReview: PropTypes.func

  }
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      isModalVisible: false,
      selectedOrder: [],
      ratingStarCount: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.subscription = newProps.data.subscribeToMore({
        document: gql`
        subscription {
          Order(filter: {
            mutation_in: [CREATED]
          }) {
            node {
              id
              items
              total
              createdAt
            }
          }
        }
        `,
        variables: null,

        updateQuery: (previousState, { subscriptionData }) => {
          const newOrder = subscriptionData.data.Order.node;
          return {
            allOrders: [
              {
                ...newOrder
              },
              ...previousState.allOrders
            ]
          };
        },
        onError: err => err,
      });

      if (this.subscription) {
        if (newProps.data.allOrders !== this.props.data.allOrders) {
          this.subscription();
        }
      }
    }
  }

  _isLoggedIn = () => this.props.data.loggedInUser && this.props.data.loggedInUser.id !== '';

  onChangeText = (value, name) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.values[name] = value;
    this.setState(stateCopy);
  }

  closeModal= () => {
    this.setState({ isModalVisible: false });
  }

  openModal= (order) => {
    this.setState({ isModalVisible: true, selectedOrder: order[0] });
  }

  onReviewStarRatingPress = (rating, id) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.ratingStarCount[id] = rating;
    this.setState(stateCopy);
  }

  addReview = () => {
    const { values } = this.state;
    Object.keys(values).forEach((key) => {
      const { userId } = this.props;
      const productId = key;
      const review = values[key];
      const rating = this.state.ratingStarCount[key];
      this.props.addReview({
        variables: {
          review,
          productId,
          userId,
          rating
        }
      });
      this.setState({ isModalVisible: false });
    });
  }

  render() {
    if (this.props.data.loading) {
      return (<View><Text>Loading</Text></View>);
    }
    const { allOrders } = this.props.data;
    const { ratingStarCount, selectedOrder, isModalVisible } = this.state;
    return (
      <Orders
      allOrders={allOrders}
      openModal={this.openModal}
      closeModal={this.closeModal}
      ratingStarCount={ratingStarCount}
      addReview={this.addReview}
      onReviewStarRatingPress={this.onReviewStarRatingPress}
      onChangeText={this.onChangeText}
      selectedOrder={selectedOrder}
      isModalVisible={isModalVisible} />
    );
  }
}

const mapStateToProps = (state) => {
  const { items, total } = state.cart;
  return {
    items,
    total,
    userId: state.user.userId
  };
};

const ORDERS_QUERY = gql`
query allOrders($userId: ID) {
  allOrders(filter: {
    user:  {
      id_contains: $userId
    }
  }, orderBy: createdAt_DESC ) {
    id
    items
    total
    createdAt
  }
}
`;

const ADD_REVIEW = gql`
mutation addReview(
  $review: String!
  $productId: ID
  $userId: ID
  $rating: Int
){
  createReview(
    review: $review,
    productId: $productId,
    userId: $userId,
    rating: $rating
  )
    {
    id
    review
  }
}`;

const OrdersWithQuery = compose(
  graphql(
    ORDERS_QUERY,
    {
      options: { forcePolicy: 'cache-and-network' }
    }
  ),
  graphql(
    ADD_REVIEW,
    { name: 'addReview' }
  )
)(OrdersScreen);

export default connect(
  mapStateToProps,
  null
)(OrdersWithQuery);
