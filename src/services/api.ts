import axios from 'axios';

// Base URL configuration
const BASE_URL = 'http://10.0.2.2:3000/api/v1';
// Android Emulator: http://10.0.2.2:3000/api/v1
// iOS Simulator: http://localhost:3000/api/v1
// Physical Device: http://YOUR_IP:3000/api/v1
// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors globally
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);

export default apiClient;