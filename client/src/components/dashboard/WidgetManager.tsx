import React, { useState, useCallback, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { RevenueChart } from "../charts/RevenueChart";
import { SalesRegionChart } from "../charts/SalesRegionChart";
import { EcommercePlatformChart } from "../charts/EcommercePlatformChart";
import { UsersGaugeChart } from "../charts/UsersGaugeChart";
import { SessionsByCountry } from "../charts/SessionsByCountry";
import { FiPlus, FiEdit2, FiSave, FiTrash2, FiShare2, FiFilter } from "react-icons/fi";
import { OverviewStats } from "../OverviewStats";
import { getDashboardData, DashboardData } from "../../utils/api";

const ResponsiveGridLayout = WidthProvider(Responsive);

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
    { i: 'revenue-default', x: 0, y: 0, w: 12, h: 6, minW: 6, maxW: 12, minH: 4, maxH: 8 },
    { i: 'salesRegion-default', x: 0, y: 6, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 },
    { i: 'ecommercePlatform-default', x: 6, y: 6, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 },
    { i: 'usersGauge-default', x: 0, y: 12, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 },
    { i: 'sessionsByCountry-default', x: 6, y: 12, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 }
  ],
  md: [
    { i: 'revenue-default', x: 0, y: 0, w: 12, h: 6, minW: 6, maxW: 12, minH: 4, maxH: 8 },
    { i: 'salesRegion-default', x: 0, y: 6, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 },
    { i: 'ecommercePlatform-default', x: 6, y: 6, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 },
    { i: 'usersGauge-default', x: 0, y: 12, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 },
    { i: 'sessionsByCountry-default', x: 6, y: 12, w: 6, h: 6, minW: 4, maxW: 8, minH: 4, maxH: 8 }
  ],
  sm: [
    { i: 'revenue-default', x: 0, y: 0, w: 6, h: 6, minW: 6, maxW: 6, minH: 4, maxH: 8 },
    { i: 'salesRegion-default', x: 0, y: 6, w: 6, h: 6, minW: 4, maxW: 6, minH: 4, maxH: 8 },
    { i: 'ecommercePlatform-default', x: 0, y: 12, w: 6, h: 6, minW: 4, maxW: 6, minH: 4, maxH: 8 },
    { i: 'usersGauge-default', x: 0, y: 18, w: 6, h: 6, minW: 4, maxW: 6, minH: 4, maxH: 8 },
    { i: 'sessionsByCountry-default', x: 0, y: 24, w: 6, h: 6, minW: 4, maxW: 6, minH: 4, maxH: 8 }
  ],
  xs: [
    { i: 'revenue-default', x: 0, y: 0, w: 4, h: 6, minW: 4, maxW: 4, minH: 4, maxH: 8 },
    { i: 'salesRegion-default', x: 0, y: 6, w: 4, h: 6, minW: 4, maxW: 4, minH: 4, maxH: 8 },
    { i: 'ecommercePlatform-default', x: 0, y: 12, w: 4, h: 6, minW: 4, maxW: 4, minH: 4, maxH: 8 },
    { i: 'usersGauge-default', x: 0, y: 18, w: 4, h: 6, minW: 4, maxW: 4, minH: 4, maxH: 8 },
    { i: 'sessionsByCountry-default', x: 0, y: 24, w: 4, h: 6, minW: 4, maxW: 4, minH: 4, maxH: 8 }
  ]
};

export const WidgetManager: React.FC = () => {
  const [layouts, setLayouts] = useState(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    return savedLayout ? JSON.parse(savedLayout) : defaultLayout;
  });

  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("dashboardWidgets");
    const defaultWidgets = defaultLayout.lg.map(item => ({
      ...item,
      type: item.i.split('-')[0]
    }));
    return savedWidgets ? JSON.parse(savedWidgets) : defaultWidgets;
  });

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleLayoutChange = useCallback((currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem("dashboardLayout", JSON.stringify(allLayouts));
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
  }, [widgets]);

  const handleSave = useCallback(() => {
    localStorage.setItem("dashboardLayout", JSON.stringify(layouts));
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
    setIsEditing(false);
  }, [layouts, widgets]);

  const addWidget = useCallback(
    (widgetType: keyof typeof availableWidgets) => {
      const newId = `${widgetType}-${Date.now()}`;
      
      const newWidget = {
        i: newId,
        x: 0,
        y: Infinity,
        w: 6,
        h: 6,
        minW: 4,
        maxW: 12,
        minH: 4,
        maxH: 8,
        type: widgetType,
      };

      setWidgets((prevWidgets: any) => [...prevWidgets, newWidget]);

      setLayouts((prevLayouts: any) => {
        const newLayouts = { ...prevLayouts };
        ['lg', 'md', 'sm', 'xs'].forEach(breakpoint => {
          if (!newLayouts[breakpoint]) newLayouts[breakpoint] = [];
          newLayouts[breakpoint] = [...newLayouts[breakpoint], {
            ...newWidget,
            w: breakpoint === 'lg' || breakpoint === 'md' ? 6 : 
               breakpoint === 'sm' ? 6 : 4
          }];
        });
        return newLayouts;
      });

      setIsDropdownOpen(false);
    },
    []
  );

  const removeWidget = useCallback((widgetId: string) => {
    const updatedWidgets = widgets.filter((widget: { i: string; }) => widget.i !== widgetId);
    setWidgets(updatedWidgets);

    const updatedLayouts = { ...layouts };
    ['lg', 'md', 'sm', 'xs'].forEach(breakpoint => {
      if (updatedLayouts[breakpoint]) {
        updatedLayouts[breakpoint] = updatedLayouts[breakpoint].filter(
          (          layout: { i: string; }) => layout.i !== widgetId
        );
      }
    });
    setLayouts(updatedLayouts);

    localStorage.setItem('dashboardWidgets', JSON.stringify(updatedWidgets));
    localStorage.setItem('dashboardLayout', JSON.stringify(updatedLayouts));
  }, [widgets, layouts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="mb-4 flex justify-between items-center border-y bg-white py-2 px-4">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
              >
                <FiSave className="w-4 h-4" />
                Save Layout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit Layout
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FiPlus className="w-4 h-4" />
              Add Widget
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-10">
                {Object.entries(availableWidgets).map(([key, widget]) => (
                  <button
                    key={key}
                    onClick={() => addWidget(key as keyof typeof availableWidgets)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="font-medium">{widget.title}</div>
                    <div className="text-sm text-gray-500">{widget.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
          rowHeight={80}
          margin={[16, 16]}
          containerPadding={[16, 0]}
          onLayoutChange={handleLayoutChange}
          isDraggable={isEditing}
          isResizable={isEditing}
          useCSSTransforms={true}
          compactType="vertical"
          preventCollision={false}
        >
          {widgets.map((widget: { type: any; i: React.Key | null | undefined|any; }) => {
            const widgetType = widget.type || widget.i.split('-')[0];
            const WidgetComponent = availableWidgets[widgetType]?.component;
            const widgetConfig = availableWidgets[widgetType];
            
            return (
              <div key={widget.i} className="bg-white rounded-lg shadow-sm border overflow-hidden" style={{ height: '100%' }}>
                <div className="p-4 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{widgetConfig?.title}</h3>
                      <p className="text-xs text-gray-500">{widgetConfig?.description}</p>
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeWidget(widget.i)}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full z-50"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="h-[calc(100%-3rem)]">
                    {WidgetComponent && <WidgetComponent />}
                  </div>
                </div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
