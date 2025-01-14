import ReactECharts from "echarts-for-react";
import { useSalesData } from "../../api/queries";
import { NoData } from "../NoData";
import type { EChartsOption } from 'echarts';

export const SalesRegionChart = () => {
  const { data: salesData, isLoading, error } = useSalesData();

  if (isLoading) return <div>Loading...</div>;
  if (error || !salesData) return <NoData message="Error loading sales data" />;

 

  const option: EChartsOption = {
    title: {
      left: "center",
      textStyle: {
        fontWeight: 500,
        fontSize: 14,
        color: "#000",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => `
        <div style="font-family: sans-serif; padding: 4px;">
          <div style="font-size: 14px;margin-bottom: 8px;">${params.name}</div>
          <div style="font-weight: bold; font-size: 14px;">Sales: ${params.value.toLocaleString()}</div>
        </div>
      `,
    },
    radar: [{
      center: ["50%", "50%"],
      radius: "60%",
      indicator: salesData.regions.map((region: any, index: number) => {
        const maxValue = Math.max(...salesData.values);
        // Round up maxValue to nearest thousand for better tick intervals
        const roundedMax = Math.ceil(maxValue / 1000) * 1000;
        return {
          name: `${region}\n$${salesData.values[index].toLocaleString()}`,
          max: roundedMax,
          min: 0
        };
      }),
      shape: "polygon",
      splitNumber: 5,
      splitArea: {
        show: true,
        areaStyle: {
          color: ["#fff", "#fafafa"]
        }
      },
      axisLine: {
        lineStyle: {
          color: "#E5E7EB"
        }
      },
      splitLine: {
        lineStyle: {
          color: "#E5E7EB"
        }
      },
      axisName: {
        show: true,
        color: "#000",
        fontSize: 12,
        fontWeight: 500,
        rich: {
          value: {
            color: "#6B7280",
            fontSize: 11,
            padding: [4, 0, 0, 0]
          }
        }
      },
      axisLabel: {
        show: false
      }
    }],
    series: [
      {
        type: "radar",
        data: [
          {
            value: salesData.values,
            name: "Sales",
            symbolSize: 6,
            lineStyle: {
              color: "#287F71",
              width: 2,
            },
            areaStyle: {
              color: "rgba(16, 185, 129, 0.2)",
            },
            itemStyle: {
              color: "#287F71",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="h-[300px] flex items-center justify-center font-sans">
      <ReactECharts
        option={option}
        style={{ height: "300px", width: "100%" }}
        opts={{ 
          renderer: "svg",
          width: 'auto',
          height: 'auto'
        }}
        onEvents={{
          mousemove: () => {},
          mousewheel: () => {},
          wheel: () => {}
        }}
      />
    </div>
  );
};
