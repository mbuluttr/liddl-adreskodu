import NVIAxiosInstance from '../libs/axios';
import {
  Building,
  District,
  DoorNumber,
  EnumerationListOnMap,
  FAddress,
  GraphicForBina,
  Neighborhood,
  Province,
  Street,
} from '../pages';

export const getProvinces = async () => {
  const {data} = await NVIAxiosInstance.post<Province[]>('Harita/ilListesi');

  return data;
};

export const getDistricts = async (ilKimlikNo: number) => {
  const {data} = await NVIAxiosInstance.post<District[]>('Harita/ilceListesi', {
    ilKimlikNo,
  });

  return data;
};

export const getNeighborhoods = async (ilceKimlikNo: number) => {
  const {data} = await NVIAxiosInstance.post<Neighborhood[]>(
    'Harita/mahalleKoyBaglisiListesi',
    {
      ilceKimlikNo,
    },
  );

  return data;
};

export const getStreets = async (mahalleKoyBaglisiKimlikNo: number) => {
  const {data} = await NVIAxiosInstance.post<Street[]>('Harita/yolListesi', {
    mahalleKoyBaglisiKimlikNo,
  });

  return data;
};

export const getBuildings = async (
  mahalleKoyBaglisiKimlikNo: number,
  yolKimlikNo: number,
) => {
  const {data} = await NVIAxiosInstance.post<Building[]>('Harita/binaListesi', {
    mahalleKoyBaglisiKimlikNo,
    yolKimlikNo,
  });

  return data;
};

export const getDoorNumbers = async (
  mahalleKoyBaglisiKimlikNo: number,
  binaKimlikNo: number,
) => {
  const {data} = await NVIAxiosInstance.post<DoorNumber[]>(
    'Harita/bagimsizBolumListesi',
    {
      mahalleKoyBaglisiKimlikNo,
      binaKimlikNo,
    },
  );

  return data;
};

export const getFullAddress = async (
  bagimsizBolumKayitNo?: number,
  bagimsizBolumAdresNo?: number,
) => {
  const {data} = await NVIAxiosInstance.post<FAddress>('Harita/AcikAdres', {
    bagimsizBolumKayitNo,
    bagimsizBolumAdresNo,
  });

  return data;
};

export const getGraphicsForBuilding = async (
  mahalleKoyBaglisiKimlikNo: number,
  binaKimlikNo: number,
) => {
  const {data} = await NVIAxiosInstance.post<GraphicForBina>(
    'Harita/graphicsForbina',
    {
      mahalleKoyBaglisiKimlikNo,
      binaKimlikNo,
    },
  );

  return data;
};

export const getEnumerationListByGeometry = async (
  latitude: number,
  longitude: number,
) => {
  const {data} = await NVIAxiosInstance.post<EnumerationListOnMap[]>(
    'Harita/NumaratajListesiByGeometry',
    {
      latitude: String(longitude),
      longitude: String(latitude),
    },
  );

  return data;
};
