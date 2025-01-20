<template>
  <GaugeChartSkeleton v-if="isLoading" />
  <NoData v-else-if="error || !userData" message="Error loading user stats" />
  <div v-else class="h-[300px] flex items-center justify-center">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStats } from '../../api/queries'
import NoData from '../NoData.vue'
import GaugeChartSkeleton from '../skeletons/ChartSkeletons.vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'

// Register ECharts components
use([
  CanvasRenderer,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const { data: userData, isLoading, error } = useUserStats()

const chartOption = computed(() => {
  if (!userData.value) return {}

  const activePercentage = (userData.value.active / userData.value.total) * 100
  const inactivePercentage = (userData.value.inactive / userData.value.total) * 100

  return {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 8,
        radius: '90%',
        axisLine: {
          lineStyle: {
            width: 16,
            color: [
              [activePercentage / 100, '#287F71'],
              [1, '#E5E7EB']
            ]
          }
        },
        pointer: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
        title: {
          show: false
        },
        data: [{
          value: activePercentage,
          name: 'Active Users'
        }]
      },
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 16,
            color: [
              [inactivePercentage / 100, '#6366F1'],
              [1, '#E5E7EB']
            ]
          }
        },
        pointer: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
        title: {
          show: false
        },
        data: [{
          value: inactivePercentage,
          name: 'Inactive Users'
        }]
      }
    ]
  }
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
