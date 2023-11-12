import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FAddress} from '../../pages';

export type AppNativeStackParamList = {
  Home: undefined;
  Provinces: undefined;
  Districts: {
    ilKimlikNo: number;
  };
  Neighborhoods: {
    ilceKimlikNo: number;
  };
  Streets: {
    mahalleKoyBaglisiKimlikNo: number;
  };
  Buildings: {
    mahalleKoyBaglisiKimlikNo: number;
    yolKimlikNo: number;
  };
  DoorNumbers: {
    mahalleKoyBaglisiKimlikNo: number;
    binaKimlikNo: number;
  };
  FullAddress: {
    bagimsizBolumKayitNo?: number;
    fullAddress?: FAddress;
    from?: 'SavedAdddresses';
  };
  ShowOnMap: {
    fullAddress: FAddress;
  };
  SearchOnMap: undefined;
  EnumerationList: {
    enumerationList: FAddress[];
  };
  Verification: undefined;
  SavedAddresses: undefined;
};

export type AppNativeStackScreenProps<T extends keyof AppNativeStackParamList> =
  NativeStackScreenProps<AppNativeStackParamList, T>;
