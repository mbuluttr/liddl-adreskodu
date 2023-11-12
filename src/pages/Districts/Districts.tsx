import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Header, List} from '../../components';
import {District} from './Districts.types';
import {styles} from './Districts.styles';

const Districts = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation =
    useNavigation<AppNativeStackScreenProps<'Districts'>['navigation']>();
  const route = useRoute<AppNativeStackScreenProps<'Districts'>['route']>();

  useEffect(() => {
    const getDistricts = async (province_id: number) => {
      console.log('getDistricts 44', province_id);
      const response = await NVI.getDistricts(province_id);
      setDistricts(response);
      setFilteredDistricts(response);
      setLoading(false);
    };

    getDistricts(route?.params?.ilKimlikNo);
  }, [route?.params?.ilKimlikNo]);

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredDistricts(
      districts.filter(item =>
        item.bilesenAdi.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onPress={() => navigation.goBack()}
        searchable={{
          placeholder: 'İlçe ara',
          value: searchText,
          onChangeText: onSearchText,
        }}
      />
      <List
        data={filteredDistricts}
        title={'İlçe seçiniz'}
        onItemPress={(item: District) => {
          navigation.navigate('Neighborhoods', {
            ilceKimlikNo: item?.kimlikNo,
          });
          setSearchText('');
          setFilteredDistricts(districts);
        }}
        loading={loading}
        isSearched={searchText.length > 0}
      />
    </SafeAreaView>
  );
};

export default Districts;
