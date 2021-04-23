import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import myConstants from "../constants/myConstants";
import StepIndicator from "react-native-step-indicator";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { customStyles, labels } from "../constants/Step";
import InformationModal from "../components/InformationModal";
import axios from "axios";
import qs from "qs";
import { env } from "../../environments";

const FindApartment = ({ navigation, route }) => {
  const [indicator, setIndicator] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const modalHandler = () => {
    setModalVisible(!isModalVisible);
  };

  const { apartment, neighborhoodValue } = route.params;

  const onlyOne = async (value) => {
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

  const getDoorNumber = async (value) => {
    try {
      setIndicator(true);
      const response = await axios({
        method: "post",
        url: env.API_URL,
        data: qs.stringify({
          liddl_mahal: neighborhoodValue,
          liddl_kapino: value,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      const status = await response.data.status;
      const data = await response.data.data;
      setIndicator(false);
      if (status === true) {
        if (data.length > 1) {
          navigation.navigate("Find Door Number", {
            doorNumber: data,
          });
        } else {
          onlyOne(data[0].value);
        }
      } else {
        modalHandler();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderLabel = ({ position, label, currentPosition }) => {
    return <Text style={position === currentPosition ? styles.stepLabelSelected : styles.stepLabel}>{label}</Text>;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <View style={styles.stepView}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={4}
          stepCount={6}
          labels={labels}
          renderLabel={renderLabel}
        />
      </View>
      <View style={styles.dropdownView}>
        <DropDownPicker
          items={apartment}
          style={{ backgroundColor: myConstants.white, elevation: 5 }}
          containerStyle={{
            height: hp("9%"),
            width: wp("75%"),
          }}
          dropDownStyle={{ backgroundColor: myConstants.white, elevation: 5 }}
          labelStyle={{
            fontSize: myConstants.textBigSize,
            color: myConstants.black,
          }}
          placeholderStyle={{
            fontSize: myConstants.textBigSize,
          }}
          searchableStyle={{
            fontSize: myConstants.textBigSize,
          }}
          searchable
          placeholder={"Apartman no seçiniz"}
          searchablePlaceholder={"Ara"}
          dropDownMaxHeight={hp("40%")}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          onChangeItem={(item) => {
            getDoorNumber(item.value);
          }}
        />
        <View style={styles.indicator}>
          {indicator ? <ActivityIndicator size={hp("10%")} color={myConstants.green} /> : null}
        </View>
      </View>
      <InformationModal
        isModalVisible={isModalVisible}
        modalHandler={modalHandler}
        navigation={navigation}
        modalType={false}
      />
    </KeyboardAvoidingView>
  );
};

export default FindApartment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myConstants.white,
  },
  stepView: { height: hp("20%"), width: wp("100%"), justifyContent: "center" },
  dropdownView: {
    height: hp("80%"),
    width: wp("100%"),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  indicator: { height: hp("10%") },
  stepLabel: {
    fontSize: myConstants.textSmallSize,
    color: myConstants.gray,
  },
  stepLabelSelected: {
    fontSize: myConstants.textSmallSize,
    color: myConstants.black,
  },
});
