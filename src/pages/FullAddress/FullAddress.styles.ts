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
  noteContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteText: {
    fontSize: 14,
    color: Colors.darkBlue,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionContainer: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.darkBlue,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    textAlign: 'right',
  },
  scrollContentContainer: {
    paddingBottom: 125,
  },
  darker: {
    backgroundColor: Colors.lightGray,
  },
  important: {
    backgroundColor: Colors.darkBlue,
  },
  importantText: {
    color: Colors.white,
  },
  importantStar: {
    position: 'absolute',
    alignSelf: 'center',
    right: '50%',
    top: -12,
    zIndex: -1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 12,
    marginVertical: 12,
  },
  earthIcon: {
    marginRight: 8,
  },
});
