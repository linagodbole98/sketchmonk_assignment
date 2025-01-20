<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <button class="text-gray-500 hover:bg-gray-100 p-1 rounded">⋮</button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
