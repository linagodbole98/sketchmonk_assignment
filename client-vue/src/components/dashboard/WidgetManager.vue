<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="flex justify-between items-center px-4 py-3 bg-white border-b">
      <h1 class="text-2xl font-semibold">Overview</h1>
      <div class="flex items-center gap-2">
        <!-- Edit/Save Button -->
        <button
          @click="isEditing ? handleSave() : setEditing(true)"
          class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium"
          :class="isEditing ? 'text-white bg-emerald-600 hover:bg-emerald-700' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'"
        >
          <component :is="isEditing ? 'SaveIcon' : 'EditIcon'" class="w-4 h-4" />
          {{ isEditing ? 'Save Layout' : 'Edit Layout' }}
        </button>
        
        <!-- Add Widget Dropdown -->
        <div class="relative">
          <button
            @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon class="w-4 h-4" />
            Add Widget
          </button>
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-10">
            <button
              v-for="(widget, key) in availableWidgets"
              :key="key"
              @click="addWidget(key)"
              class="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              <div class="font-medium">{{ widget.title }}</div>
              <div class="text-sm text-gray-500">{{ widget.description }}</div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center h-screen">
      <div class="text-red-500 text-lg mb-4">{{ error }}</div>
      <button
        @click="fetchData"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>

    <!-- Dashboard Grid -->
    <div v-else class="p-4">
      <GridLayout
        v-model:layout="layouts"
        :breakpoints="{ lg: 1200, md: 996, sm: 768, xs: 480 }"
        :cols="{ lg: 12, md: 12, sm: 6, xs: 4 }"
        :row-height="140"
        :margin="[16, 16]"
        :container-padding="[16, 16]"
        :is-draggable="isEditing"
        :is-resizable="isEditing"
        :vertical-compact="true"
        :use-css-transforms="true"
        @layout-updated="handleLayoutChange"
      >
        <GridItem
          v-for="widget in widgets"
          :key="widget.i"
          :x="widget.x"
          :y="widget.y"
          :w="widget.w"
          :h="widget.h"
          :i="widget.i"
          :min-w="widget.minW"
          :max-w="widget.maxW"
          :min-h="widget.minH"
          :max-h="widget.maxH"
        >
          <div class="bg-white rounded-lg shadow-sm border overflow-hidden h-full">
            <div class="h-full p-4">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">{{ getWidgetConfig(widget).title }}</h3>
                  <p class="text-xs text-gray-500">{{ getWidgetConfig(widget).description }}</p>
                </div>
                <button
                  v-if="isEditing"
                  type="button"
                  @click="removeWidget(widget.i)"
                  class="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="h-[calc(100%-3rem)]">
                <component :is="getWidgetComponent(widget)" />
              </div>
            </div>
          </div>
        </GridItem>
      </GridLayout>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
import { PlusIcon, SaveIcon, EditIcon, TrashIcon } from '@heroicons/vue/outline';
import { saveLayout, saveWidgets, loadLayout, loadWidgets, clearStoredLayouts } from '@/utils/layoutStorage';
import RevenueChart from '../charts/RevenueChart.vue';
import SalesRegionChart from '../charts/SalesRegionChart.vue';
import EcommercePlatformChart from '../charts/EcommercePlatformChart.vue';
import UsersGaugeChart from '../charts/UsersGaugeChart.vue';
import SessionsByCountry from '../charts/SessionsByCountry.vue';
import { getDashboardData } from '@/utils/api';

const availableWidgets = {
  revenue: {
    component: RevenueChart,
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
    component: SalesRegionChart,
    title: 'Sales by Region',
    description: 'Regional sales distribution',
    w: 4,
    h: 4,
    minW: 3,
    maxW: 6,
    minH: 3,
    maxH: 6
  },
  ecommercePlatform: {
    component: EcommercePlatformChart,
    title: 'E-commerce Platforms',
    description: 'Sales distribution across platforms',
    w: 4,
    h: 4,
    minW: 3,
    maxW: 6,
    minH: 3,
    maxH: 6
  },
  usersGauge: {
    component: UsersGaugeChart,
    title: 'Users Overview',
    description: 'Active and premium users',
    w: 4,
    h: 4,
    minW: 3,
    maxW: 6,
    minH: 3,
    maxH: 6
  },
  sessionsByCountry: {
    component: SessionsByCountry,
    title: 'Sessions by Country',
    description: 'Geographic session distribution',
    w: 4,
    h: 4,
    minW: 3,
    maxW: 6,
    minH: 3,
    maxH: 6
  }
};

const defaultLayout = {
  lg: [
    { i: 'revenue-default', x: 0, y: 2, w: 8, h: 4 },
    { i: 'salesRegion-default', x: 0, y: 6, w: 4, h: 4 },
    { i: 'ecommercePlatform-default', x: 4, y: 6, w: 4, h: 4 },
    { i: 'usersGauge-default', x: 8, y: 6, w: 4, h: 4 },
    { i: 'sessionsByCountry-default', x: 8, y: 2, w: 4, h: 4 },
  ],
  md: [
    { i: 'revenue-default', x: 0, y: 2, w: 8, h: 4 },
    { i: 'salesRegion-default', x: 0, y: 6, w: 4, h: 4 },
    { i: 'ecommercePlatform-default', x: 4, y: 6, w: 4, h: 4 },
    { i: 'usersGauge-default', x: 8, y: 6, w: 4, h: 4 },
    { i: 'sessionsByCountry-default', x: 8, y: 2, w: 4, h: 4 },
  ],
  sm: [
    { i: 'revenue-default', x: 0, y: 0, w: 6, h: 4 },
    { i: 'salesRegion-default', x: 0, y: 4, w: 6, h: 4 },
    { i: 'ecommercePlatform-default', x: 0, y: 8, w: 6, h: 4 },
    { i: 'usersGauge-default', x: 0, y: 12, w: 6, h: 4 },
    { i: 'sessionsByCountry-default', x: 0, y: 16, w: 6, h: 4 },
  ],
  xs: [
    { i: 'revenue-default', x: 0, y: 0, w: 4, h: 4 },
    { i: 'salesRegion-default', x: 0, y: 4, w: 4, h: 4 },
    { i: 'ecommercePlatform-default', x: 0, y: 8, w: 4, h: 4 },
    { i: 'usersGauge-default', x: 0, y: 12, w: 4, h: 4 },
    { i: 'sessionsByCountry-default', x: 0, y: 16, w: 4, h: 4 },
  ]
};

export default defineComponent({
  name: 'WidgetManager',
  components: {
    GridLayout,
    GridItem,
    PlusIcon,
    SaveIcon,
    EditIcon,
    TrashIcon,
    RevenueChart,
    SalesRegionChart,
    EcommercePlatformChart,
    UsersGaugeChart,
    SessionsByCountry
  },
  setup() {
    const layouts = ref(loadLayout(defaultLayout));
    const widgets = ref(loadWidgets(defaultLayout.lg.map(item => ({
      ...item,
      type: item.i.split('-')[0]
    }))));
    const isLoading = ref(true);
    const error = ref<string | null>(null);
    const isDropdownOpen = ref(false);
    const isEditing = ref(false);
    const dashboardData = ref(null);

    // Clear old layout data on first load
    onMounted(() => {
      const hasCleared = localStorage.getItem('layoutCleared');
      if (!hasCleared) {
        clearStoredLayouts();
        localStorage.setItem('layoutCleared', 'true');
      }
      fetchData();
    });

    // Save layouts whenever they change
    watch(layouts, (newLayouts) => {
      if (newLayouts) {
        saveLayout(newLayouts);
      }
    }, { deep: true });

    // Save widgets whenever they change
    watch(widgets, (newWidgets) => {
      if (newWidgets) {
        saveWidgets(newWidgets);
      }
    }, { deep: true });

    const fetchData = async () => {
      try {
        isLoading.value = true;
        dashboardData.value = await getDashboardData();
        error.value = null;
      } catch (err) {
        error.value = err instanceof Error ? err.message : "An error occurred";
      } finally {
        isLoading.value = false;
      }
    };

    const handleLayoutChange = (newLayout: any) => {
      layouts.value = newLayout;
    };

    const setEditing = (value: boolean) => {
      isEditing.value = value;
    };

    const handleSave = () => {
      saveLayout(layouts.value);
      saveWidgets(widgets.value);
      setEditing(false);
    };

    const addWidget = (widgetType: string) => {
      const newId = `${widgetType}-${Date.now()}`;
      const widgetConfig = availableWidgets[widgetType];
      
      const newWidget = {
        i: newId,
        type: widgetType,
        ...widgetConfig
      };

      widgets.value = [...widgets.value, newWidget];

      const newLayouts = { ...layouts.value };
      ['lg', 'md', 'sm', 'xs'].forEach(breakpoint => {
        if (!newLayouts[breakpoint]) newLayouts[breakpoint] = [];
        newLayouts[breakpoint].push({
          i: newId,
          x: 0,
          y: Infinity,
          w: breakpoint === 'lg' ? 8 : breakpoint === 'md' ? 6 : 4,
          h: 4
        });
      });
      layouts.value = newLayouts;
      isDropdownOpen.value = false;
    };

    const removeWidget = (widgetId: string) => {
      widgets.value = widgets.value.filter(widget => widget.i !== widgetId);
      
      const newLayouts = { ...layouts.value };
      ['lg', 'md', 'sm', 'xs'].forEach(breakpoint => {
        if (newLayouts[breakpoint]) {
          newLayouts[breakpoint] = newLayouts[breakpoint].filter(
            (layout: { i: string }) => layout.i !== widgetId
          );
        }
      });
      layouts.value = newLayouts;
    };

    const getWidgetConfig = (widget: any) => {
      const widgetType = widget.type || widget.i.split('-')[0];
      return availableWidgets[widgetType] || {};
    };

    const getWidgetComponent = (widget: any) => {
      const widgetType = widget.type || widget.i.split('-')[0];
      return availableWidgets[widgetType]?.component;
    };

    return {
      layouts,
      widgets,
      isLoading,
      error,
      isDropdownOpen,
      isEditing,
      availableWidgets,
      handleLayoutChange,
      setEditing,
      handleSave,
      addWidget,
      removeWidget,
      getWidgetConfig,
      getWidgetComponent,
      fetchData
    };
  }
});
</script>
