import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Card,
  CardItem,
  Content,
} from 'native-base';
import { View, TextInput, ScrollView } from 'react-native';
import { StyledText as Text } from './StyledText';
import { CartScreenStyles as styles } from '../styles/styles';

const CheckOut = ({
  items,
  closeModal,
  value,
  total,
  completed
}) =>
<ScrollView>
  <Content>
    <Card style= {styles.card}>
      <CardItem style={styles.cardItem}>
        <Text
        fontSize={15}
        > ORDER PROCESSED
        </Text>
      </CardItem>
      <CardItem style={styles.cardItem}>
          <Icon
            name="ios-thumbs-up-outline"
            style={styles.checkoutIcon}
          />
      </CardItem>
      <CardItem style={styles.cardItem}>
        <View style={styles.viewStyle}/>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <Text
        fontSize={15}
        > PAYMENT METHOD :  PAY ON DELIVERY
        </Text>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <View style={styles.viewStyle}/>
      </CardItem>
      {items.map((item, index) => (
        <CardItem key={index} style={styles.cardItem} >
          <Text
            fontSize={15}
            >
            {item.name}:      {item.quantity}
          </Text>
        </CardItem>
      ))}
      <CardItem style={styles.cardItem}>
        <View style={styles.viewStyle}/>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <Text
        fontSize={15}
        > TOTAL AMOUNT : &#8358;{total}
        </Text>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <View style={styles.viewStyle}/>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <Text
        fontSize={15}
        > ENTER DELIVERY ADDRESS
        </Text>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <Text
        fontSize={10}
        > (If different from saved address)
        </Text>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          multiline
          style={styles.textInput}
          value={value}
        />
      </CardItem>
      <CardItem style={styles.cardItem}>
        <View style={styles.viewStyle}/>
      </CardItem>
      <CardItem style={styles.cardButton}>
          <Button
            onPress={completed}
            color="#F7C04C"
            style={styles.cancelButton}
          >
          <Text>OK</Text>
        </Button>
      </CardItem>
      <CardItem style={styles.cardButton}>
          <Button
            onPress={closeModal}
            color="#F7C04C"
            style={styles.cancelButton}
          >
          <Text>CANCEL</Text>
        </Button>
      </CardItem>
    </Card>
  </Content>
</ScrollView>;

CheckOut.propTypes = {
  items: PropTypes.array,
  total: PropTypes.number,
  value: PropTypes.string,
  closeModal: PropTypes.func,
  completed: PropTypes.func
};

export default CheckOut;
