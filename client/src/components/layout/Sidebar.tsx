import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiMessageSquare, FiShoppingBag, FiShoppingCart, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { RiAdvertisementLine, RiFeedbackLine, RiQuestionLine } from 'react-icons/ri';
import { IoGameControllerOutline } from 'react-icons/io5';
import { Switch } from '@headlessui/react';

interface MenuItem {
  icon: React.ElementType;
  text: string;
  path: string;
  notification?: number;
  isToggle?: boolean;
}

const menuItems: MenuItem[] = [
  { icon: FiBarChart2, text: 'Overview', path: '/' },
  { icon: FiTrendingUp, text: 'Performance', path: '/performance' },
  { icon: RiAdvertisementLine, text: 'Campaigns', path: '/campaigns' },
  { icon: FiShoppingBag, text: 'Orders', path: '/orders' },
  { icon: FiShoppingCart, text: 'Products', path: '/products', notification: 1 },
  { icon: FiMessageSquare, text: 'Message', path: '/message' },
  { icon: FiUsers, text: 'Sales Platform', path: '/sales' },
];

const bottomMenuItems: MenuItem[] = [
  { icon: IoGameControllerOutline, text: 'Demo Mode', path: '/demo', isToggle: true },
  { icon: RiFeedbackLine, text: 'Feedback', path: '/feedback' },
  { icon: RiQuestionLine, text: 'Help and docs', path: '/help' },
];

export const Sidebar = () => {
  const [activePath, setActivePath] = useState('/');
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3">
        <img src="/consit-logo.svg" alt="Consit" className="h-8" />
        <span className="text-xl font-semibold">Consist</span>
      </div>

      {/* Main Menu */}
      <div className="px-4 py-2">
        <div className="text-xs font-medium text-gray-400 mb-2">MAIN MENU</div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.text}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                activePath === item.path
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setActivePath(item.path)}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
              {item.notification && (
                <span className="w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="px-4 pt-4 mt-4 border-t border-gray-100">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => (
            <div
              key={item.text}
              className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                !item.isToggle && 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 text-gray-500">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
              {item.isToggle ? (
                <Switch
                  checked={isDemoMode}
                  onChange={setIsDemoMode}
                  className={`${
                    isDemoMode ? 'bg-emerald-600' : 'bg-gray-200'
                  } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      isDemoMode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              ) : (
                <Link to={item.path} className="w-full h-full absolute inset-0" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
