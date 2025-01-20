<template>
  <div
    :class="`${isCollapsed ? 'w-20' : 'w-64'} min-h-screen transition-all duration-300 bg-white border-r`"
  >
    <!-- Header -->
    <div class="p-4 flex items-center justify-between">
      <div :class="`flex items-center gap-3 ${isCollapsed && 'hidden'}`">
        <img src="@/assets/consist-logo.png" alt="Consist" class="h-8" />
        <span v-if="!isCollapsed" class="text-xl font-semibold">Consist</span>
      </div>
      <button
        type="button"
        @click="handleCollapse"
        class="p-2 hover:bg-gray-100 rounded-md transition-colors z-10"
      >
        <Bars3Icon class="h-6 w-6" />
      </button>
    </div>

    <!-- Main Menu -->
    <div class="px-4 py-2">
      <div :class="`text-xs font-medium text-gray-400 mb-2 ${isCollapsed ? 'hidden' : ''}`">
        MAIN MENU
      </div>
      <nav class="space-y-1">
        <RouterLink
          v-for="item in menuItems"
          :key="item.text"
          :to="item.path"
          :class="`flex items-center ${isCollapsed ? 'justify-center py-3' : 'gap-3 p-3'}  rounded-lg transition-all ${
            route.path === item.path
              ? 'bg-[#287f71] text-white'
              : 'text-gray-500 hover:bg-gray-50'
          }`"
          @click="activePath = item.path"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.text }}</span>
          <span
            v-if="item.notification && !isCollapsed"
            class="w-2 h-2 rounded-full bg-red-500"
          />
        </RouterLink>
      </nav>
    </div>

    <!-- Bottom Menu -->
    <div class="mt-auto">
      <div class="px-4 pt-4 mt-4 border-t border-gray-100">
        <nav class="space-y-1">
          <template v-for="item in bottomMenuItems" :key="item.text">
            <div
              v-if="item.isToggle"
              :class="`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-lg`"
            >
              <div :class="`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} text-gray-500`">
                <component :is="item.icon" class="w-5 h-5" />
                <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.text }}</span>
              </div>
              <Switch
                v-if="!isCollapsed"
                v-model="isDemoMode"
                :class="isDemoMode ? 'bg-emerald-600' : 'bg-gray-200'"
                class="relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none"
              >
                <span
                  :class="isDemoMode ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-3 w-3 transform rounded-full bg-white transition-transform"
                />
              </Switch>
            </div>
            <RouterLink
              v-else
              :to="item.path"
              :class="`flex items-center ${isCollapsed ? 'justify-center py-3' : 'gap-3 p-3'}  rounded-lg text-gray-500 hover:bg-gray-50`"
              @click="activePath = item.path"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.text }}</span>
            </RouterLink>
          </template>
        </nav>
      </div>
      <div v-if="!isCollapsed">
        <UpgradeCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Switch } from '@headlessui/vue'
import {
  ChartBarIcon,
  ChartBarSquareIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ChatBubbleLeftIcon,
  UsersIcon,
  Bars3Icon,
  QuestionMarkCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'
import UpgradeCard from './UpgradeCard.vue'

interface MenuItem {
  text: string
  path: string
  icon: any
  notification?: boolean
  isToggle?: boolean
}

const route = useRoute()
const activePath = ref(route.path)
const isDemoMode = ref(false)
const isCollapsed = ref(false)

const menuItems: MenuItem[] = [
  {
    text: 'Overview',
    path: '/',
    icon: ChartBarIcon,
  },
  {
    text: 'Performance',
    path: '/performance',
    icon: ChartBarSquareIcon,
  },
  {
    text: 'Products',
    path: '/products',
    icon: ShoppingBagIcon,
  },
  {
    text: 'Orders',
    path: '/orders',
    icon: ShoppingCartIcon,
  },
  {
    text: 'Messages',
    path: '/messages',
    icon: ChatBubbleLeftIcon,
    notification: true,
  },
  {
    text: 'Customers',
    path: '/customers',
    icon: UsersIcon,
  },
]

const bottomMenuItems: MenuItem[] = [
  {
    text: 'Demo Mode',
    path: '/demo',
    icon: Cog6ToothIcon,
    isToggle: true,
  },
  {
    text: 'Help Center',
    path: '/help',
    icon: QuestionMarkCircleIcon,
  },
  {
    text: 'Feedback',
    path: '/feedback',
    icon: ChatBubbleOvalLeftEllipsisIcon,
  },
]

const handleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>
