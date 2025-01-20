<template>
  <DonutChartSkeleton v-if="isLoading" />
  <NoData v-else-if="error || !platformData" message="Error loading platform data" />
  <div v-else class="h-[300px] flex items-center justify-center font-sans">
    <v-chart class="chart" :option="chartOption" :opts="{ renderer: 'svg' }" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlatformData } from '../../api/queries'
import NoData from '../NoData.vue'
import DonutChartSkeleton from '../skeletons/ChartSkeletons.vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'

// Register ECharts components
use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const { data: platformData, isLoading, error } = usePlatformData()

const colors = ['#287F71', '#6366f1', '#f59e0b', '#ff5722', '#ff9900', '#4ade80', '#3b82f6'] // Add more colors as needed

const chartOption = computed(() => {
  if (!platformData.value) return {}

  return {
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
        data: platformData.value.map((item: any, index: number) => ({
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
  }
})
</script>

<style scoped>
.chart {
  height: 60%;
  width: 100%;
}
</style>
