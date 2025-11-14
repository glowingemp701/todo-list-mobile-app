import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar, ActivityIndicator, Alert, RefreshControl } from "react-native";
import AppHeader from "../../components/common/AppHeader";
import Calendar from "../../components/home/Calendar";
import TaskCard from "../../components/home/TaskCard";
import FAB from "../../components/common/FAB";
import fonts from "../../theme/fonts";
import Colors from "../../theme/color";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTasksByDate, updateTask, deleteTask as deleteTaskApi, Task } from "../../services/taskApi";
import { useFocusEffect } from "@react-navigation/native";
import { generateCalendarDays, formatTimeDisplay } from "../../utils/dateUtils";

const HomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const [selectedDay, setSelectedDay] = useState(0); // Start with today (index 0)
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [previousTasks, setPreviousTasks] = useState<Task[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Generate calendar days based on current date
  const days = generateCalendarDays(5);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching tasks...');
      const response = await getTasksByDate('all');
      console.log('✅ Tasks fetched:', response);
      
      if (response.success) {
        setTodayTasks(response.data.today || []);
        setPreviousTasks(response.data.previous || []);
        setUpcomingTasks(response.data.upcoming || []);
      }
    } catch (error: any) {
      console.error('❌ Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to load tasks. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh tasks
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  // Load tasks when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Toggle task completion status (optimistic update)
  const toggleSwitch = async (taskId: number, currentStatus: boolean) => {
    try {
      console.log(`🔄 Toggling task ${taskId} from ${currentStatus} to ${!currentStatus}`);
      
      // Optimistically update UI immediately
      const updateTasksInState = (tasks: Task[]) => 
        tasks.map(task => 
          task.id === taskId 
            ? { ...task, completion_status: !currentStatus } 
            : task
        );

      setTodayTasks(prev => updateTasksInState(prev));
      setPreviousTasks(prev => updateTasksInState(prev));
      setUpcomingTasks(prev => updateTasksInState(prev));

      // Send API request
      const response = await updateTask(taskId, {
        completionStatus: !currentStatus
      });
      
      console.log('✅ Task updated:', response);
      
      if (!response.success) {
        // Revert on failure
        console.log('⚠️ Update failed, reverting...');
        await fetchTasks();
      }
    } catch (error: any) {
      console.error('❌ Error updating task:', error);
      Alert.alert('Error', 'Failed to update task. Please try again.');
      // Revert changes
      await fetchTasks();
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId: number) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log(`🗑️ Deleting task ${taskId}...`);
              const response = await deleteTaskApi(taskId);
              
              if (response.success) {
                console.log('✅ Task deleted');
                // Refresh tasks after deletion
                await fetchTasks();
              }
            } catch (error: any) {
              console.error('❌ Error deleting task:', error);
              Alert.alert('Error', 'Failed to delete task. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.black} />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[Colors.black]}
            tintColor={Colors.black}
          />
        }
      >
        <AppHeader />

        <Text style={styles.title}>{t("home.today")}</Text>

        <Calendar
          days={days}
          selected={selectedDay}
          onSelect={(index) => setSelectedDay(index)}
        />

        <Text style={styles.section}>{t("home.todaysTask")}</Text>

        {todayTasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks for today</Text>
        ) : (
          todayTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.subject}
              time={formatTimeDisplay(task.time)}
              enabled={task.completion_status}
              onToggle={() => toggleSwitch(task.id, task.completion_status)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}

        <Text style={styles.section}>{t("home.yesterdayTask")}</Text>

        {previousTasks.length === 0 ? (
          <Text style={styles.emptyText}>No previous tasks</Text>
        ) : (
          previousTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.subject}
              time={formatTimeDisplay(task.time)}
              enabled={task.completion_status}
              onToggle={() => toggleSwitch(task.id, task.completion_status)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}

        {upcomingTasks.length > 0 && (
          <>
            <Text style={styles.section}>Upcoming Tasks</Text>
            {upcomingTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.subject}
                time={formatTimeDisplay(task.time)}
                enabled={task.completion_status}
                onToggle={() => toggleSwitch(task.id, task.completion_status)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <FAB onPress={() => navigation.navigate("AddTask")} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontFamily: fonts.regular,
    marginTop: 10,
    fontSize: 14,
    color: '#888'
  },
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
    marginTop: 15,
    marginBottom: 5,
    color: Colors.black
  },
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: '#888',
    marginLeft: 20,
    marginVertical: 10,
    fontStyle: 'italic'
  }
});