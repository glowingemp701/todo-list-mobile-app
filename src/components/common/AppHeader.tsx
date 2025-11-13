import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Images } from "../../assets/assets";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";
import { useTranslation } from "react-i18next";

interface Props {
  onSearch?: () => void;
  onNotification?: () => void;
}

const AppHeader: React.FC<Props> = ({ onSearch, onNotification }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={Images.profile} style={styles.profile} />
        <View>
          <Text style={styles.welcome}>{t("home.welcomeBack")}</Text>
          <Text style={styles.user}>{t("home.user")}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={onSearch} style={styles.iconWrapper}>
          <Image source={Images.search} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNotification} style={styles.iconWrapper}>
          <Image source={Images.notification} style={styles.icon} />
          {/* <View style={styles.redDot} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // marginTop: 20
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 10
  },
  welcome: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: "#7A7A7A"
  },
  user: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: Colors.black
  },
  right: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 40,
    // backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  icon: {
    width:36,
    height: 36,
    tintColor: Colors.black
  },

});
