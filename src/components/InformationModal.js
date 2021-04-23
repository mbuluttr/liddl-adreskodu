import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import myConstants from "../constants/myConstants";
import Ionicons from "react-native-vector-icons/Ionicons";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const InformationModal = ({ isModalVisible, modalHandler, navigation, modalType, remove }) => {
  const emptyModal = (
    <Modal
      isVisible={isModalVisible}
      backdropColor={myConstants.red}
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
    >
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Bu adres henüz sistemde kayıtlı değil</Text>
        <View style={styles.hr} />
        <View style={styles.bottomButtonsView}>
          <TouchableOpacity
            style={styles.homeButton}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="home-sharp" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} activeOpacity={0.9} onPress={() => modalHandler()}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const deleteModal = (
    <Modal
      isVisible={isModalVisible}
      backdropColor={myConstants.red}
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
    >
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Bu adresi silmek istiyor musunuz?</Text>
        <View style={styles.hr} />
        <View style={styles.bottomButtonsView}>
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.9}
            onPress={() => {
              remove();
              navigation.navigate("Registered Addresses");
            }}
          >
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} activeOpacity={0.9} onPress={() => modalHandler()}>
            <Text style={styles.closeButtonText}>Vazgeç</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return modalType ? deleteModal : emptyModal;
};

export default InformationModal;

const styles = StyleSheet.create({
  content: {
    backgroundColor: myConstants.white,
    height: hp("30%"),
    padding: 22,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
  contentTitle: {
    fontSize: hp("3%"),
    textAlign: "center",
    fontWeight: "bold",
  },
  closeButton: {
    height: myConstants.buttonHeight / 1.5,
    width: myConstants.buttonWidth / 2 - 5,
    backgroundColor: myConstants.darkblue,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginLeft: 7.5,
  },
  closeButtonText: {
    color: myConstants.white,
    fontSize: myConstants.textBigSize,
    textAlign: "center",
    fontWeight: "bold",
  },
  homeButton: {
    height: myConstants.buttonHeight / 1.5,
    width: myConstants.buttonWidth / 2 - 5,
    backgroundColor: myConstants.darkblue,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginRight: 7.5,
  },
  deleteButton: {
    height: myConstants.buttonHeight / 1.5,
    width: myConstants.buttonWidth / 2 - 5,
    backgroundColor: myConstants.red,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginRight: 7.5,
  },

  bottomButtonsView: {
    flexDirection: "row",
  },
  hr: {
    width: wp("50%"),
    height: hp("0.2%"),
    backgroundColor: myConstants.gray,
    opacity: 0.1,
    marginTop: 10,
  },
});
