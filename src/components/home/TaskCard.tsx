import React, { useRef } from "react";
import { View, Text, Image, StyleSheet, Switch, Animated, PanResponder, TouchableOpacity } from "react-native";
import { Images } from "../../assets/assets";
import Colors from "../../theme/color";
import fonts from "../../theme/fonts";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  time: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  onDelete?: () => void;
}

const TaskCard: React.FC<Props> = ({ title, time, enabled, onToggle, onDelete }) => {
  const { t } = useTranslation();
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 10;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx < 0) {
        translateX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -100) {
        // Swipe left threshold reached - show delete option
        Animated.timing(translateX, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        // Snap back to original position
        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <View style={styles.container}>
      {/* Delete button background */}
      <View style={styles.deleteBackground}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Image source={Images.deleteIcon} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>

      {/* Main card content */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Image source={Images.file} style={styles.icon} />

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>
            {t("home.meeting")} {time}
          </Text>
        </View>

        <Switch 
          value={enabled} 
          onValueChange={onToggle}
          trackColor={{ false: '#DBDBDB', true: '#838383' }}
          thumbColor={enabled ? '#000000' : '#FFFFFF'}
        />
      </Animated.View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 5,
    position: 'relative',
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 70,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#FF4444',
    // borderRadius: 10,
  },
  deleteButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#CC0000',
    borderRadius: 30,
  },
  deleteIcon: {
    width: 38,
    height: 38,
    // tintColor: Colors.white,
  },
  card: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
  },
  icon: {
    width: 44,
    height: 44,
    marginRight: 10,
    // tintColor: Colors.black
  },
  info: {
    flex: 1
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: Colors.black
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: "#888",
    marginTop: 3
  }
});
