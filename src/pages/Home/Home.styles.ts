import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
  },
  earthContainer: {
    height: Sizes.PAGE_HEIGHT * 0.4,
  },
});
