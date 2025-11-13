import { StyleSheet } from "react-native";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 180,
    height: 40,
    resizeMode: "contain"
  },
  text: {
    marginTop: 20,
    color: Colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 20
  }
});

export default styles;
