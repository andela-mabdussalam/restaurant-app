import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
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
  isAddModalVisible,
  isCancelModalVisible,
  toggleModal,
  hideAddModal,
  redirectToCart,
  hideCancelModal,
  onStarRatingPress,
  disabled
}) =>
<View style={styles.productView}>
  <View>
    <Image
      source={{ uri: params.imageUrl }}
      style={{ width: imgWidth, height: imgHeight }}
    />
  </View>
  <View>
    <Text style={styles.productName}>{ params.name }</Text>
  </View>
  <View style={{ flexDirection: 'row', display: 'flex' }}>
    <View>
      <Text style={styles.productPrice}>Price: N{ params.price }</Text>
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
      onPress={toggleModal}
      underlayColor='fffff'
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
    <Modal isVisible={isAddModalVisible}>
      <View style={ModalStyle.modalContent}>
        <Text style={ModalStyle.heading}>Added to Cart</Text>
        <Icon
          name='ios-checkmark-circle-outline'
          style={{ fontSize: 100, color: '#F7C04C' }}/>
        <Button
          onPress={hideAddModal}
          color="#F7C04C"
          style={ModalStyle.okButton}
          disabled={disabled}
        >
          <Text style={ModalStyle.buttonText}>     OK    </Text>
        </Button>
      </View>
    </Modal>
    <Modal isVisible={isCancelModalVisible}>
      <View style={ModalStyle.modalContent}>
        <Text style={ModalStyle.heading}>Item Previously added to Cart</Text>
        <Button
          onPress={hideCancelModal}
          color="#F7C04C"
          style={ModalStyle.okButton}
        >
          <Text style={ModalStyle.buttonText}>    ADD ANOTHER ITEM    </Text>
        </Button>
        <Button
          onPress={redirectToCart}
          color="#F7C04C"
          style={ModalStyle.okButton}
        >
          <Text style={ModalStyle.buttonText}>    GO TO CART    </Text>
        </Button>
      </View>
    </Modal>
    </View>
  </View>
  <View style={styles.hr} />
  <Text style={styles.description}> Description </Text>
  <Text style={styles.descriptionText}>{params.description}</Text>
</View>;

Product.propTypes = {
  params: PropTypes.object,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  starCount: PropTypes.number,
  onStarRatingPress: PropTypes.func,
  isAddModalVisible: PropTypes.bool,
  isCancelModalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
  hideAddModal: PropTypes.func,
  redirectToCart: PropTypes.func,
  hideCancelModal: PropTypes.func,
  disabled: PropTypes.bool

};

export default Product;
