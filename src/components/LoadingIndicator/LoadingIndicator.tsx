import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import {styles} from './LoadingIndicator.styles';
import {LoadingIndocatorProps} from './LoadingIndicator.types';

const LoadingIndicator = ({
  fullPage,
  customHeight,
  paddingTop,
  paddingBottom,
  alignSelf,
  color,
  size,
}: LoadingIndocatorProps) => {
  return fullPage ? (
    <View testID={'LoadingIndicator.FullPage'} style={styles.fullPage}>
      <ActivityIndicator
        testID={'LoadingIndicator.ActivityIndicator'}
        size={size ? size : 'large'}
        color={color ? color : Colors.darkBlue}
      />
    </View>
  ) : (
    <View
      testID={'LoadingIndicator.Custom'}
      style={[
        styles.custom,
        {
          height: customHeight,
          paddingTop: paddingTop,
          paddingBottom: paddingBottom,
          alignSelf: alignSelf,
        },
      ]}>
      <ActivityIndicator
        testID={'LoadingIndicator.ActivityIndicator'}
        size={size ? size : 'large'}
        color={color ? color : Colors.darkBlue}
      />
    </View>
  );
};

export default LoadingIndicator;
