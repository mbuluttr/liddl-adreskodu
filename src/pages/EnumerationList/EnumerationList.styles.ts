import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
  },
  openAddressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
    marginTop: 12,
  },
  openAddressTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.darkBlue,
  },
  openAddressText: {
    fontSize: 16,
    color: Colors.darkBlue,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
});
