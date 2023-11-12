import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Header, List} from '../../components';
import {Building} from './Buildings.types';
import {styles} from './Buildings.styles';

const Buildings = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation =
    useNavigation<AppNativeStackScreenProps<'Buildings'>['navigation']>();
  const route = useRoute<AppNativeStackScreenProps<'Buildings'>['route']>();

  useEffect(() => {
    const getBuildings = async (neighborhood_id: number, street_id: number) => {
      console.log('getBuildings 164745 952598', neighborhood_id, street_id);
      const response = await NVI.getBuildings(neighborhood_id, street_id);
      setBuildings(response);
      setFilteredBuildings(response);
      setLoading(false);
    };

    getBuildings(
      route?.params?.mahalleKoyBaglisiKimlikNo,
      route?.params?.yolKimlikNo,
    );
  }, [route?.params?.mahalleKoyBaglisiKimlikNo, route?.params?.yolKimlikNo]);

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredBuildings(
      buildings.filter(item =>
        item.bilesenAdi.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onPress={() => navigation.goBack()}
        searchable={{
          placeholder: 'Dış kapı ara',
          value: searchText,
          onChangeText: onSearchText,
        }}
      />
      <List
        data={filteredBuildings}
        title={'Dış kapı seçiniz'}
        onItemPress={(item: Building) => {
          navigation.navigate('DoorNumbers', {
            mahalleKoyBaglisiKimlikNo: route?.params?.mahalleKoyBaglisiKimlikNo,
            binaKimlikNo: item?.kimlikNo,
          });
          setFilteredBuildings(buildings);
          setSearchText('');
        }}
        loading={loading}
        isSearched={searchText.length > 0}
      />
    </SafeAreaView>
  );
};

export default Buildings;
