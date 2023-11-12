import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNativeStackNavigator} from './src/routers';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNativeStackNavigator />
    </SafeAreaProvider>
  );
};

export default App;
