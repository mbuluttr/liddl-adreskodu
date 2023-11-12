import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Button, Header, LoadingIndicator} from '../../components';
import {Colors} from '../../constants';
import {FullAddress as FAddress} from './FullAddress.types';
import {styles} from './FullAddress.styles';

const FullAddressRow = ({
  title,
  description,
  darker,
  important,
}: {
  title: string;
  description?: string | number;
  darker?: boolean;
  important?: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.row,
        darker && styles.darker,
        important && styles.important,
      ]}
      activeOpacity={0.8}
      onPress={() => {
        Clipboard.setString(String(description));
        Vibration.vibrate(100);
      }}>
      <Text style={[styles.itemTitle, important && styles.importantText]}>
        {title}
      </Text>
      <Text style={[styles.itemText, important && styles.importantText]}>
        {description ? description : '-'}
      </Text>
      {important && (
        <Ionicons
          name={'star'}
          size={24}
          color={Colors.starYellow}
          style={styles.importantStar}
        />
      )}
    </TouchableOpacity>
  );
};

const FullAddress = () => {
  const [fullAddress, setFullAddress] = useState<FAddress>({} as FAddress);
  const [loading, setLoading] = useState(true);
  const navigation =
    useNavigation<AppNativeStackScreenProps<'FullAddress'>['navigation']>();
  const route = useRoute<AppNativeStackScreenProps<'FullAddress'>['route']>();

  useEffect(() => {
    const getFullAddress = async (bagimsizBolumKayitNo?: number) => {
      console.log('getFullAddress 50505942', bagimsizBolumKayitNo);
      const response = await NVI.getFullAddress(
        bagimsizBolumKayitNo,
        undefined,
      );
      setFullAddress(response);
      setLoading(false);
    };

    if (route?.params?.fullAddress) {
      setFullAddress(route?.params?.fullAddress);
      setLoading(false);
    } else {
      getFullAddress(route?.params?.bagimsizBolumKayitNo);
    }
  }, [route?.params?.bagimsizBolumKayitNo, route?.params?.fullAddress]);

  const onSavePress = async () => {
    const getSavedAddresses = await AsyncStorage.getItem('savedAddresses');
    const savedAddresses = getSavedAddresses
      ? JSON.parse(getSavedAddresses)
      : [];
    const isAlreadySaved = savedAddresses.find(
      (item: FAddress) => item.adresNo === fullAddress.adresNo,
    );
    if (isAlreadySaved) {
      Alert.alert(
        'Hata',
        "Bu adresi daha önce telefonunuza kaydetmişsiniz. 'Kayıtlı Adreslerim' sayfasından kaydedilen adresleri görüntüleyebilirsiniz.",
        [
          {
            text: 'Kapat',
            style: 'destructive',
          },
          {
            text: 'Ana Sayfa',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
      return;
    }
    Alert.alert(
      'Başarılı',
      "Bu adres telefonunuza kaydedilmiştir. 'Kayıtlı Adreslerim' sayfasından kaydedilen adresleri görüntüleyebilirsiniz.",
      [
        {
          text: 'Kapat',
          style: 'destructive',
        },
        {
          text: 'Ana Sayfa',
          onPress: () => navigation.navigate('Home'),
        },
      ],
    );
    savedAddresses.push(fullAddress);
    await AsyncStorage.setItem(
      'savedAddresses',
      JSON.stringify(savedAddresses),
    );
  };

  const onDeletePress = async () => {
    Alert.alert(
      'Uyarı',
      'Bu adresi kayıtlı adreslerimden kaldırmak istediğinize emin misiniz?',
      [
        {
          text: 'Kapat',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            const getSavedAddresses = await AsyncStorage.getItem(
              'savedAddresses',
            );
            const savedAddresses = getSavedAddresses
              ? JSON.parse(getSavedAddresses)
              : [];
            const filteredAddresses = savedAddresses.filter(
              (item: FAddress) => item.adresNo !== fullAddress.adresNo,
            );
            await AsyncStorage.setItem(
              'savedAddresses',
              JSON.stringify(filteredAddresses),
            );
            navigation.navigate('SavedAddresses');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()} />
      {loading ? (
        <LoadingIndicator fullPage={true} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}>
          <View style={styles.openAddressContainer}>
            <Text style={styles.openAddressTitle}>Açık Adres</Text>
            <Text style={styles.openAddressText}>
              {fullAddress.acikAdresModel.acikAdresAciklama}
            </Text>
          </View>
          <View style={styles.noteContainer}>
            <Feather name={'info'} size={24} color={Colors.darkBlue} />
            <Text style={styles.noteText}>
              Kopyalamak istediğiniz verinin üzerine basınız
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Numarataj Bilgileri</Text>
            <FullAddressRow
              title={'Kimlik No (MAKS)'}
              description={fullAddress.binaNo}
              darker={true}
            />
            <FullAddressRow title={'Ada'} description={fullAddress.ada} />
            <FullAddressRow
              title={'Parsel'}
              description={fullAddress.parsel}
              darker={true}
            />
            <FullAddressRow title={'Pafta'} description={fullAddress.pafta} />
            <FullAddressRow
              title={'Posta Kodu'}
              description={fullAddress.postaKodu}
              darker={true}
            />
            <FullAddressRow
              title={'Numarataj Tipi'}
              description={fullAddress.maksBinaNumaratajTipiFormatted}
            />
            <FullAddressRow
              title={'Site Adı'}
              description={fullAddress.siteAdi}
              darker={true}
            />
            <FullAddressRow
              title={'Apartman/Blok Adı'}
              description={fullAddress.blokAdi}
            />
            <FullAddressRow
              title={'Dış Kapı'}
              description={fullAddress.disKapiNo}
              darker={true}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Bağımsız Bölüm Bilgileri</Text>
            <FullAddressRow
              title={'Kimlik No (Adres Kodu)'}
              description={fullAddress.adresNo}
              important={true}
            />
            <FullAddressRow
              title={'İç Kapı'}
              description={fullAddress.icKapiNo}
            />
            <FullAddressRow
              title={'Kullanım Amacı'}
              description={fullAddress.yapiKullanimAmacFormatted}
              darker={true}
            />
            <FullAddressRow
              title={'Tip'}
              description={fullAddress.maksBbTipFormatted}
            />
            <FullAddressRow
              title={'Durum'}
              description={fullAddress.maksBbDurumFormatted}
              darker={true}
            />
            <FullAddressRow
              title={'Tapu No'}
              description={fullAddress.tapuBagimsizBolumNo}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text={
                route?.params.from === 'SavedAdddresses'
                  ? 'Adresi Sil'
                  : 'Adresi Kaydet'
              }
              onPress={
                route?.params.from === 'SavedAdddresses'
                  ? onDeletePress
                  : onSavePress
              }
              buttonColor={
                route?.params.from === 'SavedAdddresses'
                  ? Colors.darkBlue
                  : Colors.darkBlue
              }
              leftIcon={
                route?.params.from === 'SavedAdddresses' ? (
                  <Feather
                    name={'trash-2'}
                    size={24}
                    color={Colors.white}
                    style={styles.earthIcon}
                  />
                ) : null
              }
            />
            <Button
              text={'Ana Sayfa'}
              onPress={() => navigation.navigate('Home')}
              buttonColor={Colors.lightGray}
              textColor={Colors.darkBlue}
            />
          </View>
          <Button
            text={'Haritada Göster'}
            onPress={() => {
              navigation.navigate('ShowOnMap', {
                fullAddress,
              });
            }}
            buttonColor={Colors.darkBlue}
            textColor={Colors.white}
            leftIcon={
              <Ionicons
                name={'earth'}
                size={24}
                color={Colors.white}
                style={styles.earthIcon}
              />
            }
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default FullAddress;
