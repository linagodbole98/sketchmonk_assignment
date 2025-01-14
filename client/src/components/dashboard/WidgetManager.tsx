import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { RevenueChart } from '../charts/RevenueChart';
import { SalesRegionChart } from '../charts/SalesRegionChart';
import { EcommercePlatformChart } from '../charts/EcommercePlatformChart';
import { UsersGaugeChart } from '../charts/UsersGaugeChart';
import { SessionsByCountry } from '../charts/SessionsByCountry';
import { FiPlus, FiEdit2, FiSave, FiTrash2 } from 'react-icons/fi';

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
    const savedLayout = localStorage.getItem('dashboardLayout');
    return savedLayout ? JSON.parse(savedLayout) : { lg: [] };
  });
  
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLayoutChange = useCallback((layout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem('dashboardLayout', JSON.stringify(layouts));
    localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
    setIsEditing(false);
  }, [layouts, widgets]);

  const addWidget = useCallback((widgetType: keyof typeof availableWidgets) => {
    const newWidget = {
      i: `${widgetType}-${Date.now()}`,
      x: (widgets.length * 2) % 12,
      y: Infinity,
      w: 6,
      h: 4,
      type: widgetType,
    };
    
    setWidgets(prevWidgets => [...prevWidgets, newWidget]);
    setLayouts(prevLayouts => ({
      ...prevLayouts,
      lg: [...(prevLayouts.lg || []), newWidget]
    }));
    setIsDropdownOpen(false);
  }, [widgets]);

  const removeWidget = useCallback((widgetId: string) => {
    console.log('Removing widget:', widgetId);
    setWidgets(prevWidgets => {
      const filtered = prevWidgets.filter(widget => widget.i !== widgetId);
      console.log('Updated widgets:', filtered);
      return filtered;
    });
    
    setLayouts(prevLayouts => {
      const updatedLayouts = {
        ...prevLayouts,
        lg: (prevLayouts.lg || []).filter(item => item.i !== widgetId)
      };
      console.log('Updated layouts:', updatedLayouts);
      return updatedLayouts;
    });
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiEdit2 /> {isEditing ? 'Exit Edit Mode' : 'Customize Widgets'}
          </button>
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FiSave /> Save Layout
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <FiPlus /> Add Widget
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-48 bg-white shadow-lg rounded-lg mt-2 p-2">
                    {Object.keys(availableWidgets).map((widgetType) => (
                      <button
                        key={widgetType}
                        onClick={() => addWidget(widgetType as keyof typeof availableWidgets)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                      >
                        {widgetType.replace(/([A-Z])/g, ' $1').trim()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        isDraggable={isEditing}
        isResizable={isEditing}
        onLayoutChange={handleLayoutChange}
      >
        {widgets.map((widget) => {
          const WidgetComponent = availableWidgets[widget.type as keyof typeof availableWidgets];
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
