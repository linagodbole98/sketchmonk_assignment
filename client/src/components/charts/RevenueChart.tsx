import ReactECharts from 'echarts-for-react';
import { useRevenueData } from '../../api/queries';
import { NoData } from '../NoData';

export const RevenueChart = () => {
  const { data: revenueData, isLoading, error } = useRevenueData();

  if (isLoading) return <div>Loading...</div>;
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
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '10%',
      containLabel: true,
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
      },
    },
    yAxis: {
      type: 'value',
      position: 'right',
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
      axisLabel: {
        color: '#6B7280',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        formatter: (value: number) => `$${value / 1000}K`,
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
          color: '#287F71', // Green for Revenue
        },
        itemStyle: {
          color: '#287F71',
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            borderWidth: 3,
            borderColor: '#287F71',
            color: '#fff',
          },
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0)' },
            ],
          },
        },
      },
      {
        name: 'Target',
        type: 'line',
        smooth: true,
        symbol: 'diamond',
        symbolSize: 6,
        data: revenueData.totalTarget,
        lineStyle: {
          width: 2,
          color: '#EB882A', // Purple for Target
        },
        itemStyle: {
          color: '#EB882A',
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            borderWidth: 3,
            borderColor: '#EB882A',
            color: '#fff',
          },
        },
      },
    ],
  };

  return (
    <div className="h-[300px] relative">
      <ReactECharts
        option={option}
        style={{ height: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};
