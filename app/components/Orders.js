import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import {
  Button,
  Card,
  CardItem
} from 'native-base';
import lodash from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { StyledText as Text } from './StyledText';
import { OrdersScreenStyles as styles } from '../styles/styles';

const Orders = ({
  allOrderses,
}) =>
  <View style={styles.view}>
    <ScrollView>
      { allOrderses && allOrderses.map((order, index) => (
        <Card key={index} style= {{ padding: 20 }}>
          <CardItem>
            <Button
                color="#F7C04C"
                style={styles.cancelButton}
                block
                iconLeft
              >
                <Text>DATE ORDERED: {moment(order.createdAt).format('Do MMMM YYYY')} </Text>
            </Button>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={styles.textStyle}> NO </Text>
            <Text style={styles.textStyle}> ITEM </Text>
            <Text style={styles.textStyle}>QUANTITY</Text>
          </CardItem>
          {
            lodash.flattenDeep(order.items).map((item, number) => (
              <CardItem key={number} style={styles.cardItem}>
                <Text style={styles.textStyle}> {number + 1}. </Text>
                <Text style={styles.textStyle}> {item.name} </Text>
                <Text style={styles.textStyle}>{item.quantity}</Text>
              </CardItem>
            ))
          }
          <CardItem style={styles.cardItem}>
            <View style={styles.viewStyle}/>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text>TOTAL AMOUNT PAID:  {order.total}</Text>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <View style={styles.viewStyle}/>
          </CardItem>
        </Card>
      ))}
    </ScrollView>
  </View>;

Orders.propTypes = {
  allOrderses: PropTypes.array,
};

export default Orders;
