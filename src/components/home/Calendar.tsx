import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";

interface Day {
  label: string;
  date: number;
}

interface Props {
  days: Day[];
  selected: number;
  onSelect: (index: number) => void;
}

const Calendar: React.FC<Props> = ({ days, selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {days.map((d, index) => {
        const active = selected === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.card, active && styles.activeCard]}
            onPress={() => onSelect(index)}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>
              {d.label}
            </Text>
            <Text style={[styles.date, active && styles.activeDate]}>
              {d.date}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 8
  },
  card: {
    width: 60,
    height: 68,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  activeCard: {
    backgroundColor: Colors.black,
    borderColor: Colors.black
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: "#9B9B9B"
  },
  activeLabel: {
    color: "#FFF"
  },
  date: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: "#9B9B9B",
    marginTop: 5
  },
  activeDate: {
    color: "#FFF"
  }
});
