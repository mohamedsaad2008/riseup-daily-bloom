import axios from 'axios';

const API_URL = '/api'; // This will use the proxy defined in vite.config.ts

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: async (userData: { username: string; password: string; name?: string; email?: string }) => {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Dashboard services
export const dashboardService = {
  getDashboardData: async (date?: string) => {
    const params = date ? { date } : {};
    const response = await api.get('/dashboard', { params });
    return response.data;
  }
};

// Habit services
export const habitService = {
  updateHabit: async (habitId: number, value: number, date?: string) => {
    const response = await api.post(`/habits/${habitId}`, { value, date });
    return response.data;
  }
};

// Prayer services
export const prayerService = {
  updatePrayer: async (prayer: string, completed: boolean, date?: string) => {
    const response = await api.post('/prayers', { prayer, completed, date });
    return response.data;
  }
};

// Water services
export const waterService = {
  updateWaterIntake: async (glasses: number, date?: string) => {
    const response = await api.post('/water', { glasses, date });
    return response.data;
  }
};

// Meal services
export const mealService = {
  updateMeal: async (meal: string, completed: boolean, date?: string) => {
    const response = await api.post('/meals', { meal, completed, date });
    return response.data;
  }
};

// Weight services
export const weightService = {
  addWeightEntry: async (weight: number, goalWeight?: number, date?: string) => {
    const response = await api.post('/weight', { weight, goalWeight, date });
    return response.data;
  },
  
  getWeightHistory: async () => {
    const response = await api.get('/dashboard');
    return response.data.weightHistory;
  }
};

// Study services
export const studyService = {
  addStudySession: async (duration: number, date?: string) => {
    const response = await api.post('/study', { duration, date });
    return response.data;
  }
};

// Workout services
export const workoutService = {
  addWorkoutSession: async (duration: number, type?: string, date?: string) => {
    const response = await api.post('/workout', { duration, type, date });
    return response.data;
  }
};

export default api;