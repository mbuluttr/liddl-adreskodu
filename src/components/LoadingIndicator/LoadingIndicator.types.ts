import {FlexAlignType} from 'react-native';

export interface LoadingIndocatorProps {
  fullPage?: boolean;
  customHeight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  alignSelf?: FlexAlignType;
  color?: string;
  size?: 'small' | 'large';
}
