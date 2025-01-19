import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dashboard data types
export interface DashboardData {
  overview: {
    totalIncome: {
      value: number;
      percentageChange: number;
      trend: 'up' | 'down';
    };
    totalViews: {
      value: number;
      percentageChange: number;
      trend: 'up' | 'down';
    };
    conversionRate: {
      value: number;
      percentageChange: number;
      trend: 'up' | 'down';
    };
  };
  revenueOverTime: {
    months: string[];
    totalRevenue: number[];
    totalTarget: number[];
  };
  sessionsByCountry: Array<{
    country: string;
    value: number;
    percentage: number;
  }>;
  salesByRegion: {
    regions: string[];
    values: number[];
  };
  ecommercePlatform: Array<{
    platform: string;
    percentage: number;
  }>;
  registeredUsers: {
    total: number;
    premium: number;
    basic: number;
  };
}

// API functions
export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await api.get<DashboardData>('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
};

export const seedDatabase = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>('/seed');
    return response.data;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw new Error('Failed to seed database');
  }
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server Error:', error.response.data);
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network error occurred');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw new Error('An error occurred');
    }
  }
);
