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
  Content,
  Right,
} from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { StyledText as Text } from './StyledText';
import { CartScreenStyles as styles } from '../styles/styles';
import CheckOut from '../screens/CheckOutScreen';

const Cart = ({
  items,
  increaseItemQuantity,
  decreaseItemQuantity,
  total,
  redirectToShop,
  isModalVisible,
  openModal,
  navigation,
  closeModal
}) =>
  <View style={styles.container}>
    {items.length !== 0 && <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}>
      <View style={styles.main}>
        <Card >
          <CardItem style={styles.cardItem}>
            <View style={[styles.cardItemView, styles.flex]}>
              <Text smallFont >ITEM</Text>
            </View>
            <View style={[styles.cardItemView, styles.quantity]}>
              <Text smallFont >No</Text>
            </View>
            <View style={[styles.cardItemView, styles.price]}>
              <Text smallFont >Price</Text>
            </View>
            <View style={[styles.cardItemView, styles.subTotal]}>
              <Text smallFont >SubTotal</Text>
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
                >
                TOTAL:       &#8358;{total}
                </Text>
              </View>
            </Right>
          </CardItem>
        </Card>
        <Button
          onPress={openModal}
          color="#F7C04C"
          style={styles.button}
          block
          iconLeft
        >
            <Icon name='md-checkmark'/>
            <Text>    CHECKOUT   </Text>
        </Button>
        <Modal isVisible={isModalVisible}>
         <CheckOut closeModal={closeModal} navigation={navigation}/>
       </Modal>
      </View>
    </ScrollView>}
    {items.length === 0 &&
    <Content>
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text fontSize={15} > SORRY, YOUR CART IS EMPTY</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <Icon name="ios-sad-outline" style={styles.Icon}/>
        </CardItem>
        <CardItem style={styles.cardItem}>
        <Button onPress={redirectToShop} color="#F7C04C" style={styles.okButton}>
          <Text>    GO TO SHOP    </Text>
        </Button>
        </CardItem>
      </Card>
    </Content>
    }
  </View>;

Cart.propTypes = {
  items: PropTypes.array,
  increaseItemQuantity: PropTypes.func,
  decreaseItemQuantity: PropTypes.func,
  total: PropTypes.number,
  redirectToShop: PropTypes.func,
  isModalVisible: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  navigation: PropTypes.object
};

export default Cart;
