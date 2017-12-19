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
    data: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.subscription = newProps.data.subscribeToMore({
        document: gql`
        subscription {
          Orders(filter: {
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
          const newOrder = subscriptionData.data.Orders.node;
          return {
            allOrderses: [
              {
                ...newOrder
              },
              ...previousState.allOrderses
            ]
          };
        },
        onError: err => err,
      });

      if (this.subscription) {
        if (newProps.data.allOrderses !== this.props.data.allOrderses) {
          this.subscription();
        }
      }
    }
  }

  _isLoggedIn = () => this.props.data.loggedInUser && this.props.data.loggedInUser.id !== '';

  render() {
    if (this.props.data.loading) {
      return (<View><Text>Loading</Text></View>);
    }
    const { allOrderses } = this.props.data;
    return (
      <Orders allOrderses={allOrderses}/>
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
  allOrderses(filter: {
    user:  {
      id_contains: $userId
    }
  } ) {
    id
    items
    total
    createdAt
  }
}
`;

const OrdersWithQuery = compose(graphql(
  ORDERS_QUERY,
  {
    options: {
      forcePolicy: 'cache-and-network'
    }
  }
))(OrdersScreen);

export default connect(
  mapStateToProps,
  null
)(OrdersWithQuery);
