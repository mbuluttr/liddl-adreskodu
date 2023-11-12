import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
  },
  contentContainerStyle: {
    flexGrow: 1,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 12,
    color: Colors.darkBlue,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 18,
    color: Colors.darkBlue,
    textAlign: 'center',
    lineHeight: 24,
  },
  linkedText: {
    fontSize: 18,
    color: Colors.darkBlue,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
});
