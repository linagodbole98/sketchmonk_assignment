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
    { i: 'overview', x: 0, y: 0, w: 12, h: 2 },  // Overview stats row
    { i: 'revenue', x: 0, y: 2, w: 8, h: 4 },    // Revenue chart
    { i: 'sessions', x: 8, y: 2, w: 4, h: 4 },   // Sessions by country
    { i: 'sales', x: 0, y: 6, w: 4, h: 4 },      // Sales by region
    { i: 'platform', x: 4, y: 6, w: 4, h: 4 },   // E-commerce platforms
    { i: 'users', x: 8, y: 6, w: 4, h: 4 },      // Users overview
  ],
  md: [
    { i: 'overview', x: 0, y: 0, w: 12, h: 2 },
    { i: 'revenue', x: 0, y: 2, w: 8, h: 4 },
    { i: 'sessions', x: 8, y: 2, w: 4, h: 4 },
    { i: 'sales', x: 0, y: 6, w: 4, h: 4 },
    { i: 'platform', x: 4, y: 6, w: 4, h: 4 },
    { i: 'users', x: 8, y: 6, w: 4, h: 4 },
  ],
  sm: [
    { i: 'overview', x: 0, y: 0, w: 6, h: 3 },
    { i: 'revenue', x: 0, y: 3, w: 6, h: 4 },
    { i: 'sessions', x: 0, y: 7, w: 6, h: 4 },
    { i: 'sales', x: 0, y: 11, w: 6, h: 4 },
    { i: 'platform', x: 0, y: 15, w: 6, h: 4 },
    { i: 'users', x: 0, y: 19, w: 6, h: 4 },
  ],
  xs: [
    { i: 'overview', x: 0, y: 0, w: 4, h: 4 },
    { i: 'revenue', x: 0, y: 4, w: 4, h: 4 },
    { i: 'sessions', x: 0, y: 8, w: 4, h: 4 },
    { i: 'sales', x: 0, y: 12, w: 4, h: 4 },
    { i: 'platform', x: 0, y: 16, w: 4, h: 4 },
    { i: 'users', x: 0, y: 20, w: 4, h: 4 },
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
  const [layouts, setLayouts] = useState(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    return savedLayout ? JSON.parse(savedLayout) : defaultLayouts;
  });
  
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("dashboardWidgets");
    return savedWidgets ? JSON.parse(savedWidgets) : defaultWidgets;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [availableWidgets, setAvailableWidgets] = useState<Widget[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLayoutChange = useCallback(( allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem("dashboardLayout", JSON.stringify(allLayouts));
  }, []);

  const handleAddWidget = useCallback((widget: Widget) => {
    const newWidgets = [...widgets, widget];
    setWidgets(newWidgets);
    localStorage.setItem("dashboardWidgets", JSON.stringify(newWidgets));
    
    setLayouts((prev: { lg: string | any[]; md: string | any[]; sm: any; xs: any; }) => {
      const newLayouts = {
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
        md: [
          ...prev.md,
          {
            i: widget.id,
            x: (prev.md.length * 2) % 12,
            y: Infinity,
            w: 6,
            h: 8,
          },
        ],
        sm: [
          ...prev.sm,
          {
            i: widget.id,
            x: 0,
            y: Infinity,
            w: 6,
            h: 8,
          },
        ],
        xs: [
          ...prev.xs,
          {
            i: widget.id,
            x: 0,
            y: Infinity,
            w: 4,
            h: 8,
          },
        ],
      };
      localStorage.setItem("dashboardLayout", JSON.stringify(newLayouts));
      return newLayouts;
    });
  }, [widgets]);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    const newWidgets = widgets.filter((w: { id: string; }) => w.id !== widgetId);
    setWidgets(newWidgets);
    localStorage.setItem("dashboardWidgets", JSON.stringify(newWidgets));
    
    setLayouts((prev: { lg: any[]; md: any[]; sm: any[]; xs: any[]; }) => {
      const newLayouts = {
        ...prev,
        lg: prev.lg.filter((item) => item.i !== widgetId),
        md: prev.md.filter((item) => item.i !== widgetId),
        sm: prev.sm.filter((item) => item.i !== widgetId),
        xs: prev.xs.filter((item) => item.i !== widgetId),
      };
      localStorage.setItem("dashboardLayout", JSON.stringify(newLayouts));
      return newLayouts;
    });
  }, [widgets]);

  const toggleEditMode = useCallback(() => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // When entering edit mode, populate available widgets
      const currentWidgetIds = new Set(widgets.map((w: { type: any; }) => w.type));
      setAvailableWidgets(
        defaultWidgets.filter((w) => !currentWidgetIds.has(w.type))
      );
    }
  }, [isEditing, widgets]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleEditMode}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {isEditing ? 'Save Layout' : 'Edit Layout'}
          </button>
          {isEditing && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Widget
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-10">
                  {Object.entries(widgetComponents).map(([key, _]) => (
                    <button
                      key={key}
                      onClick={() => handleAddWidget({ id: `${key}-${Date.now()}`, type: key, title: key })}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
          rowHeight={140}
          margin={[16, 16]}
          containerPadding={[16, 16]}
          onLayoutChange={handleLayoutChange}
          isDraggable={isEditing}
          isResizable={isEditing}
          useCSSTransforms={true}
          compactType="vertical"
          preventCollision={false}
        >
          {widgets.map((widget: any) => {
            const WidgetComponent = widgetComponents[widget.type];
            return (
              <div key={widget.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="h-full p-4">
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveWidget(widget.id)}
                      className="float-right p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                  {WidgetComponent && <WidgetComponent />}
                </div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
