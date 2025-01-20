<template>
  <v-chart class="chart" :option="chartOption" autoresize />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dashboardData } from '../../constants/dashboardData'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  RadarComponent
} from 'echarts/components'
import type { EChartsOption } from 'echarts'

// Register ECharts components
use([
  CanvasRenderer,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  RadarComponent
])

const chartOption = computed<EChartsOption>(() => ({
  title: {
    left: 'center',
    textStyle: {
      fontWeight: 500,
      fontSize: 14,
      color: '#000',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => `
      <div style="font-family: sans-serif; padding: 4px;">
        <div style="font-size: 14px;margin-bottom: 8px;">${params.name}</div>
        <div style="font-weight: bold; font-size: 14px;">Sales: ${params.value.toLocaleString()}</div>
      </div>
    `,
  },
  radar: [{
    center: ['50%', '50%'],
    radius: '60%',
    indicator: dashboardData.salesByRegion.regions.map((region: string, index: number) => {
      const maxValue = Math.max(...dashboardData.salesByRegion.values)
      // Round up maxValue to nearest thousand for better tick intervals
      const roundedMax = Math.ceil(maxValue / 1000) * 1000
      return {
        name: `${region}\n$${dashboardData.salesByRegion.values[index].toLocaleString()}`,
        max: roundedMax,
        min: 0
      }
    }),
    shape: 'polygon',
    splitNumber: 5,
    splitArea: {
      show: true,
      areaStyle: {
        color: ['#fff', '#fafafa']
      }
    },
    axisLine: {
      lineStyle: {
        color: '#E5E7EB'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#E5E7EB'
      }
    },
    axisName: {
      show: true,
      color: '#000',
      fontSize: 12,
      fontWeight: 500,
      rich: {
        value: {
          color: '#6B7280',
          fontSize: 11,
          padding: [4, 0, 0, 0]
        }
      }
    }
  }],
  series: [{
    type: 'radar',
    data: [{
      value: dashboardData.salesByRegion.values,
      name: 'Sales by Region',
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: '#287F71'
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
            color: 'rgba(40, 127, 113, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(40, 127, 113, 0)'
          }]
        }
      },
      itemStyle: {
        color: '#287F71'
      }
    }]
  }]
}))
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
