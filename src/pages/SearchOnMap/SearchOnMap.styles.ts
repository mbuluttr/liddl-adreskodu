import {StyleSheet} from 'react-native';
import {PAGE_HEIGHT, PAGE_WIDTH} from '../../constants/sizes';
import {Colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  map: {
    flex: 1,
  },
  focusCurrentRegion: {
    zIndex: 1,
    top: PAGE_HEIGHT * 0.075,
    right: 18,
    position: 'absolute',
    backgroundColor: Colors.darkBlue,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButton: {
    zIndex: 1,
    top: PAGE_HEIGHT * 0.075,
    left: 18,
    position: 'absolute',
    backgroundColor: Colors.darkBlue,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    zIndex: 1,
    bottom: PAGE_HEIGHT * 0.075,
    position: 'absolute',
    width: PAGE_WIDTH,
    paddingHorizontal: 18,
  },
});
