import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { useRevenueData } from '../../api/queries';
import { NoData } from '../NoData';

const months = ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleFont: {
        size: 13,
        family: "'Inter', sans-serif",
        weight: '600',
      },
      bodyFont: {
        size: 12,
        family: "'Inter', sans-serif",
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        title: (items: any) => {
          const item = items[0];
          return months[item.dataIndex];
        },
        label: (item: any) => {
          const value = item.raw;
          return `Revenue: $${value.toLocaleString()}`;
        },
        afterLabel: (item: any) => {
          const targetValue = item.dataset.targetData[item.dataIndex];
          return `Target: $${targetValue.toLocaleString()}`;
        },
      },
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        color: '#6B7280',
      },
    },
    y: {
      position: 'right' as const,
      grid: {
        color: '#F3F4F6',
      },
      border: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        color: '#6B7280',
        callback: (value: any) => {
          return `$${value/1000}K`;
        },
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 5,
    },
  },
};

export const RevenueChart = () => {
  const { data: revenueData, isLoading, error } = useRevenueData();

  if (isLoading) return <div>Loading...</div>;
  if (error || !revenueData) return <NoData message="Error loading revenue data" />;

  const data = {
    labels: revenueData.months,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.totalRevenue,
        borderColor: '#10B981',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          return gradient;
        },
        fill: true,
        borderWidth: 2,
        targetData: revenueData.totalTarget,
      },
      {
        label: 'Target',
        data: revenueData.totalTarget,
        borderColor: '#6366f1',
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <div style={{ height: '300px' }}>
      <Line options={options} data={data} />
    </div>
  );
};
