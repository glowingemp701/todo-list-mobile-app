import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";

interface Props {
  icon: any;
  placeholder: string;
  multiline?: boolean;
  value: string;
  onChange: (text: string) => void;
  height?: number;
}

const InputField: React.FC<Props> = ({
  icon,
  placeholder,
  multiline = false,
  value,
  onChange,
  height = 55
}) => {
  return (
    <View style={[styles.container, { height }, multiline && styles.multilineContainer]}>
      <Image source={icon} style={[styles.icon, multiline && styles.iconTop]} />

      <TextInput
        style={[
          styles.input, 
          multiline && { 
            height: "100%", 
            textAlignVertical: "top",
            paddingTop: 0,
            marginTop: 2
          }
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    // marginTop: 6,
    backgroundColor: "#FFF"
  },
  multilineContainer: {
    alignItems: "flex-start",
    paddingVertical: 15
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#888",
    marginRight: 10
  },
  iconTop: {
    marginTop: 2
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15
  }
});
