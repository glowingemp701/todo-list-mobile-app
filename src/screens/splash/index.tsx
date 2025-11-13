import React, { useEffect } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { Images } from "../../assets/assets";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const SplashScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <Image source={Images.logo} style={styles.logo} />
      {/* <Text style={styles.text}>{t("splash.welcome")}</Text> */}
    </View>
  );
};

export default SplashScreen;
