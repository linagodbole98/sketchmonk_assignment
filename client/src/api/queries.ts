import { useQuery } from '@tanstack/react-query';
import { dashboardData } from '../constants/dashboardData';

// Types
export interface DashboardData {
  overview: {
    totalIncome: OverviewStat;
    profit: OverviewStat;
    totalViews: OverviewStat;
    conversionRate: OverviewStat;
  };
  revenueOverTime: {
    months: string[];
    totalRevenue: number[];
    totalTarget: number[];
  };
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
    active: number;
    inactive: number;
  };
  sessions: any; // Add sessions type
}

interface OverviewStat {
  value: number;
  percentageChange: number;
  trend: 'up' | 'down' | null;
}

// Hooks
export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => Promise.resolve(dashboardData)
  });
};

export const useOverviewStats = () => {
  return useQuery({
    queryKey: ['overview'],
    queryFn: () => Promise.resolve(dashboardData.overview)
  });
};

export const useRevenueData = () => {
  return useQuery({
    queryKey: ['revenue'],
    queryFn: () => Promise.resolve(dashboardData.revenueOverTime)
  });
};

export const useSalesData = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: () => Promise.resolve(dashboardData.salesByRegion)
  });
};

export const usePlatformData = () => {
  return useQuery({
    queryKey: ['platform'],
    queryFn: () => Promise.resolve(dashboardData.ecommercePlatform)
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => Promise.resolve(dashboardData.registeredUsers)
  });
};

export const useSessionsData = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: () => Promise.resolve(dashboardData.sessions)
  });
};
