import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppNativeStackParamList} from './AppNativeStackNavigator.types';
import {
  Buildings,
  Districts,
  DoorNumbers,
  EnumerationList,
  FullAddress,
  Home,
  Neighborhoods,
  Provinces,
  SavedAddresses,
  SearchOnMap,
  ShowOnMap,
  Streets,
  Verification,
} from '../../pages';

const NativeStack = createNativeStackNavigator<AppNativeStackParamList>();

const AppNativeStackNavigator = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={'Home'}>
        <NativeStack.Screen name={'Home'} component={Home} />
        <NativeStack.Screen name={'Provinces'} component={Provinces} />
        <NativeStack.Screen name={'Districts'} component={Districts} />
        <NativeStack.Screen name={'Neighborhoods'} component={Neighborhoods} />
        <NativeStack.Screen name={'Streets'} component={Streets} />
        <NativeStack.Screen name={'Buildings'} component={Buildings} />
        <NativeStack.Screen name={'DoorNumbers'} component={DoorNumbers} />
        <NativeStack.Screen name={'FullAddress'} component={FullAddress} />
        <NativeStack.Screen name={'ShowOnMap'} component={ShowOnMap} />
        <NativeStack.Screen name={'SearchOnMap'} component={SearchOnMap} />
        <NativeStack.Screen
          name={'EnumerationList'}
          component={EnumerationList}
        />
        <NativeStack.Screen name={'Verification'} component={Verification} />
        <NativeStack.Screen
          name={'SavedAddresses'}
          component={SavedAddresses}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNativeStackNavigator;
