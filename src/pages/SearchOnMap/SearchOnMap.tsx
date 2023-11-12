import React, {useRef, useState} from 'react';
import {Alert, Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {AppNativeStackScreenProps} from '../../routers';
import MapView, {LatLng, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import GeolocationService from '../../libs/GeolocationService';
import {NVI} from '../../api';
import {Button} from '../../components';
import {Colors} from '../../constants';
import {styles} from './SearchOnMap.styles';

const SearchOnMap = () => {
  const navigation =
    useNavigation<AppNativeStackScreenProps<'SearchOnMap'>['navigation']>();
  const mapRef = useRef<MapView>(null);
  const [marker, setMarker] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const focusCurrentLocation = async () => {
    const hasPermission = await GeolocationService.hasLocationPermission();
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        mapRef?.current?.getCamera().then(camera => {
          camera.center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          Platform.OS === 'ios' ? (camera.altitude = 1300) : (camera.zoom = 18);
          mapRef?.current?.animateCamera(camera, {duration: 2500});
        });
      },
      error => {
        console.log(JSON.stringify(error), '\nHome getCurrentPosition');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const onInquirePress = async () => {
    try {
      setLoading(true);
      const data = await NVI.getEnumerationListByGeometry(
        marker.latitude,
        marker.longitude,
      );
      if (data?.length === 0) {
        Alert.alert('Hata', 'Bu konumda sistemde kayıtlı adres bulunamadı.');
        setLoading(false);
        return;
      }
      const sections = data?.filter(item => item.bagimsizBolumler);
      const filteredList = sections
        ?.map(item => item.bagimsizBolumler.map(bagimsizBolum => bagimsizBolum))
        .flat();
      if (filteredList.length === 0) {
        Alert.alert(
          'Hata',
          'Bu konumun detaylı bilgileri sistemde bulunamadı.',
        );
        return;
      }
      navigation.navigate('EnumerationList', {
        enumerationList: filteredList,
      });
      setLoading(false);
    } catch (error) {
      console.log(error, 'onInquirePress');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isFocused && <StatusBar translucent backgroundColor="transparent" />}
      <TouchableOpacity
        style={styles.focusCurrentRegion}
        activeOpacity={0.8}
        onPress={() => focusCurrentLocation()}>
        <MaterialIcons name="my-location" size={24} color={Colors.white} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.goBackButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Home')}>
        <Feather name={'arrow-left'} size={24} color={Colors.white} />
      </TouchableOpacity>

      <MapView
        region={{
          latitude: 39.91567959625812,
          longitude: 32.86054780438105,
          latitudeDelta: 2,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        ref={mapRef}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.darkBlue}
        showsCompass={false}
        showsUserLocation={true}
        onPress={event =>
          setMarker({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          })
        }>
        <Marker
          coordinate={{
            latitude: marker?.latitude,
            longitude: marker?.longitude,
          }}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button
          text={'Sorgula'}
          onPress={onInquirePress}
          buttonColor={Colors.darkBlue}
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default SearchOnMap;
