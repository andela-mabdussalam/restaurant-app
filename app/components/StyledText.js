import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const StyledText = (props) => {
  const styles = StyleSheet.flatten(props.style);
  const inlineStyles = styles || {};
  const fontFamily = {
    fontFamily: 'SinkinSans-200XLight',
    fontSize: 12
  };
  const {
    marginTop,
    color,
    marginLeft,
    fontSize,
    customFont
  } = props;

  if (props.customFont) {
    inlineStyles.fontFamily = customFont;
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
     style={[fontFamily, inlineStyles]}
    />
  );
};

StyledText.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ]),
  smallFont: PropTypes.bool,
  customFont: PropTypes.number,
  marginTop: PropTypes.number,
  marginLeft: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.number
};

StyledText.defaultProps = {
  smallFont: true
};
