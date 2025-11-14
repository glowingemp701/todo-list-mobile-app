import apiClient from './api';

export interface Task {
  id: number;
  subject: string;
  date: string;
  time: string;
  description: string;
  completion_status: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  subject: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format (no seconds)
  description: string;
  completionStatus: boolean;
}

export interface UpdateTaskPayload {
  subject?: string;
  date?: string;
  time?: string;
  description?: string;
  completionStatus?: boolean;
}

export interface TaskResponse {
  success: boolean;
  message: string;
  data: Task | Task[] | null;
  timestamp: string;
}

export interface TasksByDateResponse {
  success: boolean;
  message: string;
  data: {
    today: Task[];
    previous: Task[];
    upcoming: Task[];
  };
  timestamp: string;
}

// Get tasks by date filter
export const getTasksByDate = async (filter: 'all' | 'today' | 'previous' | 'upcoming' = 'all'): Promise<TasksByDateResponse> => {
  try {
    const response = await apiClient.get(`/tasks/by-date?filter=${filter}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Create new task
export const createTask = async (taskData: CreateTaskPayload): Promise<TaskResponse> => {
  try {
    const response = await apiClient.post('/tasks', taskData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update task
export const updateTask = async (taskId: number, taskData: UpdateTaskPayload): Promise<TaskResponse> => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, taskData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete task
export const deleteTask = async (taskId: number): Promise<TaskResponse> => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    throw error;
  }
};