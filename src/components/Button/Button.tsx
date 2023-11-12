import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import {ButtonProps} from './Button.types';
import {styles} from './Button.styles';
import LoadingIndicator from '../LoadingIndicator';

const Button = ({
  text,
  buttonColor = Colors.darkBlue,
  textColor = Colors.white,
  leftIcon,
  rightIcon,
  loading,
  marginTop,
  marginBottom,

  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      testID={'Button.Container'}
      style={[
        styles.container,
        {backgroundColor: buttonColor, marginBottom, marginTop},
      ]}
      activeOpacity={0.8}
      {...props}>
      {leftIcon ? leftIcon : null}
      {loading ? (
        <LoadingIndicator color={Colors.white} size={'small'} />
      ) : (
        <Text testID={'Button.Text'} style={[styles.text, {color: textColor}]}>
          {text}
        </Text>
      )}
      {rightIcon ? rightIcon : null}
    </TouchableOpacity>
  );
};

export default Button;
