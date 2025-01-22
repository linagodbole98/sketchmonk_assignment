// Layout storage keys
const LAYOUT_KEY = 'dashboardLayout';
const WIDGETS_KEY = 'dashboardWidgets';

// Clear all stored layout data
export const clearStoredLayouts = () => {
  localStorage.removeItem(LAYOUT_KEY);
  localStorage.removeItem(WIDGETS_KEY);
};

// Save layout data
export const saveLayout = (layouts: any) => {
  localStorage.setItem(LAYOUT_KEY, JSON.stringify(layouts));
};

// Save widget data
export const saveWidgets = (widgets: any) => {
  localStorage.setItem(WIDGETS_KEY, JSON.stringify(widgets));
};

// Load layout data
export const loadLayout = (defaultLayout: any) => {
  try {
    const savedLayout = localStorage.getItem(LAYOUT_KEY);
    return savedLayout ? JSON.parse(savedLayout) : defaultLayout;
  } catch (error) {
    console.error('Error loading layout:', error);
    return defaultLayout;
  }
};

// Load widget data
export const loadWidgets = (defaultWidgets: any) => {
  try {
    const savedWidgets = localStorage.getItem(WIDGETS_KEY);
    return savedWidgets ? JSON.parse(savedWidgets) : defaultWidgets;
  } catch (error) {
    console.error('Error loading widgets:', error);
    return defaultWidgets;
  }
};
