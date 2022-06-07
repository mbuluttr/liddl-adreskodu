import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import myConstants from "../constants/myConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import InformationModal from "../components/InformationModal";
import * as Animatable from "react-native-animatable";
import Ionicons from "react-native-vector-icons/Ionicons";

const RegisteredDetail = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const modalHandler = () => {
    setModalVisible(!isModalVisible);
  };

  const { detail } = route.params;

  const storeData = async (storage_key, value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storage_key, jsonValue);
  };

  const getData = async (storage_key) => {
    const jsonValue = await AsyncStorage.getItem(storage_key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const removeAddress = async () => {
    const addresses = await getData("@registered");
    const newAddressList = addresses.filter((address) => address.value !== detail.value);
    storeData("@registered", newAddressList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultImageView}>
        <Animatable.Image
          animation="pulse"
          iterationCount="infinite"
          style={styles.resultImage}
          source={require("../assets/images/result.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.findResultButtonView}>
        <Text style={styles.headerText}>Adresiniz</Text>
        <TouchableOpacity style={styles.fullAddressButton} activeOpacity={0.9}>
          <Text style={styles.fullAddressButtonText}>{detail.label}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Adres Kodunuz</Text>
        <TouchableOpacity style={styles.addressCodeButton} activeOpacity={0.9}>
          <Text style={styles.addressCodeButtonText}>{detail.value}</Text>
        </TouchableOpacity>
        <View style={styles.bottomButtonsView}>
          <TouchableOpacity style={styles.homeButton} activeOpacity={0.9} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home-sharp" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteAddressButton}
            activeOpacity={0.9}
            onPress={() => {
              modalHandler();
            }}
          >
            <Ionicons name="trash" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <InformationModal
        isModalVisible={isModalVisible}
        modalHandler={modalHandler}
        navigation={navigation}
        modalType={true}
        remove={removeAddress}
      />
    </View>
  );
};

export default RegisteredDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myConstants.white,
  },
  headerText: { marginBottom: 5, fontSize: 20, fontWeight: "bold" },
  resultImageView: {
    height: hp("40%"),
    width: wp("100%"),
    justifyContent: "center",
  },
  resultImage: {
    height: hp("30%"),
    width: wp("100%"),
  },
  findResultButtonView: {
    alignItems: "center",
    height: hp("60%"),
    width: wp("100%"),
  },
  fullAddressButton: {
    width: myConstants.buttonWidth,
    backgroundColor: myConstants.darkblue,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  fullAddressButtonText: {
    color: myConstants.white,
    fontSize: myConstants.textBigSize,
  },

  addressCodeButton: {
    height: myConstants.buttonHeight,
    width: myConstants.buttonWidth,
    backgroundColor: myConstants.green,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  addressCodeButtonText: {
    color: myConstants.white,
    fontSize: hp("5"),
    fontWeight: "bold",
  },
  deleteAddressButton: {
    height: myConstants.buttonHeight,
    width: myConstants.buttonWidth / 2 - 5,
    backgroundColor: myConstants.red,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginLeft: 7.5,
  },

  homeButton: {
    height: myConstants.buttonHeight,
    width: myConstants.buttonWidth / 2 - 5,
    backgroundColor: myConstants.darkblue,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginRight: 7.5,
  },

  bottomButtonsView: {
    flexDirection: "row",
  },
});
