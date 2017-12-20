import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import { Icon } from 'native-base';
import { StackButtonStyles as styles } from '../styles/styles';

const StackButton = navigation =>
<TouchableHighlight
  underlayColor='#D57E56'
  onPress={() => {
      navigation.navigate('DrawerStack');
  }
  }>
  <Icon
  style={styles.icon}
  name='ios-arrow-round-back-outline'/>
</TouchableHighlight>;

StackButton.propTypes = {
  navigation: PropTypes.object,
};

export default StackButton;
