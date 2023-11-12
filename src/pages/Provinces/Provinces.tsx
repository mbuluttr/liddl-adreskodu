import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Header, List} from '../../components';
import {Province} from './Provinces.types';
import {styles} from './Provinces.styles';

const Provinces = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [filteredProvinces, setFilteredProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const navigation =
    useNavigation<AppNativeStackScreenProps<'Provinces'>['navigation']>();

  useEffect(() => {
    const getProvinces = async () => {
      const response = await NVI.getProvinces();
      setProvinces(response);
      setFilteredProvinces(response);
      setLoading(false);
    };

    getProvinces();
  }, []);

  const onSearchText = (text: string) => {
    setSearchText(text);
    setFilteredProvinces(
      provinces.filter(province =>
        province.bilesenAdi.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        onPress={() => navigation.navigate('Home')}
        searchable={{
          value: searchText,
          onChangeText: (text: string) => onSearchText(text),
          placeholder: 'İl ara',
        }}
      />
      <List
        data={filteredProvinces}
        title={'İl seçiniz'}
        onItemPress={(item: Province) => {
          navigation.navigate('Districts', {ilKimlikNo: item?.kimlikNo});
          setFilteredProvinces(provinces);
          setSearchText('');
        }}
        loading={loading}
        isSearched={searchText.length > 0}
      />
    </SafeAreaView>
  );
};

export default Provinces;
