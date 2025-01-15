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
    w: 6,
    h: 4
  },
  salesRegion: {
    component: SalesRegionChart,
    title: 'Sales by Region',
    description: 'Regional sales distribution',
    w: 3,
    h: 4
  },
  ecommercePlatform: {
    component: EcommercePlatformChart,
    title: 'E-commerce Platforms',
    description: 'Sales distribution across platforms',
    w: 3,
    h: 4
  },
  usersGauge: {
    component: UsersGaugeChart,
    title: 'Users Overview',
    description: 'Active and premium users',
    w: 3,
    h: 4
  },
  sessionsByCountry: {
    component: SessionsByCountry,
    title: 'Sessions by Country',
    description: 'Geographic session distribution',
    w: 3,
    h: 4
  }
};

export const WidgetManager: React.FC = () => {
  const [layouts, setLayouts] = useState(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    return savedLayout ? JSON.parse(savedLayout) : { lg: [] };
  });

  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("dashboardWidgets");
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleLayoutChange = useCallback((allLayouts: any) => {
    setLayouts(allLayouts);
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem("dashboardLayout", JSON.stringify(layouts));
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
    setIsEditing(false);
  }, [layouts, widgets]);

  const addWidget = useCallback(
    (widgetType: keyof typeof availableWidgets) => {
      const widget = availableWidgets[widgetType];
      const newWidget = {
        i: `${widgetType}-${Date.now()}`,
        x: (widgets.length * 2) % 12,
        y: Infinity,
        w: widget.w,
        h: widget.h,
        type: widgetType,
      };

      setWidgets((prevWidgets: any) => [...prevWidgets, newWidget]);
      setLayouts((prevLayouts: { lg: any }) => ({
        ...prevLayouts,
        lg: [...(prevLayouts.lg || []), newWidget],
      }));
      setIsDropdownOpen(false);
    },
    [widgets]
  );

  const removeWidget = useCallback((widgetId: string) => {
    setWidgets((prevWidgets: any[]) =>
      prevWidgets.filter((widget) => widget.i !== widgetId)
    );
    setLayouts((prevLayouts: { lg: any }) => ({
      ...prevLayouts,
      lg: (prevLayouts.lg || []).filter((item: { i: string }) => item.i !== widgetId),
    }));
  }, []);

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
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-lg border text-gray-600"
          >
            <FiEdit2 /> {isEditing ? "Exit Edit Mode" : "Customize Widgets"}
          </button>
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-gray-600 rounded-lg hover:bg-green-200"
              >
                <FiSave /> Save Layout
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-gray-600 rounded-lg hover:bg-purple-200"
                >
                  <FiPlus /> Add Widget
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-64 bg-white shadow-lg rounded-lg mt-2 p-2">
                    {Object.entries(availableWidgets).map(([key, widget]) => (
                      <button
                        key={key}
                        onClick={() => addWidget(key as keyof typeof availableWidgets)}
                        className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-gray-800">{widget.title}</div>
                        <div className="text-sm text-gray-500">{widget.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg border">
              <FiFilter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg border">
              <FiShare2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      <OverviewStats  />
      <ResponsiveGridLayout
        className="layout pt-4"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        isDraggable={isEditing}
        isResizable={isEditing}
        onLayoutChange={handleLayoutChange}
      >
        {widgets.map((widget: { type: string; i: React.Key | null | undefined }) => {
          const widgetConfig = availableWidgets[widget.type as keyof typeof availableWidgets];
          const WidgetComponent = widgetConfig.component;
          return (
            <div key={widget.i} className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative">
                {isEditing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWidget(widget.i as string);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-md z-10"
                    title="Remove Widget"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="mb-3">
                  <h3 className="text-lg font-medium text-gray-800">{widgetConfig.title}</h3>
                  <p className="text-sm text-gray-500">{widgetConfig.description}</p>
                </div>
                <div className="pt-2">
                  <WidgetComponent  />
                </div>
              </div>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};
