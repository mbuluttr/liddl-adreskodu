import {Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Header, Spacer} from '../../components';
import LottieView from 'lottie-react-native';
import {styles} from './Verification.styles';
import {Colors} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Verification = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<AppNativeStackScreenProps<'Verification'>['navigation']>();

  const onVerify = async () => {
    if (code) {
      setLoading(true);
      const response = await NVI.getFullAddress(undefined, Number(code));
      if (response.acikAdresModel) {
        navigation.navigate('FullAddress', {
          fullAddress: response,
        });
      } else {
        Alert.alert('Hata', 'Lütfen geçerli bir adres kodu giriniz.');
      }
      setLoading(false);
    } else {
      Alert.alert('Hata', 'Lütfen geçerli bir adres kodu giriniz.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <LottieView
          style={styles.verifyContainer}
          source={require('../../assets/lottie/verify.json')}
          autoPlay
          loop
        />
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={text => setCode(text)}
          placeholder={'Adres kodu'}
          placeholderTextColor={Colors.darkBlue}
        />
        <Spacer size={24} />
        <Button
          text={'Kontrol Et'}
          onPress={onVerify}
          buttonColor={Colors.darkBlue}
          loading={loading}
          disabled={loading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Verification;
