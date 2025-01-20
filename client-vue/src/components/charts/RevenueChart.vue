<template>
  <v-chart class="chart" :option="chartOption" autoresize />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dashboardData } from '../../constants/dashboardData'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'

// Register ECharts components
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const chartOption = computed(() => {
  const maxValue = Math.max(
    ...dashboardData.revenueOverTime.totalRevenue,
    ...dashboardData.revenueOverTime.totalTarget
  )
  const minValue = Math.min(
    ...dashboardData.revenueOverTime.totalRevenue,
    ...dashboardData.revenueOverTime.totalTarget
  )
  const interval = Math.ceil((maxValue - minValue) / 5 / 1000) * 1000
  const max = Math.ceil(maxValue / interval) * interval
  const min = Math.floor(minValue / interval) * interval

  return {
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
        const date = params[0].name
        const revenue = params[0].value
        const target = params[1]?.value
        return `
          <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">${date}</div>
          <div style="font-size: 12px;">Revenue: $${revenue.toLocaleString()}</div>
          <div style="font-size: 12px;">Target: $${target.toLocaleString()}</div>
        `
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
      data: dashboardData.revenueOverTime.months,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
      },
    },
    yAxis: {
      type: 'value',
      min,
      max,
      interval,
      splitLine: {
        lineStyle: {
          color: '#E5E7EB',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        formatter: (value: number) => `$${value.toLocaleString()}`,
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: dashboardData.revenueOverTime.totalRevenue,
        lineStyle: {
          width: 3,
          color: '#10B981',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(16, 185, 129, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(16, 185, 129, 0)',
              },
            ],
          },
        },
      },
      {
        name: 'Target',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: dashboardData.revenueOverTime.totalTarget,
        lineStyle: {
          width: 2,
          type: 'dashed',
          color: '#6B7280',
        },
      },
    ],
  }
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>
