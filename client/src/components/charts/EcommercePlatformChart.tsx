import ReactECharts from 'echarts-for-react';
import { usePlatformData } from '../../api/queries';
import { NoData } from '../NoData';
import { DonutChartSkeleton } from '../skeletons/ChartSkeletons';

export const EcommercePlatformChart = () => {
  const { data: platformData, isLoading, error } = usePlatformData();

  if (isLoading) return <DonutChartSkeleton />;
  if (error || !platformData) return <NoData message="Error loading platform data" />;
  const colors = ['#287F71', '#6366f1', '#f59e0b', '#ff5722', '#ff9900', '#4ade80', '#3b82f6']; // Add more colors as needed
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'], // Donut chart
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{c}%', // Label with name and percentage
          fontSize: 12,
          fontFamily: 'Arial, sans-serif',
          color: '#000',
        },
        labelLine: {
          show: true,
          length: 15, // Connector line length
          length2: 10,
          lineStyle: {
            color: '#000',
            width: 1,
          },
        },
        data: platformData.map((item, index) => ({
          value: item.percentage,
          name: item.platform,
          itemStyle: {
            color: colors[index % colors.length], // Cycle through colors if more platforms than colors
          },
        })),
      },
      {
        type: 'pie',
        radius: ['70%', '72%'], // Outer circular lining
        center: ['50%', '50%'],
        silent: true, // No interaction
        label: { show: false }, // Hide labels
        labelLine: { show: false },
        data: [{ value: 1, itemStyle: { color: '#E5E7EB' } }], // Light gray outer border
      },
      {
        type: 'pie',
        radius: ['48%', '50%'], // Inner circular lining
        center: ['50%', '50%'],
        silent: true, // No interaction
        label: { show: false }, // Hide labels
        labelLine: { show: false },
        data: [{ value: 1, itemStyle: { color: '#E5E7EB' } }], // Light gray inner border
      },
    ],
  };

  return (
    <div className="h-[300px] flex items-center justify-center font-sans">
      <ReactECharts
        option={option}
        style={{ height: '60%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};
