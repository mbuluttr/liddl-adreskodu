import {View} from 'react-native';
import React from 'react';
import {SpacerProps} from './Spacer.types';

const Spacer = ({horizontal, size}: SpacerProps) => {
  return (
    <View
      testID={'Spacer.Container'}
      style={horizontal ? {width: size} : {height: size}}
    />
  );
};

export default Spacer;
