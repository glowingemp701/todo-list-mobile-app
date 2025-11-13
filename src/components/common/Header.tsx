import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Images } from "../../assets/assets";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";

interface Props {
  title: string;
  onBack: () => void;
}

const Header: React.FC<Props> = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Image source={Images.back} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {/* Empty right side to balance layout */}
      <View style={{ width: 40 }} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingTop: 20,
    justifyContent: "space-between"
  },
  backBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#F5F5F5",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 36,
    height: 36,
    tintColor: Colors.black
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: Colors.black
  }
});
