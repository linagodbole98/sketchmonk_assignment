import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Widget, WidgetLayout, DashboardLayout } from '../types/widgets'

const defaultWidgets: Widget[] = [
  {
    id: 'overview-stats',
    name: 'Overview Stats',
    component: 'OverviewStats',
    title: 'Overview Statistics',
    description: 'Shows key metrics like total income, profit, views, and conversion rate',
    defaultLayout: { i: 'overview-stats', x: 0, y: 0, w: 12, h: 2, static: false }
  },
  {
    id: 'revenue-chart',
    name: 'Revenue Chart',
    component: 'RevenueChart',
    title: 'Revenue Over Time',
    description: 'Displays revenue trends over time',
    defaultLayout: { i: 'revenue-chart', x: 0, y: 2, w: 6, h: 4, static: false }
  },
  {
    id: 'sessions-by-country',
    name: 'Sessions by Country',
    component: 'SessionsByCountry',
    title: 'Session by Country',
    description: 'Shows session distribution across countries',
    defaultLayout: { i: 'sessions-by-country', x: 6, y: 2, w: 6, h: 4, static: false }
  },
  {
    id: 'sales-by-region',
    name: 'Sales by Region',
    component: 'SalesRegionChart',
    title: 'Sales by Region',
    description: 'Displays sales distribution across regions',
    defaultLayout: { i: 'sales-by-region', x: 0, y: 6, w: 6, h: 4, static: false }
  },
  {
    id: 'sales-by-platform',
    name: 'Sales by Platform',
    component: 'EcommercePlatformChart',
    title: 'Sales by Platform',
    description: 'Shows sales distribution across e-commerce platforms',
    defaultLayout: { i: 'sales-by-platform', x: 6, y: 6, w: 3, h: 4, static: false }
  },
  {
    id: 'registered-users',
    name: 'Registered Users',
    component: 'UsersGaugeChart',
    title: 'Registered Users',
    description: 'Displays the total number of registered users',
    defaultLayout: { i: 'registered-users', x: 9, y: 6, w: 3, h: 4, static: false }
  }
]

const defaultLayout: DashboardLayout = {
  id: 'default',
  name: 'Default Layout',
  layouts: defaultWidgets.map(w => w.defaultLayout),
  widgets: defaultWidgets.map(w => w.id)
}

export const useWidgetStore = defineStore('widgets', () => {
  const isCustomizing = ref(false)
  const availableWidgets = ref<Widget[]>(defaultWidgets)
  const currentLayout = ref<DashboardLayout>(defaultLayout)
  const savedLayouts = ref<DashboardLayout[]>([defaultLayout])

  // Computed
  const activeWidgets = computed(() => 
    currentLayout.value.widgets.map(id => 
      availableWidgets.value.find(w => w.id === id)
    ).filter((w): w is Widget => w !== undefined)
  )

  const activeLayouts = computed(() => 
    currentLayout.value.layouts.filter(l => 
      currentLayout.value.widgets.includes(l.i)
    )
  )

  // Actions
  function toggleCustomize() {
    isCustomizing.value = !isCustomizing.value
  }

  function updateLayout(newLayouts: WidgetLayout[]) {
    currentLayout.value.layouts = newLayouts
  }

  function addWidget(widgetId: string) {
    const widget = availableWidgets.value.find(w => w.id === widgetId)
    if (!widget || currentLayout.value.widgets.includes(widgetId)) return

    currentLayout.value.widgets.push(widgetId)
    currentLayout.value.layouts.push({
      ...widget.defaultLayout,
      y: Math.max(...currentLayout.value.layouts.map(l => l.y + l.h), 0)
    })
  }

  function removeWidget(widgetId: string) {
    currentLayout.value.widgets = currentLayout.value.widgets.filter(id => id !== widgetId)
    currentLayout.value.layouts = currentLayout.value.layouts.filter(l => l.i !== widgetId)
  }

  function saveCurrentLayout(name: string) {
    const newLayout: DashboardLayout = {
      id: crypto.randomUUID(),
      name,
      layouts: [...currentLayout.value.layouts],
      widgets: [...currentLayout.value.widgets]
    }
    savedLayouts.value.push(newLayout)
    return newLayout.id
  }

  function loadLayout(layoutId: string) {
    const layout = savedLayouts.value.find(l => l.id === layoutId)
    if (layout) {
      currentLayout.value = {
        ...layout,
        layouts: [...layout.layouts],
        widgets: [...layout.widgets]
      }
    }
  }

  return {
    isCustomizing,
    availableWidgets,
    currentLayout,
    savedLayouts,
    activeWidgets,
    activeLayouts,
    toggleCustomize,
    updateLayout,
    addWidget,
    removeWidget,
    saveCurrentLayout,
    loadLayout
  }
})
