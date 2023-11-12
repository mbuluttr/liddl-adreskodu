import {TouchableOpacityProps} from 'react-native';

type PickedTouchableTypes = Pick<TouchableOpacityProps, 'onPress' | 'disabled'>;

export interface ButtonProps extends PickedTouchableTypes {
  text: string;
  textColor?: string;
  buttonColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  marginTop?: number;
  marginBottom?: number;
}
