import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Header, List} from '../../components';
import {Street} from './Streets.types';
import {styles} from './Streets.styles';

const Streets = () => {
  const [streets, setStreets] = useState<Street[]>([]);
  const [filteredStreets, setFilteredStreets] = useState<Street[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation =
    useNavigation<AppNativeStackScreenProps<'Streets'>['navigation']>();
  const route = useRoute<AppNativeStackScreenProps<'Streets'>['route']>();

  useEffect(() => {
    const getStreets = async (neighborhood_id: number) => {
      console.log('getStreets 164745', neighborhood_id);
      const response = await NVI.getStreets(neighborhood_id);
      setStreets(response);
      setFilteredStreets(response);
      setLoading(false);
    };

    getStreets(route?.params?.mahalleKoyBaglisiKimlikNo);
  }, [route?.params?.mahalleKoyBaglisiKimlikNo]);

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredStreets(
      streets.filter(item =>
        item.bilesenAdi.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onPress={() => navigation.goBack()}
        searchable={{
          placeholder: 'CSBM ara',
          value: searchText,
          onChangeText: onSearchText,
        }}
      />
      <List
        data={filteredStreets}
        title={'CSBM seçiniz'}
        onItemPress={(item: Street) => {
          navigation.navigate('Buildings', {
            mahalleKoyBaglisiKimlikNo: item?.mahalleKayitNo,
            yolKimlikNo: item?.kimlikNo,
          });
          setSearchText('');
          setFilteredStreets(streets);
        }}
        loading={loading}
        isSearched={searchText.length > 0}
      />
    </SafeAreaView>
  );
};

export default Streets;
