import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import myConstants from "../constants/myConstants";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { AdMobInterstitial } from "react-native-admob";
import { env } from "../../environments";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const FindResult = ({ navigation, route }) => {
  const { data } = route.params;

  useEffect(() => {
    AdMobInterstitial.setAdUnitID(env.ADMOB_RESULT_SCREEN);
    AdMobInterstitial.addEventListener("adLoaded", () => {
      AdMobInterstitial.isReady(() => AdMobInterstitial.showAd());
    });
    AdMobInterstitial.requestAd().catch((e) => console.log(e));
    () => AdMobInterstitial.removeAllListeners();
  }, []);

  const showSuccess = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Adres başarıyla kaydedildi!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      175
    );
  };

  const showError = () => {
    ToastAndroid.showWithGravityAndOffset("Bu adres zaten kayıtlı!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 175);
  };

  // const copied = () => {
  //   ToastAndroid.showWithGravityAndOffset(
  //     "Kopyalandı!",
  //     ToastAndroid.SHORT,
  //     ToastAndroid.BOTTOM,
  //     0,
  //     175
  //   );
  // };

  const storeData = async (storage_key, value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storage_key, jsonValue);
  };

  const getData = async (storage_key) => {
    const jsonValue = await AsyncStorage.getItem(storage_key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const registerAddress = async (newAddress) => {
    const arrList = [];
    const oldValues = await getData("@registered");
    if (JSON.stringify(oldValues).includes(JSON.stringify(newAddress))) {
      showError();
      return;
    }
    if (oldValues) {
      arrList.push(...oldValues, newAddress);
    } else {
      arrList.push(newAddress);
    }
    showSuccess();
    storeData("@registered", arrList);
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
        <TouchableOpacity
          style={styles.fullAddressButton}
          activeOpacity={0.9}
          // onPress={() => {
          //   Clipboard.getStringAsync().then((res) => {
          //     if (res !== data.label) {
          //       Vibration.vibrate(myConstants.vibrate);
          //       copied();
          //     }
          //   });
          //   Clipboard.setString(data.label);
          // }}
        >
          <Text style={styles.fullAddressButtonText}>{data.label}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Adres Kodunuz</Text>
        <TouchableOpacity
          style={styles.addressCodeButton}
          activeOpacity={0.9}
          // onPress={() => {
          //   Clipboard.getStringAsync().then((res) => {
          //     if (res !== String(data.value)) {
          //       Vibration.vibrate(myConstants.vibrate);
          //       copied();
          //     }
          //   });
          //   Clipboard.setString(String(data.value));
          // }}
        >
          <Text style={styles.addressCodeButtonText}>{data.value}</Text>
        </TouchableOpacity>
        <View style={styles.bottomButtonsView}>
          <TouchableOpacity style={styles.homeButton} activeOpacity={0.9} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home-sharp" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerAddressButton}
            activeOpacity={0.9}
            onPress={() => {
              registerAddress(data);
            }}
          >
            <Text style={styles.registerAddressButtonText}>Adresi Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FindResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myConstants.white,
  },
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
  registerAddressButton: {
    height: myConstants.buttonHeight,
    width: myConstants.buttonWidth / 2 - 5,
    backgroundColor: myConstants.darkblue,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginLeft: 7.5,
  },
  registerAddressButtonText: {
    color: myConstants.white,
    fontSize: myConstants.textBigSize,
    textAlign: "center",
    fontWeight: "bold",
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
  headerText: { marginBottom: 5, fontSize: 20, fontWeight: "bold" },

  bottomButtonsView: {
    flexDirection: "row",
  },
});
