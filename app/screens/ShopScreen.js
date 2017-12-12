import React, { Component } from 'react';
import axios from 'axios';
import { View, Image, Text, ScrollView, TouchableHighlight } from 'react-native';
import Papa from 'papaparse';
import gql from 'graphql-tag';
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

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const _this = this;
    const REACT_APP_LATEST_STORIES_ENDPOINT = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSWz-frKTVxYhwCCeSpymyWl6FwhV8s2C5SGcZCmdf4Unyh1DdUCAMb-4viOjtnlJkfcnSmY2RqXSD1/pub?gid=0&single=true&output=csv';
    this.serverRequest =
      axios
        .get(REACT_APP_LATEST_STORIES_ENDPOINT)
        .then((response) => {
          const results = Papa.parse(response.data);
          const dataArray = _this.sortData(results.data);
          _this.setState({ data: dataArray });
        });
  }

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
    const { data } = this.state;
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
              {data.map((tile, index) => (
                <View key={index} style={styles.shopContainer}>
                  <View>
                    <TouchableHighlight onPress={() => this.onClickImage(tile)} >
                      <Image
                        source={{ uri: tile.ImageUrl }}
                        style={styles.Image}
                      />
                    </TouchableHighlight>
                  </View>
                  <View>
                    <Text style={styles.fontFamily}>{tile.Name}</Text>
                    <Text style={styles.fontFamily}>Price: N{tile.Price}</Text>
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

export default ShopWithQuery;
