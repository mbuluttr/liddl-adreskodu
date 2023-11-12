import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Header, List} from '../../components';
import {Neighborhood} from './Neighborhoods.types';
import {styles} from './Neighborhoods.styles';

const Neighborhoods = () => {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<
    Neighborhood[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>('');
  const navigation =
    useNavigation<AppNativeStackScreenProps<'Neighborhoods'>['navigation']>();
  const route = useRoute<AppNativeStackScreenProps<'Neighborhoods'>['route']>();

  useEffect(() => {
    const getNeighborhoods = async (district_id: number) => {
      console.log('getNeighborhoods 1729', district_id);
      const response = await NVI.getNeighborhoods(district_id);
      setNeighborhoods(response);
      setFilteredNeighborhoods(response);
      setLoading(false);
    };

    getNeighborhoods(route?.params?.ilceKimlikNo);
  }, [route?.params?.ilceKimlikNo]);

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredNeighborhoods(
      neighborhoods.filter(item =>
        item.bilesenAdi.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onPress={() => navigation.goBack()}
        searchable={{
          placeholder: 'Mahalle ara',
          value: searchText,
          onChangeText: onSearchText,
        }}
      />
      <List
        data={filteredNeighborhoods}
        title={'Mahalle seçiniz'}
        onItemPress={(item: Neighborhood) => {
          navigation.navigate('Streets', {
            mahalleKoyBaglisiKimlikNo: item?.kimlikNo,
          });
          setSearchText('');
          setFilteredNeighborhoods(neighborhoods);
        }}
        loading={loading}
        isSearched={searchText.length > 0}
      />
    </SafeAreaView>
  );
};

export default Neighborhoods;
