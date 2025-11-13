import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import Header from "../../../components/common/Header";
import InputField from "../../../components/common/InputField";
import PrimaryButton from "../../../components/common/PrimaryButton";
import { Images } from "../../../assets/assets";
import fonts from "../../../theme/fonts";
import Colors from "../../../theme/color";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTaskScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Header title={t("addTask.title")} onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>
          {/* SUBJECT */}
          <Text style={styles.label}>{t("addTask.subject")}</Text>
          <InputField
            icon={Images.subject}
            placeholder={t("addTask.subjectPlaceholder")}
            value={subject}
            onChange={setSubject}
          />

          {/* DATE */}
          <Text style={styles.label}>{t("addTask.date")}</Text>
          <InputField
            icon={Images.date}
            placeholder={t("addTask.datePlaceholder")}
            value={date}
            onChange={setDate}
          />

          {/* TASK */}
          <Text style={styles.label}>{t("addTask.task")}</Text>
          <InputField
            icon={Images.task}
            placeholder={t("addTask.taskPlaceholder")}
            value={task}
            onChange={setTask}
            multiline
            height={130}
          />

          {/* BUTTON */}
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title={t("addTask.save")}
              onPress={() => console.log("Task Saved")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    minHeight: '100%'
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: Colors.black,
    marginTop: 10,
    marginBottom: 6
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: '100%',
  }
});
