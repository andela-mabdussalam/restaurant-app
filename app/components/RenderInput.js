import React from 'react';
import PropTypes from 'prop-types';
import { Input, Item, Icon } from 'native-base';
import { HomeScreenStyles as styles } from '../styles/styles';

const RenderInput = ({
  placeholder,
  meta: { touched, error },
  secureTextEntry,
  input: { onChange, ...restInput }
}) =>
    <Item style={(touched && error) ?
      [styles.inputView, styles.errorStyle] : styles.inputView}>
      {(touched && error) && <Icon style={styles.searchIcon} name='alert'/>}
      <Input
      style={styles.input}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      {...restInput}
      placeholder={placeholder}
      placeholderTextColor="white"/>
    </Item>;

RenderInput.propTypes = {
  placeholder: PropTypes.string,
};

RenderInput.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool
};

export default RenderInput;
