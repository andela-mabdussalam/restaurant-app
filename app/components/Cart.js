import React from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  Button,
  Icon,
  Card,
  CardItem,
  Right
} from 'native-base';
import PropTypes from 'prop-types';
import { StyledText as Text } from './StyledText';
import { CartScreenStyles as styles } from '../styles/styles';


const Cart = ({
  items,
  increaseItemQuantity,
  decreaseItemQuantity,
  total
}) =>
  <View style={styles.container}>
    {items.length !== 0 && <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}>
      <View style={styles.main}>
        <Card >
          <CardItem style={styles.cardItem}>
            <View style={[styles.cardItemView, styles.flex]}>
              <Text smallFont customFont>ITEM</Text>
            </View>
            <View style={[styles.cardItemView, styles.quantity]}>
              <Text smallFont customFont>No</Text>
            </View>
            <View style={[styles.cardItemView, styles.price]}>
              <Text smallFont customFont>Price</Text>
            </View>
            <View style={[styles.cardItemView, styles.subTotal]}>
              <Text smallFont customFont>SubTotal</Text>
            </View>
            <View style={styles.removeAdd}>
              <Icon name="ios-add-outline"/>
            </View>
          </CardItem>
        </Card>
        {items.map((item, index) => (
          <Card key={index}>
            <CardItem style={styles.cardItem}>
              <View style={styles.content}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.Image}
                />
                <Text marginTop={15} marginLeft={6}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.itemNo}>
                <Text marginTop={15}>{item.quantity}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text marginTop={15}>&#8358;{item.price}</Text>
              </View>
              <View style={styles.subTotal}>
                <Text marginTop={15}>&#8358;{item.quantity * item.price}</Text>
              </View>
              <View style={styles.removeAdd}>
                <TouchableHighlight
                  underlayColor="#f5f5f5"
                  onPress={() => increaseItemQuantity(item)}
                >
                  <Icon name="ios-add-outline"/>
                </TouchableHighlight >
                <TouchableHighlight
                  underlayColor="#f5f5f5"
                  onPress={() => decreaseItemQuantity(item)}
                >
                  <Icon name="ios-remove-outline"/>
                </TouchableHighlight>
              </View>
            </CardItem>
          </Card>
          ))}
          <Card >
          <CardItem style={styles.cardItem}>
            <Right>
              <View style={styles.total}>
                <Text
                  fontSize={11}
                  customFont
                >
                TOTAL:       &#8358;{total}
                </Text>
              </View>
            </Right>
          </CardItem>
        </Card>
        <Button
          color="#F7C04C"
          style={styles.button}
          block
          iconLeft
        >
            <Icon name='md-checkmark'/>
            <Text>    CHECKOUT   </Text>
        </Button>
      </View>
    </ScrollView>}
    {items.length === 0 && <Card >
          <CardItem style={styles.cardItem}>
            <View style={[styles.cardItemView, styles.flex]}>
              <Text smallFont customFont>ITEM</Text>
            </View>
          </CardItem>
        </Card>
    }
  </View>;

Cart.propTypes = {
  items: PropTypes.array,
  increaseItemQuantity: PropTypes.func,
  decreaseItemQuantity: PropTypes.func,
  total: PropTypes.number
};

export default Cart;
