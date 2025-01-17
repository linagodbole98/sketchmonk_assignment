import ReactECharts from 'echarts-for-react';
import { useRevenueData } from '../../api/queries';
import { NoData } from '../NoData';
import { LineChartSkeleton } from '../skeletons/ChartSkeletons';

export const RevenueChart = () => {
  const { data: revenueData, isLoading, error } = useRevenueData();

  if (isLoading) return <LineChartSkeleton />;
  if (error || !revenueData) return <NoData message="Error loading revenue data" />;

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1F2937',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
      },
      padding: [8, 12],
      formatter: (params: any) => {
        const date = params[0].name;
        const revenue = params[0].value;
        const target = params[1].value;
        return `
          <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">${date}</div>
          <div style="font-size: 12px;">Revenue: $${revenue.toLocaleString()}</div>
          <div style="font-size: 12px;">Target: $${target.toLocaleString()}</div>
        `;
      },
    },
    grid: {
      left: '8%',
      right: '8%',
      top: '15%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: revenueData.months,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        interval: 'auto',
      },
    },
    yAxis: {
      type: 'value',
      position: 'right',
      min: 0,
      minInterval: 1000,
      scale: true,
      axisLabel: {
        color: '#6B7280',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        formatter: (value: number) => {
          if (value === 0) return '$0';
          return `$${(value / 1000).toLocaleString()}K`;
        }
      },
      splitLine: {
        lineStyle: {
          color: '#F3F4F6',
          type: 'solid',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: revenueData.totalRevenue,
        lineStyle: {
          width: 2,
          color: '#287F71',
        },
        itemStyle: {
          color: '#287F71',
          borderWidth: 2,
          borderColor: '#fff',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(40, 127, 113, 0.2)'
            }, {
              offset: 1,
              color: 'rgba(40, 127, 113, 0.01)'
            }],
          }
        }
      },
      {
        name: 'Target',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: revenueData.targetRevenue,
        lineStyle: {
          width: 2,
          type: 'dashed',
          color: '#6B7280',
        },
      }
    ]
  };

  return (
    <div className="h-full w-full">
      <ReactECharts 
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};
