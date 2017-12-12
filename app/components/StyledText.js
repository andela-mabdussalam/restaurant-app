import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const StyledText = (props) => {
  const inlineStyles = props.style || {};
  const {
    marginTop,
    color,
    marginLeft,
    fontSize
  } = props;

  if (props.customFont) {
    inlineStyles.fontFamily = 'SinkinSans-200XLight';
  }

  if (props.smallFont) {
    inlineStyles.fontSize = 11;
  }

  if (props.fontSize) {
    inlineStyles.fontSize = fontSize;
  }

  if (props.marginTop) {
    inlineStyles.marginTop = marginTop;
  }

  if (props.marginLeft) {
    inlineStyles.marginLeft = marginLeft;
  }

  if (props.color) {
    inlineStyles.color = color;
  }

  return (
    <Text
    {...props}
      style={inlineStyles}
    />
  );
};

StyledText.propTypes = {
  style: PropTypes.object,
  smallFont: PropTypes.bool,
  customFont: PropTypes.bool,
  marginTop: PropTypes.number,
  marginLeft: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.number
};

StyledText.defaultProps = {
  customFont: true,
  smallFont: true
};
