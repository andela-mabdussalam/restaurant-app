import React from 'react';
import {
  ScrollView,
  View,
  Image,
  TextInput
} from 'react-native';
import {
  Button,
  Card,
  Icon,
  CardItem,
  Content
} from 'native-base';
import lodash from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import { StyledText as Text } from './StyledText';
import { OrdersScreenStyles as styles } from '../styles/styles';

const Orders = ({
  allOrders,
  ratingStarCount,
  onReviewStarRatingPress,
  addReview,
  selectedOrder,
  openModal,
  closeModal,
  onChangeText,
  isModalVisible
}) =>
<View style={styles.view}>
  <ScrollView>
    { allOrders && allOrders.map((order, index) => (
      <Card key={index} style= {styles.card}>
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
        <CardItem>
          <Button
            color='white'
            block
            iconLeft
            onPress={() => openModal(order.items)}
            style={styles.reviewButton}
          >
            <Text color='white'>ADD REVIEW</Text>
          </Button>
        </CardItem>
      </Card>
    ))}
    <Modal isVisible={isModalVisible}>
      <Content>
        <Card style={styles.card}>
          <CardItem>
            <Button
              color="#F7C04C"
              style={styles.cancelButton}
              block
              iconLeft
            >
              <Text>ADD YOUR REVIEWS </Text>
            </Button>
          </CardItem>
          { selectedOrder.map((item, number) => (
            <CardItem key={number} style={styles.reviewCardItem}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.Image}
              />
              <View style={{ marginLeft: 10, width: '66%' }}>
                <Text style={styles.reviewText}> {item.name} </Text>
                <View style={{ width: '40%', marginTop: 10 }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={ratingStarCount[item.id]}
                    starSize={16}
                    starColor={'#F7C04C'}
                    selectedStar={rating => onReviewStarRatingPress(rating, item.id)}
                  />
                </View>
                <TextInput
                  underlineColorAndroid='rgba(0,0,0,0)'
                  multiline
                  placeholder={'Add your reviews'}
                  style={styles.textInput}
                  onChangeText={text => onChangeText(text, item.id)}
                />
              </View>
            </CardItem>
            ))
          }
          <CardItem>
            <Button
              color='white'
              block
              iconLeft
              onPress={addReview}
              style={styles.reviewButton}
            >
              <Text color='white'>SUBMIT REVIEW</Text>
            </Button>
          </CardItem>
          <CardItem>
            <Button
              color='white'
              block
              iconLeft
              onPress={closeModal}
              style={styles.reviewButton}
            >
              <Text color='white'>CANCEL</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Modal>
    {allOrders.length === 0 &&
    <Content>
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text fontSize={15} > SORRY, YOU HAVE NO ORDERS</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <Icon name="ios-sad-outline" style={styles.Icon}/>
        </CardItem>
      </Card>
    </Content>
    }
  </ScrollView>
</View>;

Orders.propTypes = {
  allOrders: PropTypes.array,
  ratingStarCount: PropTypes.object,
  onReviewStarRatingPress: PropTypes.func,
  addReview: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  isModalVisible: PropTypes.bool,
  onChangeText: PropTypes.func,
  selectedOrder: PropTypes.array
};

export default Orders;
