import {StyleSheet} from 'react-native';
import {PAGE_HEIGHT, PAGE_WIDTH} from '../../constants/sizes';
import {Colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  map: {
    zIndex: -1,
    position: 'absolute',
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
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
  shareIcon: {
    marginRight: 8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 12,
    bottom: PAGE_HEIGHT * 0.075,
    position: 'absolute',
    paddingHorizontal: 18,
  },
});
