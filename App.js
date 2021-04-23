import React, { useState } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import myConstants from "./src/constants/myConstants";
import FindCity from "./src/components/FindCity";
import FindDistrict from "./src/components/FindDistrict";
import FindNeighborhood from "./src/components/FindNeighborhood";
import FindStreet from "./src/components/FindStreet";
import FindApartment from "./src/components/FindApartment";
import FindResult from "./src/components/FindResult";
import FindDoorNumber from "./src/components/FindDoorNumber";
import RegisteredAddresses from "./src/screens/RegisteredAddresses";
import RegisteredDetail from "./src/components/RegisteredDetail";
import CheckAddress from "./src/screens/CheckAddress";
import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();

export default function App() {
  useState(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={"none"}
        initialRouteName={"Home"}
        screenOptions={{ gestureEnabled: true, gestureDirection: "horizontal" }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Find City" component={FindCity} />
        <Stack.Screen name="Find District" component={FindDistrict} />
        <Stack.Screen name="Find Neighborhood" component={FindNeighborhood} />
        <Stack.Screen name="Find Street" component={FindStreet} />
        <Stack.Screen name="Find Apartment" component={FindApartment} />
        <Stack.Screen name="Find Door Number" component={FindDoorNumber} />
        <Stack.Screen name="Find Result" component={FindResult} />
        <Stack.Screen name="Registered Addresses" component={RegisteredAddresses} />
        <Stack.Screen name="Registered Detail" component={RegisteredDetail} />
        <Stack.Screen name="Check Address" component={CheckAddress} />
      </Stack.Navigator>
      <StatusBar barStyle="light-content" backgroundColor={myConstants.darkblue} />
    </NavigationContainer>
  );
}
