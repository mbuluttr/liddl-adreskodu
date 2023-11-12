import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    paddingHorizontal: 12,
    marginLeft: 18,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 44,
    color: Colors.darkBlue,
    marginRight: 8,
  },
});
