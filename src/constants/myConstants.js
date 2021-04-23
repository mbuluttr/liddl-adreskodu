import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const myConstants = {
  white: "#FFFFFF",
  lightwhite: "#F6F7EB",
  darkblue: "#14213D",
  green: "#228147",
  red: "#BA2626",
  black: "#000000",
  gray: "#666666",
  vibrate: 100,
  buttonWidth: wp("70%"),
  buttonHeight: hp("10%"),
  buttonLargeHeight: hp("20%"),
  textSmallSize: hp("1.8%"), // 14
  textMidSize: hp("2.1%"), // 16
  textBigSize: hp("2.5%"), // 18
  textMaxSize: hp("2.7%"), // 20
};

export default myConstants;
