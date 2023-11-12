import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: 125,
  },
  itemContainer: {
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 18,
    letterSpacing: 0.4,
    fontWeight: '600',
    color: Colors.darkBlue,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.darkBlue,
  },
  headerContainer: {
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    letterSpacing: 0.4,
    fontWeight: '800',
    color: Colors.darkBlue,
  },
  emptyText: {
    fontSize: 22,
    letterSpacing: 0.4,
    fontWeight: '600',
    color: Colors.darkBlue,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 12,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
