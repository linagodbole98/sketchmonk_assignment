import ReactECharts from 'echarts-for-react';
import { usePlatformData } from '../../api/queries';
import { NoData } from '../NoData';

export const EcommercePlatformChart = () => {
  const { data: platformData, isLoading, error } = usePlatformData();

  if (isLoading) return <div>Loading...</div>;
  if (error || !platformData) return <NoData message="Error loading platform data" />;

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `
          <div class="font-sans p-1">
            <div class="font-semibold">${params.name}</div>
            <div>${params.value}%</div>
          </div>
        `;
      }
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      icon: 'circle',
      formatter: (name: string) => {
        const item = platformData.find(p => p.platform === name);
        return `${name}: ${item?.percentage}%`;
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '85%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        data: platformData.map(item => ({
          value: item.percentage,
          name: item.platform,
          itemStyle: {
            color: item.platform === 'Amazon' ? '#10b981' :
              item.platform === 'Shopify' ? '#6366f1' : '#f59e0b'
          }
        }))
      }
    ]
  };

  return (
    <div className="h-[300px]">
      <ReactECharts
        option={option}
        style={{ height: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};
