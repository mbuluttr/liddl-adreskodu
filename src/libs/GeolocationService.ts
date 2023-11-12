import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class GeolocationService {
  openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };

  settingsAlert = () => {
    Alert.alert(
      'Turn on Location Services to allow Bluedot for Fleets to determine your location.',
      '',
      [
        {text: 'Go to Settings', onPress: this.openSetting},
        {text: 'Cancel', onPress: () => {}, style: 'destructive'},
      ],
    );
  };

  hasPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      this.settingsAlert();
    }

    if (status === 'disabled') {
      this.settingsAlert();
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      this.settingsAlert();
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      this.settingsAlert();
    }

    return false;
  };
}

export default new GeolocationService();
