import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import myConstants from "../constants/myConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

const RegisteredAddresses = ({ navigation }) => {
  const [registered, setRegistered] = useState([]);
  const isFocused = useIsFocused();

  const getData = async (storage_key) => {
    const jsonValue = await AsyncStorage.getItem(storage_key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getAddressesFromStore = useCallback(async () => {
    const registeredAddresses = await getData("@registered");
    setRegistered(registeredAddresses);
  }, []);

  useEffect(() => {
    if (isFocused) {
      getAddressesFromStore();
    }
  }, [isFocused, getAddressesFromStore, registered]);

  const emptyView = (
    <View style={styles.container}>
      <View style={styles.emptyInformationBGView}>
        <View style={styles.emptyInformationTextView}>
          <Text style={styles.emptyInformationText}>Henüz kayıtlı bir adresiniz bulunmamaktadır</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.homeButton} activeOpacity={0.9} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home-sharp" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const registeredView = (
    <View style={styles.container}>
      <Text style={styles.headerText}>Kayıtlı Adresleriniz</Text>
      <FlatList
        data={registered}
        contentContainerStyle={{ paddingBottom: 150 }}
        keyExtractor={(item) => String(item.value)}
        renderItem={({ item }) => (
          <View style={styles.A}>
            <View style={styles.B}>
              <Text style={styles.C}>{item.label}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("Registered Detail", {
                    detail: item,
                  })
                }
              >
                <Text style={styles.D}>Detay</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hr} />
          </View>
        )}
      />
    </View>
  );

  if (registered && registered.length > 0) {
    return registeredView;
  } else {
    return emptyView;
  }
};

export default RegisteredAddresses;

const styles = StyleSheet.create({
  A: {
    alignItems: "center",
  },
  B: {
    backgroundColor: myConstants.lightwhite,
    width: myConstants.buttonWidth,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    elevation: 5,
  },
  C: {
    color: myConstants.darkblue,
    fontSize: myConstants.textBigSize,
    textAlign: "center",
    marginBottom: 15,
  },
  D: {
    backgroundColor: myConstants.darkblue,
    width: myConstants.buttonWidth / 2.5,
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: myConstants.lightwhite,
    fontSize: myConstants.textMidSize,
  },
  container: {
    flex: 1,
    backgroundColor: myConstants.white,
  },
  headerText: {
    fontSize: hp("4%"),
    height: hp("10%"),
    alignSelf: "center",
    textAlignVertical: "center",
  },
  emptyInformationBGView: {
    height: hp("100%"),
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  emptyInformationTextView: {
    height: hp("40%"),
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: myConstants.lightwhite,
    borderWidth: 2,
    borderColor: "lightgray",
    elevation: 5,
    borderRadius: 10,
  },
  emptyInformationText: {
    fontSize: hp("3%"),
    color: myConstants.gray,
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: myConstants.darkblue,
    padding: 20,
    borderRadius: 50,
  },
  hr: {
    width: wp("50%"),
    height: hp("0.2%"),
    backgroundColor: myConstants.gray,
    opacity: 0.1,
    marginTop: 20,
  },
});
