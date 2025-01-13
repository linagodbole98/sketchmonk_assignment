import ReactECharts from 'echarts-for-react';
import { useRevenueData } from '../../api/queries';
import { NoData } from '../NoData';

const months = ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'];

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
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: revenueData.months,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
      }
    },
    yAxis: {
      type: 'value',
      position: 'right',
      splitLine: {
        lineStyle: {
          color: '#F3F4F6',
          type: 'solid'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        formatter: (value: number) => `$${value/1000}K`
      }
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        symbol: 'none',
        symbolSize: 6,
        data: revenueData.totalRevenue,
        lineStyle: {
          width: 2,
          color: '#10B981'
        },
        itemStyle: {
          color: '#10B981',
          borderWidth: 2
        },
        emphasis: {
          itemStyle: {
            borderWidth: 3,
            borderColor: '#10B981',
            color: '#fff'
          }
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
              color: 'rgba(16, 185, 129, 0.2)'
            }, {
              offset: 1,
              color: 'rgba(16, 185, 129, 0)'
            }]
          }
        }
      },
      {
        name: 'Target',
        type: 'line',
        smooth: true,
        symbol: 'none',
        symbolSize: 6,
        data: revenueData.totalTarget,
        lineStyle: {
          width: 2,
          color: '#6366f1',
          type: 'dashed'
        },
        itemStyle: {
          color: '#6366f1',
          borderWidth: 2
        },
        emphasis: {
          itemStyle: {
            borderWidth: 3,
            borderColor: '#6366f1',
            color: '#fff'
          }
        }
      }
    ]
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
