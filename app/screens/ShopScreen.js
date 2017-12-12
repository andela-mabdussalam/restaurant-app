import React, { Component } from 'react';
import axios from 'axios';
import { View, Image, Text, ScrollView, TouchableHighlight } from 'react-native';
import Papa from 'papaparse';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { ShopStyles as styles } from '../styles/styles';

/*
* ShopScreen component
*/
class ShopScreen extends Component {
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

  sortData(data) {
    const dataArray = [];
    data.forEach((element) => {
      const dataObj = {
        Name: element[0],
        Price: element[1],
        ImageUrl: element[2],
        Description: element[3]
      };
      dataArray.push(dataObj);
    });
    dataArray.splice(0, 1);
    return dataArray;
  }

  render() {
    const { products } = this.props;
    return (
      <View style={styles.shopView}>
        <ScrollView>
          <View style={styles.viewBody}>
            <View style={styles.foodItems}>
              <Text style={styles.fiText}>Food Items</Text>
            </View>
            <View style={styles.tabs}>
              <Text style={styles.headerText}> Latest </Text>
              <Text style={styles.headerText}> New </Text>
            </View>
              {products.map((product, index) => (
                <View key={index} style={styles.shopContainer}>
                  <View>
                    <TouchableHighlight onPress={() => this.onClickImage(product)} >
                      <Image
                        source={{ uri: product.imageUrl }}
                        style={styles.Image}
                      />
                    </TouchableHighlight>
                  </View>
                  <View>
                    <Text style={styles.fontFamily}>{product.name}</Text>
                    <Text style={styles.fontFamily}>Price: N{product.price}</Text>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
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
