import React, { useState, useCallback } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { RevenueChart } from "../charts/RevenueChart";
import { SalesRegionChart } from "../charts/SalesRegionChart";
import { EcommercePlatformChart } from "../charts/EcommercePlatformChart";
import { UsersGaugeChart } from "../charts/UsersGaugeChart";
import { SessionsByCountry } from "../charts/SessionsByCountry";
import {
  FiPlus,
  FiEdit2,
  FiSave,
  FiTrash2,
  FiShare2,
  FiFilter,
} from "react-icons/fi";
import { OverviewStats } from "../OverviewStats";

const ResponsiveGridLayout = WidthProvider(Responsive);

const availableWidgets = {
  revenue: RevenueChart,
  salesRegion: SalesRegionChart,
  ecommercePlatform: EcommercePlatformChart,
  usersGauge: UsersGaugeChart,
  sessionsByCountry: SessionsByCountry,
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

  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLayoutChange = useCallback(( allLayouts: any) => {
    setLayouts(allLayouts);
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem("dashboardLayout", JSON.stringify(layouts));
    localStorage.setItem("dashboardWidgets", JSON.stringify(widgets));
    setIsEditing(false);
  }, [layouts, widgets]);

  const addWidget = useCallback(
    (widgetType: keyof typeof availableWidgets) => {
      const newWidget = {
        i: `${widgetType}-${Date.now()}`,
        x: (widgets.length * 2) % 12,
        y: Infinity,
        w: 6,
        h: 4,
        type: widgetType,
      };

      setWidgets((prevWidgets: any) => [...prevWidgets, newWidget]);
      setLayouts((prevLayouts: { lg: any; }) => ({
        ...prevLayouts,
        lg: [...(prevLayouts.lg || []), newWidget],
      }));
      setIsDropdownOpen(false);
    },
    [widgets]
  );

  const removeWidget = useCallback((widgetId: string) => {
    console.log("Removing widget:", widgetId);
    setWidgets((prevWidgets: any[]) => {
      const filtered = prevWidgets.filter((widget: { i: string; }) => widget.i !== widgetId);
      console.log("Updated widgets:", filtered);
      return filtered;
    });

    setLayouts((prevLayouts: { lg: any; }) => {
      const updatedLayouts = {
        ...prevLayouts,
        lg: (prevLayouts.lg || []).filter((item: { i: string; }) => item.i !== widgetId),
      };
      console.log("Updated layouts:", updatedLayouts);
      return updatedLayouts;
    });
  }, []);

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
                  <div className="absolute z-10 w-48 bg-white shadow-lg rounded-lg mt-2 p-2">
                    {Object.keys(availableWidgets).map((widgetType) => (
                      <button
                        key={widgetType}
                        onClick={() =>
                          addWidget(widgetType as keyof typeof availableWidgets)
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                      >
                        {widgetType.replace(/([A-Z])/g, " $1").trim()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg border  ">
              <FiFilter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-100 rounded-lg border">
              <FiShare2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      <OverviewStats />
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
        {widgets.map((widget: { type: string; i: React.Key | null | undefined|any; }) => {
          const WidgetComponent =
            availableWidgets[widget.type as keyof typeof availableWidgets];
          return (
            <div key={widget.i} className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative">
                {isEditing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWidget(widget.i);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-md z-10"
                    title="Remove Widget"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
                <div className="pt-2">
                  <WidgetComponent />
                </div>
              </div>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};
