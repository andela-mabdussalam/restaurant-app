import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, ScrollView, TouchableHighlight } from 'react-native';
import { ShopStyles as styles } from '../styles/styles';

const Shop = ({
  products,
  onClickImage
}) =>
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
            <TouchableHighlight
            underlayColor="#f5f5f5"
            onPress={() => onClickImage(product)} >
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
</View>;

Shop.propTypes = {
  products: PropTypes.array,
  onClickImage: PropTypes.func,
};

export default Shop;
