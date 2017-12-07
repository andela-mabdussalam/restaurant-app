import React, { Component } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon } from 'native-base';
import { ShopStyles as styles } from '../styles/styles';
/*
* Stories component
*/

export default class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      starCount: 3.5
    };
  }

  componentDidMount() {
    Image.getSize(this.props.navigation.state.params.ImageUrl, () => {
      const screenWidth = Dimensions.get('window').width;
      this.setState({ imgWidth: screenWidth * 0.98, imgHeight: 260 });
    });
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const { imgWidth, imgHeight } = this.state;
    return (
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
                rating={this.state.starCount}
                starSize={16}
                starColor={'#F7C04C'}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
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
          </View>
        </View>
        <View style={styles.hr} />
        <Text style={styles.description}> Description </Text>
        <Text style={styles.descriptionText}>{params.Description}</Text>
      </View>
    );
  }
}
ProductScreen.navigationOptions = {
  title: 'Product Details',
};

