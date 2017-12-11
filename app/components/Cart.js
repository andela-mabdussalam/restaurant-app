import React from 'react';
import {
  ScrollView,
  View,
  Image
} from 'react-native';
import {
  Button,
  Icon,
  Card,
  CardItem,
} from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import { StyledText as Text } from './StyledText';
import { CartScreenStyles as styles } from '../styles/styles';


const Cart = ({ items }) =>
  <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.main}>
        <Card >
          <CardItem style={styles.cardItem}>
            <View style={styles.cardItemView}>
              <Text style={styles.font12}>ITEM</Text>
            </View>
            <View style={[styles.cardItemView, styles.quantity]}>
              <Text style={styles.font12}>No</Text>
            </View>
            <View style={[styles.cardItemView, styles.price]}>
              <Text style={styles.font12}>Price</Text>
            </View>
            <View style={[styles.cardItemView, styles.subTotal]}>
              <Text style={styles.font12}>SubTotal</Text>
            </View>
          </CardItem>
        </Card>
        {items.map((item, index) => (
          <Card key={index}>
            <CardItem style={styles.cardItem}>
              <View style={styles.content}>
                <Image source={{ uri: item.url }} style={styles.Image} />
                <Text style={styles.cartProductName}>
                {item.name}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <ModalDropdown
                defaultValue='  1  '
                style={styles.modal}
                textStyle={styles.modalText}
                dropdownTextStyle ={styles.dropdownText}
                options={['  1  ', '  2  ', '  3  ', '  4  ', '  5  ']}/>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cartBody}>Price</Text>
              </View>
              <View style={styles.subTotal}>
                <Text style={styles.cartBody}>SubTotal</Text>
              </View>
            </CardItem>
          </Card>
          ))}
        <Button color="#F7C04C" style={styles.button} block iconLeft>
            <Icon name='md-checkmark'/>
            <Text style={styles.buttonText}>    CHECKOUT   </Text>
        </Button>
      </View>
    </ScrollView>
  </View>;

Cart.propTypes = {
  items: PropTypes.array
};

export default Cart;
