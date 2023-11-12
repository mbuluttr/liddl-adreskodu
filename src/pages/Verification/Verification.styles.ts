import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
  },
  input: {
    height: 54,
    color: Colors.darkBlue,
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  verifyContainer: {
    marginVertical: 24,
    height: Sizes.PAGE_HEIGHT * 0.2,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 125,
  },
});
