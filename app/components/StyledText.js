import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const StyledText = props =>
  <Text
  {...props}
    style={[props.style, { fontFamily: 'SinkinSans-200XLight' }]}
  />;

StyledText.propTypes = {
  style: PropTypes.object
};
