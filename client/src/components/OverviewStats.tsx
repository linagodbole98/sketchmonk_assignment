import { useDashboardData } from '../api/queries';
import { NoData } from './NoData';

interface StatCardProps {
  title: string
  value: number
  percentageChange: number
  trend: 'up' | 'down' | null
  format?: 'number' | 'currency' | 'percentage'
}

const StatCard = ({ title, value, percentageChange, trend, format = 'number' }: StatCardProps) => {
  const formatValue = (val: number) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    } else if (format === 'percentage') {
      return val.toFixed(2) + '%';
    }
    return new Intl.NumberFormat('en-US').format(val);
  };

  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-lg p-3 shadow border">
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <div className="text-2xl font-semibold">{formatValue(value)}</div>
      <div className="flex justify-start items-end pt-4">
       
        <div className={`flex items-center font-bold text-sm ${trendColor}  border bg-green-200 border-[#287F71] px-1 rounded-md`}>
          {trend === 'up' ? '↑' : '↓'}
          <span className="ml-1">{Math.abs(percentageChange)}%</span>
       
        </div>
        <div className="text-sm text-gray-400 mt-1 pl-1">Compared to last month</div>
      </div>
  
    </div>
  );
};

export const OverviewStats = () => {
  const { data: dashboardData, isLoading, error } = useDashboardData();

  if (isLoading) return <div>Loading...</div>;
  if (error || !dashboardData) return <NoData message="Error loading overview stats" />;

  const { overview } = dashboardData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Income"
        value={overview.totalIncome.value}
        percentageChange={overview.totalIncome.percentageChange}
        trend={overview.totalIncome.trend}
        format="currency"
      />
      <StatCard
        title="Profit"
        value={overview.profit.value}
        percentageChange={overview.profit.percentageChange}
        trend={overview.profit.trend}
        format="currency"
      />
      <StatCard
        title="Total Views"
        value={overview.totalViews.value}
        percentageChange={overview.totalViews.percentageChange}
        trend={overview.totalViews.trend}
      />
      <StatCard
        title="Conversion Rate"
        value={overview.conversionRate.value}
        percentageChange={overview.conversionRate.percentageChange}
        trend={overview.conversionRate.trend}
        format="percentage"
      />
    </div>
  );
};
