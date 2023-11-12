import {TouchableOpacityProps} from 'react-native';

type PickedTouchableTypes = Pick<TouchableOpacityProps, 'onPress' | 'disabled'>;

export interface HeaderProps extends PickedTouchableTypes {
  searchable?: {
    value: string;
    placeholder: string;
    onChangeText: (text: string) => void;
  };
}
