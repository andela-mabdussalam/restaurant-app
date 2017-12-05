import React, { Component } from 'react';
import axios from 'axios';
import { View, Image, Text, ScrollView } from 'react-native';
import Papa from 'papaparse';
import { ShopStyles as styles } from '../styles/styles';
/*
* Stories component
*/
export default class ShopScreen extends Component {
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

  sortData(data) {
    const dataArray = [];
    data.forEach((element) => {
      const dataObj = {
        Name: element[0],
        Price: element[1],
        ImageUrl: element[2]
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
          <View key={index} >
                <View>
                <Image source={{ uri: tile.ImageUrl }} style={styles.Image} />
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
