<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex flex-col">
      <span class="text-sm text-gray-600">{{ title }}</span>
      <div class="flex items-end gap-2 mt-1">
        <span class="text-2xl font-semibold">{{ value }}</span>
        <span 
          v-if="percentageChange !== undefined"
          class="text-sm mb-1"
          :class="percentageChange >= 0 ? 'text-green-500' : 'text-red-500'"
        >
          {{ percentageChange >= 0 ? '+' : '' }}{{ percentageChange }}%
        </span>
      </div>
      <span v-if="subtitle" class="text-xs text-gray-500 mt-1">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  percentageChange?: number
  subtitle?: string
}

defineProps<Props>()
</script>