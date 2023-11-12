import {Linking, Platform, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {LatLng, Marker} from 'react-native-maps';
import Share from 'react-native-share';
import {AppNativeStackScreenProps} from '../../routers';
import {NVI} from '../../api';
import {Button} from '../../components';
import {Colors} from '../../constants';
import {styles} from './ShowOnMap.styles';

const ShowOnMap = () => {
  const navigation =
    useNavigation<AppNativeStackScreenProps<'ShowOnMap'>['navigation']>();
  const route = useRoute<AppNativeStackScreenProps<'ShowOnMap'>['route']>();
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: 39.45,
    longitude: 32.8,
    latitudeDelta: 2,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const getGraphicsForBuilding = async () => {
      const latLong = await NVI.getGraphicsForBuilding(
        route?.params?.fullAddress?.acikAdresModel.mahalleKayitNo,
        route?.params?.fullAddress?.binaNo,
      );

      setRegion({
        latitude: latLong?.result?.y,
        longitude: latLong?.result?.x,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setMarker({
        latitude: latLong?.result?.y,
        longitude: latLong?.result?.x,
      });

      setTimeout(() => {
        animateCamera(latLong?.result?.y, latLong?.result?.x);
      }, 250);
    };

    if (
      route?.params?.fullAddress?.acikAdresModel.mahalleKayitNo &&
      route?.params?.fullAddress?.binaNo
    ) {
      getGraphicsForBuilding();
    }
  }, [
    route?.params?.fullAddress?.acikAdresModel.mahalleKayitNo,
    route?.params?.fullAddress?.binaNo,
  ]);

  const animateCamera = (lat: number, long: number) => {
    mapRef?.current?.getCamera().then(camera => {
      camera.center = {
        latitude: lat - 0.0003,
        longitude: long,
      };
      Platform.OS === 'ios' ? (camera.altitude = 650) : (camera.zoom = 18);

      mapRef?.current?.animateCamera(camera, {duration: 2500});
    });
  };

  const onRoutePress = async () => {
    const scheme = Platform.select({
      ios: 'http://maps.apple.com/?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = Platform.select({
      ios: `ll=${marker?.latitude},${marker?.longitude}`,
      android: `${marker?.latitude},${marker?.longitude}`,
    });
    const label = Platform.select({
      ios: route?.params?.fullAddress?.acikAdresModel.acikAdresAciklama + '&&',
      android: route?.params?.fullAddress?.acikAdresModel.acikAdresAciklama,
    });
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    await Linking.openURL(String(url));
  };

  const onSharePress = async () => {
    Share.open({
      message: `${route?.params?.fullAddress?.acikAdresModel.acikAdresAciklama}\n\nhttps://maps.google.com/?q=${marker.latitude},${marker.longitude}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.focusCurrentRegion}
        activeOpacity={0.8}
        onPress={() => animateCamera(region.latitude, region.longitude)}>
        <MaterialIcons name="my-location" size={24} color={Colors.white} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.goBackButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}>
        <Feather name={'arrow-left'} size={24} color={Colors.white} />
      </TouchableOpacity>
      <MapView
        region={region}
        style={styles.map}
        ref={mapRef}
        loadingEnabled={true}
        loadingIndicatorColor={Colors.darkBlue}
        showsCompass={false}>
        <Marker
          coordinate={{
            latitude: marker?.latitude,
            longitude: marker?.longitude,
          }}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          text={'Paylaş'}
          onPress={onSharePress}
          buttonColor={Colors.darkBlue}
          leftIcon={
            <Ionicons
              name={'share-social'}
              size={24}
              color={Colors.white}
              style={styles.shareIcon}
            />
          }
        />
        <Button
          text={'Yol Tarifi'}
          onPress={onRoutePress}
          buttonColor={Colors.darkBlue}
          leftIcon={
            <FontAwesome5
              name={'route'}
              size={24}
              color={Colors.white}
              style={styles.shareIcon}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ShowOnMap;
