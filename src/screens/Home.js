import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import myConstants from "../constants/myConstants";
import * as Animatable from "react-native-animatable";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.homeVideoView}>
        <Animatable.Image
          animation="fadeInUpBig"
          style={styles.homeVideo}
          source={require("../assets/images/home.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.homeButtonView}>
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Find City")}
        >
          <Text style={styles.homeButtonText}>Adres Sorgula</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Check Address")}
        >
          <Text style={styles.homeButtonText}>Adres Doğrula</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Registered Addresses")}
        >
          <Text style={styles.homeButtonText}>Kayıtlı Adreslerim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myConstants.white,
  },
  homeVideoView: {
    height: hp("50%"),
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
  homeVideo: {
    height: hp("50%"),
    width: hp("35%"),
  },
  homeButtonView: {
    alignItems: "center",
    height: hp("50%"),
    width: wp("100%"),
  },
  homeButton: {
    width: myConstants.buttonWidth,
    height: myConstants.buttonHeight,
    backgroundColor: myConstants.darkblue,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    elevation: 5,
  },
  homeButtonText: {
    color: myConstants.white,
    fontSize: myConstants.textMaxSize,
  },
});
