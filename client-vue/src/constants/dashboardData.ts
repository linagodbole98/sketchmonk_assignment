export const dashboardData = {
  overview: {
    totalIncome: {
      value: 32499.93,
      percentageChange: 12.5,
      trend: 'up' as const
    },
    profit: {
      value: 10499.93,
      percentageChange: 8.3,
      trend: 'up' as const
    },
    totalViews: {
      value: 5211832,
      percentageChange: 15.2,
      trend: 'up' as const
    },
    conversionRate: {
      value: 4.83,
      percentageChange: -2.1,
      trend: 'down' as const
    }
  },
  revenueOverTime: {
    months: ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'],
    totalRevenue: [22839.89, 24500.45, 23100.23, 25600.78, 27800.34, 29400.56, 31200.45, 32499.93],
    totalTarget: [20000.00, 22000.00, 24000.00, 26000.00, 28000.00, 30000.00, 32000.00, 34000.00]
  },
  sessionsByCountry: [
    { country: 'Australia', value: 634, percentage: 8 },
    { country: 'Indonesia', value: 589, percentage: 12 },
    { country: 'Thailand', value: 562, percentage: 8.5 },
    { country: 'Germany', value: 453, percentage: 5.4 }
  ],
  sessions: [
    { country: 'Australia', value: 614, percentage: 9.5 },
    { country: 'Indonesia', value: 589, percentage: 7.2 },
    { country: 'France', value: 582, percentage: 6.2 },
    { country: 'Germany', value: 453, percentage: 5.4 },
  ],
  salesByRegion: {
    regions: ['Australia', 'Africa', 'Europe', 'Antarctica', 'Asia'],
    values: [2728, 2843, 3028, 1838, 2800]
  },
  ecommercePlatform: [
    { platform: 'Amazon', percentage: 45 },
    { platform: 'Tokopedia', percentage: 25 },
    { platform: 'Alibaba', percentage: 35 }
  ],
  registeredUsers: {
    total: 2324,
    active: 1809,
    inactive: 515,
  }
}
