import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Header, List} from '../../components';
import {DoorNumber} from './DoorNumbers.types';
import {styles} from './DoorNumbers.styles';

const DoorNumbers = () => {
  const [doorNumbers, setDoorNumbers] = useState<DoorNumber[]>([]);
  const [filteredDoorNumbers, setFilteredDoorNumbers] = useState<DoorNumber[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation =
    useNavigation<AppNativeStackScreenProps<'DoorNumbers'>['navigation']>();
  const route = useRoute<AppNativeStackScreenProps<'DoorNumbers'>['route']>();

  useEffect(() => {
    const getDoorNumbers = async (
      neighborhood_id: number,
      building_id: number,
    ) => {
      console.log(
        'getDoorNumbers 164745 515246023',
        neighborhood_id,
        building_id,
      );
      const response = await NVI.getDoorNumbers(neighborhood_id, building_id);
      setDoorNumbers(response);
      setFilteredDoorNumbers(response);
      setLoading(false);
    };

    getDoorNumbers(
      route?.params?.mahalleKoyBaglisiKimlikNo,
      route?.params?.binaKimlikNo,
    );
  }, [route?.params?.mahalleKoyBaglisiKimlikNo, route?.params?.binaKimlikNo]);

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredDoorNumbers(
      doorNumbers.filter(item =>
        item.bilesenAdi.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onPress={() => navigation.goBack()}
        searchable={{
          placeholder: 'İç kapı ara',
          value: searchText,
          onChangeText: onSearchText,
        }}
      />
      <List
        data={filteredDoorNumbers}
        title={'İç kapı seçiniz'}
        onItemPress={(item: DoorNumber) => {
          navigation.navigate('FullAddress', {
            bagimsizBolumKayitNo: item.kimlikNo,
          });
          setSearchText('');
          setFilteredDoorNumbers(doorNumbers);
        }}
        loading={loading}
        isSearched={searchText.length > 0}
      />
    </SafeAreaView>
  );
};

export default DoorNumbers;
