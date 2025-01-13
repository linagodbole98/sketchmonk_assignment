import ReactECharts from 'echarts-for-react';
import { useSalesData } from '../../api/queries';
import { NoData } from '../NoData';

export const SalesRegionChart = () => {
  const { data: salesData, isLoading, error } = useSalesData();

  if (isLoading) return <div>Loading...</div>;
  if (error || !salesData) return <NoData message="Error loading sales data" />;

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `
          <div class="font-sans p-1">
            <div class="font-semibold">${params.name}</div>
            <div>Sales: ${params.value.toLocaleString()}</div>
          </div>
        `;
      }
    },
    radar: {
      indicator: salesData.regions.map((region: any) => ({ name: region, max: Math.max(...salesData.values) })),
      splitNumber: 4,
      axisName: {
        color: '#666',
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0)', 'rgba(245,245,245,0.2)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: salesData.values,
            name: 'Sales',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              color: '#10b981',
              width: 2
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
            },
            itemStyle: {
              color: '#10b981'
            }
          }
        ]
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
