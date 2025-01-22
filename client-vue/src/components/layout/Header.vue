<template>
  <div class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
    <!-- Search -->
    <div class="flex-1 max-w-xl">
      <div class="relative">
        <input
          type="text"
          placeholder="Search anything here..."
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">🔍</div>
      </div>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center space-x-4">
      <!-- Voice Search -->
      <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
        🎤
      </button>

      <!-- Notifications -->
      <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 relative">
        🔔
        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <!-- Settings -->
      <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
        ⚙️
      </button>

      <!-- Profile -->
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
          U
        </div>
        <div class="text-orange-500 font-medium">•</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {
    return {};
  }
});
</script>
