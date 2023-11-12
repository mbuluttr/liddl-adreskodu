import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {load} from 'cheerio';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppNativeStackScreenProps} from '../../routers';
import {Colors, Config} from '../../constants';
import {Button} from '../../components';
import {styles} from './Home.styles';
import {StatusBar} from 'react-native';

const Home = () => {
  const navigation =
    useNavigation<AppNativeStackScreenProps<'Home'>['navigation']>();

  useEffect(() => {
    const getToken = async () => {
      const {data} = await axios.get('Home', Config.nviAxiosConfig);
      const ch = load(data);
      await AsyncStorage.setItem(
        'token',
        String(ch('input[name=__RequestVerificationToken]').val()),
      );
    };

    getToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <LottieView
        style={styles.earthContainer}
        source={require('../../assets/lottie/earth.json')}
        autoPlay
        loop
      />
      <Button
        text={'Adres ile Sorgula'}
        onPress={() => navigation.navigate('Provinces')}
        marginBottom={12}
      />
      <Button
        text={'Harita ile Sorgula'}
        onPress={() => navigation.navigate('SearchOnMap')}
        marginBottom={12}
      />
      <Button
        text={'Adres Doğrulama'}
        onPress={() => navigation.navigate('Verification')}
        marginBottom={12}
      />
      <Button
        text={'Kayıtlı Adreslerim'}
        onPress={() => navigation.navigate('SavedAddresses')}
      />
    </SafeAreaView>
  );
};

export default Home;
