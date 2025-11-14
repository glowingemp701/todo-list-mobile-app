import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import Header from "../../../components/common/Header";
import InputField from "../../../components/common/InputField";
import PrimaryButton from "../../../components/common/PrimaryButton";
import { Images } from "../../../assets/assets";
import fonts from "../../../theme/fonts";
import Colors from "../../../theme/color";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask } from "../../../services/taskApi";
import { formatDateForAPI, formatTimeForAPI, formatDateDisplay, formatTimeDisplay } from "../../../utils/dateUtils";

const AddTaskScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Date and time picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({
    subject: "",
    date: "",
    task: ""
  });

  // Date picker handler
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setErrors({ ...errors, date: "" });
    }
  };

  // Time picker handler
  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = {
      subject: "",
      date: "",
      task: ""
    };

    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    } else if (subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
      valid = false;
    } else if (subject.trim().length > 100) {
      newErrors.subject = "Subject must be less than 100 characters";
      valid = false;
    }

    if (!date) {
      newErrors.date = "Date is required";
      valid = false;
    }

    if (!task.trim()) {
      newErrors.task = "Task description is required";
      valid = false;
    } else if (task.trim().length < 10) {
      newErrors.task = "Description must be at least 10 characters";
      valid = false;
    } else if (task.trim().length > 500) {
      newErrors.task = "Description must be less than 500 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before saving');
      return;
    }

    try {
      setLoading(true);

      const taskData = {
        subject: subject.trim(),
        date: formatDateForAPI(date),
        time: formatTimeForAPI(time), // Now formats as HH:MM without seconds
        description: task.trim(),
        completionStatus: false // Always false for new tasks
      };

      console.log('📤 Sending task data:', JSON.stringify(taskData, null, 2));

      const response = await createTask(taskData);

      console.log('📥 Response:', response);

      if (response.success) {
        Alert.alert(
          '✅ Success',
          'Task created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                setSubject('');
                setDate(new Date());
                setTime(new Date());
                setTask('');
                setErrors({ subject: "", date: "", task: "" });
                navigation.goBack();
              }
            }
          ]
        );
      }
    } catch (error: any) {
      console.error('❌ Error creating task:', error);
      console.error('❌ Error response:', error.response?.data);
      
      let errorMessage = 'Failed to create task. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('❌ Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Header title={t("addTask.title")} onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>
          {/* SUBJECT */}
          <Text style={styles.label}>
            {t("addTask.subject")} <Text style={styles.required}>*</Text>
          </Text>
          <InputField
            icon={Images.subject}
            placeholder={t("addTask.subjectPlaceholder")}
            value={subject}
            onChange={(text) => {
              setSubject(text);
              if (errors.subject) setErrors({ ...errors, subject: "" });
            }}
          />
          {errors.subject ? <Text style={styles.errorText}>{errors.subject}</Text> : null}

          {/* DATE */}
          <Text style={styles.label}>
            {t("addTask.date")} <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View pointerEvents="none">
              <InputField
                icon={Images.date}
                placeholder={t("addTask.datePlaceholder")}
                value={formatDateDisplay(date)}
                onChange={() => {}}
              />
            </View>
          </TouchableOpacity>
          {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}

          {/* TIME */}
          <Text style={styles.label}>
            Time <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <View pointerEvents="none">
              <InputField
                icon={Images.date}
                placeholder="Select time"
                value={formatTimeDisplay(time)}
                onChange={() => {}}
              />
            </View>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}

          {/* TASK DESCRIPTION */}
          <Text style={styles.label}>
            {t("addTask.task")} <Text style={styles.required}>*</Text>
          </Text>
          <InputField
            icon={Images.task}
            placeholder={t("addTask.taskPlaceholder")}
            value={task}
            onChange={(text) => {
              setTask(text);
              if (errors.task) setErrors({ ...errors, task: "" });
            }}
            multiline
            height={130}
          />
          {errors.task ? <Text style={styles.errorText}>{errors.task}</Text> : null}

          {/* BUTTON */}
          <View style={styles.buttonWrapper}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.black} />
                <Text style={styles.loadingText}>Creating task...</Text>
              </View>
            ) : (
              <PrimaryButton
                title={t("addTask.save")}
                onPress={handleSave}
              />
            )}
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
  required: {
    color: 'red',
    fontSize: 16
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    marginLeft: 5
  },
  buttonWrapper: {
    marginTop: 30,
    marginBottom: 10
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  loadingText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.black,
    marginTop: 10
  }
});