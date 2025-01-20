<template>
  <div class="bg-emerald-800 rounded-lg p-6 m-4 relative overflow-hidden bottom-0">
    <!-- Background curved lines -->
    <div class="absolute top-0 right-0 w-full h-full">
      <svg
        class="absolute top-0 right-0 opacity-20"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C30,50 70,50 100,0 L100,100 L0,100 Z"
          fill="none"
          stroke="white"
          stroke-width="2"
        />
      </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 pt-4">
      <div class="absolute -top-2 -left-2 w-8 h-8 bg-orange-400 rounded-full py-4" />
      <p class="text-white text-xl font-medium my-4">
        Get detailed analytics for help you, upgrade pro
      </p>
      <button class="bg-white text-emerald-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
        Upgrade Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this component
</script>
