import ReactECharts from "echarts-for-react";
import { useRef } from "react";
import { useSalesData } from "../../api/queries";
import { NoData } from "../NoData";
import { usePassiveScroll } from "../../hooks/usePassiveScroll";

export const SalesRegionChart = () => {
  const { data: salesData, isLoading, error } = useSalesData();
  const chartRef = useRef<HTMLDivElement>(null);
  usePassiveScroll(chartRef);

  if (isLoading) return <div>Loading...</div>;
  if (error || !salesData) return <NoData message="Error loading sales data" />;

  const option = {
    title: {
      left: "center",
      textStyle: {
        fontWeight: "semibold",
        fontSize: 14,
        color: "#000", // Font color set to black
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
    radar: {
      center: ["50%", "50%"],
      radius: "60%",
      indicator: salesData.regions.map((region: any, index: number) => ({
        name: region,
        max: Math.max(...salesData.values) + 500,
        value: salesData.values[index],
      })),
      shape: "polygon",
      splitNumber: 4, // Control number of axis ticks
      axisLine: {
        lineStyle: {
          color: "#E5E7EB" // Light gray lines
        }
      },
      splitLine: {
        lineStyle: {
          color: "#E5E7EB"
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["#fff", "#fafafa"]
        }
      },
      axisName: {
        formatter: (name: string, indicator: any) =>
          `{b|${name}}\n{v|${indicator.value.toLocaleString()}}`,
        rich: {
          b: {
            fontWeight: "semibold",
            fontSize: 12,
            color: "#000", // Bold black text for region names
          },
          v: {
            fontWeight: "bold",
            fontSize: 12,
            color: "#000", // Bold black text for values
          },
        },
      },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: salesData.values,
            name: "Sales",
            symbol: "circle",
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
    <div ref={chartRef} className="h-[300px] flex items-center justify-center font-sans">
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};
