<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-base font-medium text-gray-800">{{ title }}</h2>
      <button class="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1 rounded transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
