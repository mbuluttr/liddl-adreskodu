import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {Header} from '../../components';
import {FAddress} from '..';
import {styles} from './EnumerationList.styles';

const EnumerationList = () => {
  const navigation =
    useNavigation<AppNativeStackScreenProps<'EnumerationList'>['navigation']>();
  const route =
    useRoute<AppNativeStackScreenProps<'EnumerationList'>['route']>();
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState<FAddress[]>(
    route?.params?.enumerationList,
  );

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredList(
      route?.params?.enumerationList.filter(section =>
        section.acikAdresModel.icKapiNo
          .toLowerCase()
          .includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => navigation.goBack()}
        searchable={{
          value: searchText,
          onChangeText: (text: string) => onSearchText(text),
          placeholder: 'İç kapı ara',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredList?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.openAddressContainer}
              onPress={() =>
                navigation.navigate('FullAddress', {
                  bagimsizBolumKayitNo:
                    item.acikAdresModel.bagimsizBolumKayitNo,
                })
              }>
              <Text style={styles.openAddressTitle}>Açık Adres</Text>
              <Text style={styles.openAddressText}>
                {item.acikAdresModel.acikAdresAciklama}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnumerationList;
