import { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { OverviewStats } from './OverviewStats';
import { RevenueChart } from './charts/RevenueChart';
import { SalesRegionChart } from './charts/SalesRegionChart';
import { EcommercePlatformChart } from './charts/EcommercePlatformChart';
import { UsersGaugeChart } from './charts/UsersGaugeChart';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Widget {
  id: string;
  type: string;
  title: string;
}

const defaultWidgets: Widget[] = [
  { id: 'overview', type: 'overview', title: 'Overview Stats' },
  { id: 'revenue', type: 'revenue', title: 'Revenue Over Time' },
  { id: 'sessions', type: 'sessions', title: 'Sessions by Country' },
  { id: 'sales', type: 'sales', title: 'Sales by Region' },
  { id: 'platform', type: 'platform', title: 'Sales by Platform' },
  { id: 'users', type: 'users', title: 'Registered Users' },
];

const defaultLayouts = {
  lg: [
    { i: 'overview', x: 0, y: 0, w: 12, h: 4 },
    { i: 'revenue', x: 0, y: 4, w: 6, h: 8 },
    { i: 'sessions', x: 6, y: 4, w: 6, h: 8 },
    { i: 'sales', x: 0, y: 12, w: 6, h: 8 },
    { i: 'platform', x: 6, y: 12, w: 3, h: 8 },
    { i: 'users', x: 9, y: 12, w: 3, h: 8 },
  ],
};

const widgetComponents: Record<string, React.ComponentType<any>> = {
  overview: OverviewStats,
  revenue: RevenueChart,
  sales: SalesRegionChart,
  platform: EcommercePlatformChart,
  users: UsersGaugeChart,
};

export const WidgetGrid = () => {
  const [layouts, setLayouts] = useState(defaultLayouts);
  const [widgets, setWidgets] = useState(defaultWidgets);
  const [isEditing, setIsEditing] = useState(false);
  const [availableWidgets, setAvailableWidgets] = useState<Widget[]>([]);

  const handleLayoutChange = useCallback(( allLayouts: any) => {
    setLayouts(allLayouts);
    // Save to localStorage or backend
    localStorage.setItem('dashboardLayouts', JSON.stringify(allLayouts));
  }, []);

  const handleAddWidget = useCallback((widget: Widget) => {
    setWidgets((prev) => [...prev, widget]);
    setLayouts((prev) => ({
      ...prev,
      lg: [
        ...prev.lg,
        {
          i: widget.id,
          x: (prev.lg.length * 2) % 12,
          y: Infinity,
          w: 6,
          h: 8,
        },
      ],
    }));
  }, []);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
    setLayouts((prev) => ({
      ...prev,
      lg: prev.lg.filter((item) => item.i !== widgetId),
    }));
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // When entering edit mode, populate available widgets
      const currentWidgetIds = new Set(widgets.map((w) => w.type));
      setAvailableWidgets(
        defaultWidgets.filter((w) => !currentWidgetIds.has(w.type))
      );
    }
  }, [isEditing, widgets]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={toggleEditMode}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          {isEditing ? 'Save Layout' : 'Customize Widgets'}
        </button>
        {isEditing && (
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border rounded-lg"
              onChange={(e) => {
                const widget = availableWidgets.find(
                  (w) => w.id === e.target.value
                );
                if (widget) {
                  handleAddWidget(widget);
                }
              }}
            >
              <option value="">+ Add Widget</option>
              {availableWidgets.map((widget) => (
                <option key={widget.id} value={widget.id}>
                  {widget.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditing}
        isResizable={isEditing}
      >
        {widgets.map((widget) => {
          const WidgetComponent = widgetComponents[widget.type];
          return (
            <div key={widget.id} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{widget.title}</h3>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveWidget(widget.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
              {WidgetComponent && <WidgetComponent />}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};
