// Dashboard API Service
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token'); // Use correct token key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token'); // Use correct token key
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface DashboardStats {
  totalRevenue: {
    value: number;
    change: string;
    changeText: string;
    changeType: 'positive' | 'negative';
  };
  activeRentals: {
    value: number;
    change: string;
    changeText: string;
    changeType: 'positive' | 'negative';
  };
  totalCustomers: {
    value: number;
    change: string;
    changeText: string;
    changeType: 'positive' | 'negative';
  };
  pendingReturns: {
    value: number;
    change: string;
    changeText: string;
    changeType: 'positive' | 'negative';
  };
}

export interface RecentBooking {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
  createdAt: string;
}

export interface RecentActivity {
  type: string;
  message: string;
  details: string;
  timestamp: string;
  color: string;
  timeAgo: string;
}

export interface PopularProduct {
  name: string;
  bookings: number;
  revenue: number;
}

export interface ChartData {
  date: string;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  popularProducts: PopularProduct[];
  revenueChart: ChartData[];
}

class DashboardService {
  // Get dashboard statistics
  async getDashboardStats(period = '30'): Promise<DashboardData> {
    try {
      const response = await api.get(`/dashboard/stats?period=${period}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Get recent bookings
  async getRecentBookings(limit = 10): Promise<RecentBooking[]> {
    try {
      const response = await api.get(`/dashboard/recent-bookings?limit=${limit}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching recent bookings:', error);
      throw error;
    }
  }

  // Get recent activities
  async getRecentActivities(limit = 10): Promise<RecentActivity[]> {
    try {
      const response = await api.get(`/dashboard/recent-activities?limit=${limit}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }
  }

  // Real-time data polling
  startPolling(
    callback: (data: {
      stats: DashboardData;
      bookings: RecentBooking[];
      activities: RecentActivity[];
    }) => void,
    interval = 30000 // 30 seconds
  ): NodeJS.Timeout {
    const poll = async () => {
      try {
        const [stats, bookings, activities] = await Promise.all([
          this.getDashboardStats(),
          this.getRecentBookings(),
          this.getRecentActivities()
        ]);

        callback({ stats, bookings, activities });
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Initial load
    poll();

    // Set up polling interval
    return setInterval(poll, interval);
  }

  stopPolling(intervalId: NodeJS.Timeout): void {
    clearInterval(intervalId);
  }
}

export default new DashboardService();
