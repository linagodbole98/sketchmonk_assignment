import ReactECharts from 'echarts-for-react';
import { useUserStats } from '../../api/queries';
import { NoData } from '../NoData';

export const UsersGaugeChart = () => {
  const { data: userData, isLoading, error } = useUserStats();

  if (isLoading) return <div>Loading...</div>;
  if (error || !userData) return <NoData message="Error loading user stats" />;

  const activePercentage = (userData.active / userData.total) * 100;

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 8,
        radius: '100%',
        progress: {
          show: true,
          roundCap: true,
          width: 16,
          itemStyle: {
            color: '#10b981'
          }
        },
        pointer: {
          show: false
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 16,
            color: [
              [1, '#eaeaea']
            ]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          show: false
        },
        data: [
          {
            value: activePercentage
          }
        ]
      }
    ]
  };

  return (
    <div className="h-[300px] relative">
      <ReactECharts
        option={option}
        style={{ height: '100%' }}
        opts={{ renderer: 'svg' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-gray-800">{userData.total.toLocaleString()}</div>
        <div className="text-sm text-gray-500 mt-1">Total Users</div>
        <div className="flex gap-8 mt-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-emerald-600">{userData.active.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-400">{userData.inactive.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Inactive</div>
          </div>
        </div>
      </div>
    </div>
  );
};
