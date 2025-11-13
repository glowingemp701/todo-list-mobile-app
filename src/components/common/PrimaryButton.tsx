import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";

interface Props {
  title: string;
  onPress: () => void;
}

const PrimaryButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.black,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    // marginTop: 40,
    marginBottom: 10
  },
  text: {
    fontFamily: fonts.bold,
    color: "#FFF",
    fontSize: 17
  }
});
