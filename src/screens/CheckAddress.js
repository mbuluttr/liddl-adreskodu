import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import myConstants from "../constants/myConstants";
import axios from "axios";
import qs from "qs";
import InformationModal from "../components/InformationModal";
import { env } from "../../environments";

const CheckAddress = ({ navigation }) => {
  const [indicator, setIndicator] = useState(false);
  const [code, setCode] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const modalHandler = () => {
    setModalVisible(!isModalVisible);
  };

  const getData = async (value) => {
    try {
      setIndicator(true);
      const response = await axios({
        method: "post",
        url: env.API_URL,
        data: qs.stringify({
          liddl_adres: value,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      const status = await response.data.status;
      const data = await response.data.data;
      setIndicator(false);
      if (status === true) {
        navigation.navigate("Find Result", {
          data: data,
        });
      } else {
        modalHandler();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            height: hp("40%"),
            width: wp("100%"),
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: hp("4%") }}>Adres Doğrulama</Text>

          <View>
            <TextInput
              keyboardType="numeric"
              placeholder={"Adres kodunuz"}
              style={styles.textInput}
              onChangeText={(text) => setCode(text)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={() => {
              if (Number(code)) {
                getData(code);
              }
            }}
          >
            <Text
              style={{
                color: myConstants.white,
                fontSize: myConstants.textMaxSize,
              }}
            >
              Kontrol Et
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.indicator}>
        {indicator ? <ActivityIndicator size={hp("10%")} color={myConstants.green} /> : null}
      </View>
      <InformationModal
        isModalVisible={isModalVisible}
        modalHandler={modalHandler}
        navigation={navigation}
        modalType={false}
      />
    </View>
  );
};

export default CheckAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myConstants.white,
    justifyContent: "center",
  },
  indicator: {
    height: hp("10%"),
    justifyContent: "center",
    top: 50,
  },
  button: {
    height: myConstants.buttonHeight,
    width: myConstants.buttonWidth,
    borderRadius: 10,
    backgroundColor: myConstants.darkblue,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: myConstants.buttonHeight,
    width: myConstants.buttonWidth,
    borderWidth: 2,
    borderColor: myConstants.darkblue,
    backgroundColor: myConstants.white,
    borderRadius: 10,
    elevation: 5,
    fontSize: hp("3.5"),
    padding: 10,
  },
});
