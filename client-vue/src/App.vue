<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <Sidebar />

      <!-- Main Content -->
      <div class="flex-1">
        <!-- Header -->
        <div class="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <div class="flex items-center gap-4">
            <div class="relative">
              <input
                type="text"
                placeholder="Search anything here..."
                class="w-[280px] h-9 px-4 bg-gray-50 rounded-lg text-sm focus:outline-none"
              />
              <div class="absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                    stroke="#8D8D8D"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 14L11.3333 11.3333"
                    stroke="#8D8D8D"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <button class="text-gray-400 hover:text-gray-600">
              <ArrowDownTrayIcon class="w-5 h-5" />
            </button>
            <button class="text-gray-400 hover:text-gray-600 relative">
              <div class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <BellIcon class="w-5 h-5" />
            </button>
            <button class="text-gray-400 hover:text-gray-600">
              <CogIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Main Content Area -->
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ArrowDownTrayIcon, BellIcon, CogIcon } from '@heroicons/vue/24/outline'
import Sidebar from './components/layout/Sidebar.vue'
</script>

<style scoped>
@import './assets/main.css';
</style>
