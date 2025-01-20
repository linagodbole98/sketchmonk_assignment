<template>
  <div class="bg-white rounded-lg p-3 shadow border">
    <h3 class="text-gray-500 text-sm mb-2">{{ title }}</h3>
    <div class="text-2xl font-semibold">{{ formattedValue }}</div>
    <div class="flex justify-start items-end pt-4">
      <div :class="['flex items-center font-bold text-sm border px-1 rounded-md', trendColorClasses]">
        {{ trend === 'up' ? '↑' : '↓' }}
        <span class="ml-1">{{ Math.abs(percentageChange) }}%</span>
      </div>
      <div class="text-sm text-gray-400 mt-1 pl-1">Compared to last month</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number
  percentageChange: number
  trend: 'up' | 'down' | null
  format?: 'number' | 'currency' | 'percentage'
}

const props = withDefaults(defineProps<Props>(), {
  format: 'number'
})

const formattedValue = computed(() => {
  if (props.format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(props.value)
  } else if (props.format === 'percentage') {
    return props.value.toFixed(2) + '%'
  }
  return new Intl.NumberFormat('en-US').format(props.value)
})

const trendColorClasses = computed(() => {
  if (props.trend === 'up') {
    return ['text-green-500', 'bg-green-200', 'border-[#287F71]']
  }
  return ['text-red-500', 'bg-red-200', 'border-red-700']
})
</script>
