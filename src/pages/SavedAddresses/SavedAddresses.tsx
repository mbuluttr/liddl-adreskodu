import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FAddress} from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './SavedAddresses.styles';
import {Header} from '../../components';

const SavedAddresses = () => {
  const navigation =
    useNavigation<AppNativeStackScreenProps<'SavedAddresses'>['navigation']>();
  const [savedAddresses, setSavedAddresses] = useState<FAddress[]>([]);
  const [filteredSavedAddresses, setFilteredSavedAddresses] = useState<
    FAddress[]
  >([]);
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const getSavedAddresses = async () => {
      const data = await AsyncStorage.getItem('savedAddresses');
      if (data) {
        setSavedAddresses(JSON.parse(data));
        setFilteredSavedAddresses(JSON.parse(data));
      }
    };

    if (isFocused) {
      getSavedAddresses();
    }
  }, [isFocused]);

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredSavedAddresses(
      savedAddresses.filter(item =>
        item.acikAdresModel.acikAdresAciklama
          .toLowerCase()
          .includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => navigation.goBack()}
        searchable={
          filteredSavedAddresses.length > 0
            ? {
                placeholder: 'Adres ara',
                value: searchText,
                onChangeText: onSearchText,
              }
            : undefined
        }
      />
      <FlatList
        data={filteredSavedAddresses}
        keyExtractor={item => String(item?.adresNo)}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.openAddressContainer}
            onPress={() => {
              navigation.navigate('FullAddress', {
                bagimsizBolumKayitNo: item.acikAdresModel.bagimsizBolumKayitNo,
                from: 'SavedAdddresses',
              });
              setFilteredSavedAddresses(savedAddresses);
              setSearchText('');
            }}>
            <Text style={styles.openAddressTitle}>Açık Adres</Text>
            <Text style={styles.openAddressText}>
              {item.acikAdresModel.acikAdresAciklama}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Henüz kayıtlı bir adresiniz yok
            </Text>
            <Text style={styles.emptySubtitle}>
              Adres sorgulamak ve kaydetmek için
              <Text
                style={styles.linkedText}
                onPress={() => navigation.navigate('Provinces')}>
                {' Adres ile Sorgulama '}
              </Text>
              veya
              <Text
                style={styles.linkedText}
                onPress={() => navigation.navigate('SearchOnMap')}>
                {' Harita ile Sorgulama '}
              </Text>
              adımlarından sorgulamanızı yapabilirsiniz
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SavedAddresses;
