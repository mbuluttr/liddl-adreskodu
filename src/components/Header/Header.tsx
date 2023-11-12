import {TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Sizes} from '../../constants';
import {HeaderProps} from './Header.types';
import {styles} from './Header.styles';

const Header = ({onPress, disabled, searchable}: HeaderProps) => {
  return (
    <View testID={'Header.Container'} style={styles.container}>
      <TouchableOpacity
        testID={'Header.BackButton'}
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        hitSlop={Sizes.HIT_SLOP}>
        <Feather name={'arrow-left'} size={24} color={Colors.darkBlue} />
      </TouchableOpacity>

      {searchable && (
        <View testID={'Header.SearchContainer'} style={styles.inputContainer}>
          <TextInput
            testID={'Header.SearchInput'}
            style={styles.input}
            value={searchable.value}
            onChangeText={searchable.onChangeText}
            placeholder={searchable.placeholder}
            placeholderTextColor={Colors.darkBlue}
          />
          {searchable.value && (
            <TouchableOpacity
              testID={'Header.ClearSearch'}
              onPress={() => searchable.onChangeText('')}
              activeOpacity={0.8}
              hitSlop={Sizes.HIT_SLOP}>
              <Ionicons
                name={'close-circle'}
                size={24}
                color={Colors.darkBlue}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Header;
