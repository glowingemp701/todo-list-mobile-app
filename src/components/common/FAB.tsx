import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Images } from "../../assets/assets";
import Colors from "../../theme/color";

interface Props {
  onPress: () => void;
}

const FAB: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Image source={Images.add} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: "#FFF"
  }
});
