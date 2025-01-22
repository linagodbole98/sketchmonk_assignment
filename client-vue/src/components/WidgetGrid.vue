<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex justify-between items-center px-6 py-4 bg-white border-b">
      <h1 class="text-2xl font-semibold">Overview</h1>
      <div class="flex items-center gap-2">
        <button
          @click="toggleEditMode"
          class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {{ isEditing ? 'Save Layout' : 'Edit Layout' }}
        </button>
        <div v-if="isEditing" class="relative">
          <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Widget
          </button>
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-10">
            <button
              v-for="(widget, key) in availableWidgets"
              :key="key"
              @click="handleAddWidget({ id: `${key}-${Date.now()}`, type: key, title: widget.title })"
              class="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {{ widget.title }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6">
      <GridLayout
        v-model:layout="layouts"
        :breakpoints="{ lg: 1200, md: 996, sm: 768, xs: 480 }"
        :cols="{ lg: 12, md: 12, sm: 6, xs: 4 }"
        :row-height="140"
        :margin="[24, 24]"
        :container-padding="[24, 24]"
        :is-draggable="isEditing"
        :is-resizable="isEditing"
        :vertical-compact="true"
        :use-css-transforms="true"
        @layout-updated="handleLayoutChange"
      >
        <GridItem
          v-for="widget in widgets"
          :key="widget.id"
          :x="widget.x"
          :y="widget.y"
          :w="widget.w"
          :h="widget.h"
          :i="widget.id"
          :minW="availableWidgets[widget.type].minW"
          :maxW="availableWidgets[widget.type].maxW"
          :minH="availableWidgets[widget.type].minH"
          :maxH="availableWidgets[widget.type].maxH"
        >
          <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div class="h-full p-4">
              <template v-if="isEditing">
                <button
                  @click="handleRemoveWidget(widget.id)"
                  class="float-right p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </template>
              <component :is="widgetComponents[widget.type]" v-if="widgetComponents[widget.type]" />
            </div>
          </div>
        </GridItem>
      </GridLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
import OverviewStats from './OverviewStats.vue';
import RevenueChart from './charts/RevenueChart.vue';
import SalesRegionChart from './charts/SalesRegionChart.vue';
import EcommercePlatformChart from './charts/EcommercePlatformChart.vue';
import UsersGaugeChart from './charts/UsersGaugeChart.vue';

interface Widget {
  id: string;
  type: string;
  title: string;
}

const widgetComponents = {
  overview: OverviewStats,
  revenue: RevenueChart,
  salesRegion: SalesRegionChart,
  ecommerce: EcommercePlatformChart,
  users: UsersGaugeChart
};

const availableWidgets: Record<string, any> = {
  overview: {
    component: 'overview',
    title: 'Overview Stats',
    description: 'Key performance metrics',
    w: 12,
    h: 2,
    minW: 12,
    maxW: 12,
    minH: 2,
    maxH: 3
  },
  revenue: {
    component: 'revenue',
    title: 'Revenue Over Time',
    description: 'Track revenue trends and targets',
    w: 8,
    h: 4,
    minW: 6,
    maxW: 12,
    minH: 3,
    maxH: 6
  },
  salesRegion: {
    component: 'salesRegion',
    title: 'Sales by Region',
    description: 'Regional sales distribution',
    w: 4,
    h: 4,
    minW: 3,
    maxW: 6,
    minH: 3,
    maxH: 6
  },
  ecommerce: {
    component: 'ecommerce',
    title: 'E-commerce Platforms',
    description: 'Sales distribution across platforms',
    w: 4,
    h: 4,
    minW: 3,
    maxW: 6,
    minH: 3,
    maxH: 6
  },
  users: {
    component: 'users',
    title: 'Users Overview',
    description: 'Active and premium users',
    w: 4,
    h: 4,
    minW: 3,
    maxW: 6,
    minH: 3,
    maxH: 6
  }
};

const defaultLayout = [
  { i: 'overview-default', x: 0, y: 0, w: 12, h: 2, type: 'overview' },
  { i: 'revenue-default', x: 0, y: 2, w: 8, h: 4, type: 'revenue' },
  { i: 'salesRegion-default', x: 8, y: 2, w: 4, h: 4, type: 'salesRegion' },
  { i: 'ecommerce-default', x: 0, y: 6, w: 4, h: 4, type: 'ecommerce' },
  { i: 'users-default', x: 4, y: 6, w: 4, h: 4, type: 'users' }
];

const layouts = ref(loadLayout() || defaultLayout);
const widgets = ref(loadWidgets() || defaultLayout.map(item => ({
  id: item.i,
  type: item.type,
  title: availableWidgets[item.type].title
})));

const isEditing = ref(false);
const isDropdownOpen = ref(false);

// Storage utilities
function loadLayout() {
  const savedLayout = localStorage.getItem('dashboard-layout');
  return savedLayout ? JSON.parse(savedLayout) : null;
}

function saveLayout(layout: any) {
  localStorage.setItem('dashboard-layout', JSON.stringify(layout));
}

function loadWidgets() {
  const savedWidgets = localStorage.getItem('dashboard-widgets');
  return savedWidgets ? JSON.parse(savedWidgets) : null;
}

function saveWidgets(widgets: any) {
  localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
}

// Event handlers
function handleLayoutChange(newLayout: any) {
  layouts.value = newLayout;
  saveLayout(newLayout);
}

function handleAddWidget(widget: Widget) {
  const widgetConfig = availableWidgets[widget.type];
  const newWidget = {
    id: widget.id,
    type: widget.type,
    title: widgetConfig.title
  };
  
  widgets.value = [...widgets.value, newWidget];
  saveWidgets(widgets.value);
  
  const newLayoutItem = {
    i: widget.id,
    x: 0,
    y: Infinity,
    w: widgetConfig.w,
    h: widgetConfig.h,
    minW: widgetConfig.minW,
    maxW: widgetConfig.maxW,
    minH: widgetConfig.minH,
    maxH: widgetConfig.maxH
  };
  
  layouts.value = [...layouts.value, newLayoutItem];
  saveLayout(layouts.value);
  isDropdownOpen.value = false;
}

function handleRemoveWidget(widgetId: string) {
  widgets.value = widgets.value.filter(w => w.id !== widgetId);
  layouts.value = layouts.value.filter(l => l.i !== widgetId);
  saveWidgets(widgets.value);
  saveLayout(layouts.value);
}

function toggleEditMode() {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    saveLayout(layouts.value);
    saveWidgets(widgets.value);
    isDropdownOpen.value = false;
  }
}

// Clear old layout data on first load
onMounted(() => {
  const hasCleared = localStorage.getItem('layoutCleared');
  if (!hasCleared) {
    localStorage.clear();
    localStorage.setItem('layoutCleared', 'true');
    layouts.value = defaultLayout;
    widgets.value = defaultLayout.map(item => ({
      id: item.i,
      type: item.type,
      title: availableWidgets[item.type].title
    }));
    saveLayout(layouts.value);
    saveWidgets(widgets.value);
  }
});

// Watch for changes
watch(layouts, () => {
  saveLayout(layouts.value);
}, { deep: true });

watch(widgets, () => {
  saveWidgets(widgets.value);
}, { deep: true });
</script>

<style>
.vue-grid-item.vue-grid-placeholder {
  background: #287F71 !important;
  opacity: 0.2;
  border-radius: 0.5rem;
}

.vue-grid-item {
  transition: all 200ms ease;
  transition-property: left, top, right;
}

.vue-grid-item.vue-grid-placeholder {
  transition: all 100ms ease;
  transition-property: left, top, right;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
