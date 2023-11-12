import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Config} from '../constants';

const NVIAxiosInstance = axios.create(Config.nviAxiosConfig);

NVIAxiosInstance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  config.headers.__RequestVerificationToken = token || '';
  return config;
});

export default NVIAxiosInstance;
