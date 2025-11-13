import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import AppHeader from "../../components/common/AppHeader";
import Calendar from "../../components/home/Calendar";
import TaskCard from "../../components/home/TaskCard";
import FAB from "../../components/common/FAB";
import fonts from "../../theme/fonts";
import Colors from "../../theme/color";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const [selectedDay, setSelectedDay] = useState(1);

  const days = [
    { label: "WED", date: 25 },
    { label: "THU", date: 26 },
    { label: "FRI", date: 27 },
    { label: "SAT", date: 28 },
    { label: "SUN", date: 29 }
  ];

  const [tasks, setTasks] = useState([
    { title: "Today Meeting", time: "02:30 PM.", enabled: false },
    { title: "Today Meeting", time: "02:30 PM.", enabled: true },
    { title: "Today Meeting", time: "02:30 PM.", enabled: false }
  ]);

  const toggleSwitch = (index: number, value: boolean) => {
    const updated = [...tasks];
    updated[index].enabled = value;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <ScrollView>
        <AppHeader />

        <Text style={styles.title}>{t("home.today")}</Text>

        <Calendar
          days={days}
          selected={selectedDay}
          onSelect={(index) => setSelectedDay(index)}
        />

        <Text style={styles.section}>{t("home.todaysTask")}</Text>

        {tasks.map((task, i) => (
          <TaskCard
            key={i}
            title={task.title}
            time={task.time}
            enabled={task.enabled}
            onToggle={(v) => toggleSwitch(i, v)}
            onDelete={() => deleteTask(i)}
          />
        ))}

        <Text style={styles.section}>{t("home.yesterdayTask")}</Text>

        <TaskCard
          title="Meeting with John"
          time="02:30 PM."
          enabled={true}
          onToggle={() => {}}
        />
        <TaskCard
          title="Meeting with John"
          time="02:30 PM."
          enabled={false}
          onToggle={() => {}}
        />
      </ScrollView>

      <FAB onPress={() => navigation.navigate("AddTask")} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.extraBold,
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20
  },
  section: {
    fontFamily: fonts.bold,
    fontSize: 16,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    color: Colors.black
  }
});
