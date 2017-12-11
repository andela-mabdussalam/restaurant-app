import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon, Button } from 'native-base';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { ShopStyles as styles, ModalStyle } from '../styles/styles';


const Product = ({
  params,
  imgWidth,
  imgHeight,
  starCount,
  isModalVisible,
  showModal,
  hideModal,
  onStarRatingPress
}) =>
<View style={styles.productView}>
<View>
  <Image
  source={{ uri: params.ImageUrl }}
  style={{ width: imgWidth, height: imgHeight }}
  />
</View>
<View>
  <Text style={styles.productName}>{ params.Name }</Text>
</View>
<View style={{ flexDirection: 'row', display: 'flex' }}>
  <View>
    <Text style={styles.productPrice}>Price: N{ params.Price }</Text>
    <View style={{ marginTop: 10 }}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={starCount}
        starSize={16}
        starColor={'#F7C04C'}
        selectedStar={rating => onStarRatingPress(rating)}
      />
    </View>
  </View>
  <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
    <TouchableOpacity
     onPress={showModal}
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#F7C04C',
        borderRadius: 100,
      }}
    >
      <Icon name='md-cart' />
    </TouchableOpacity>
    <Modal isVisible={isModalVisible}>
      <View style={ModalStyle.modalContent}>
        <Text style={ModalStyle.heading}>Added to Cart</Text>
        <Icon name='ios-checkmark-circle-outline' style={{ fontSize: 100, color: '#F7C04C' }}/>
        <Button onPress={hideModal} color="#F7C04C" style={ModalStyle.okButton}>
          <Text style={ModalStyle.buttonText}>     OK    </Text>
        </Button>
      </View>
    </Modal>
  </View>
</View>
<View style={styles.hr} />
<Text style={styles.description}> Description </Text>
<Text style={styles.descriptionText}>{params.Description}</Text>
</View>;

Product.propTypes = {
  params: PropTypes.object,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  starCount: PropTypes.number,
  isModalVisible: PropTypes.bool,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  onStarRatingPress: PropTypes.func

};

export default Product;
