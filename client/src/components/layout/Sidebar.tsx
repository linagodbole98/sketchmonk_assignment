import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiBarChart2,
  FiMessageSquare,
  FiShoppingBag,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import {
  RiAdvertisementLine,
  RiFeedbackLine,
  RiQuestionLine,
  RiMenu3Line,
} from "react-icons/ri";
import { IoGameControllerOutline } from "react-icons/io5";
import { Switch } from "@headlessui/react";
import ConsistLogo from "../../assets/consist-logo.png";
import UpgradeCard from "./UpgradeCard";

interface MenuItem {
  icon: React.ElementType;
  text: string;
  path: string;
  notification?: number;
  isToggle?: boolean;
}

const menuItems: MenuItem[] = [
  { icon: FiBarChart2, text: "Overview", path: "/" },
  { icon: FiTrendingUp, text: "Performance", path: "/performance" },
  { icon: RiAdvertisementLine, text: "Campaigns", path: "/campaigns" },
  { icon: FiShoppingBag, text: "Orders", path: "/orders" },
  {
    icon: FiShoppingCart,
    text: "Products",
    path: "/products",
    notification: 1,
  },
  { icon: FiMessageSquare, text: "Message", path: "/message" },
  { icon: FiUsers, text: "Sales Platform", path: "/sales" },
];

const bottomMenuItems: MenuItem[] = [
  {
    icon: IoGameControllerOutline,
    text: "Demo Mode",
    path: "/demo",
    isToggle: true,
  },
  { icon: RiFeedbackLine, text: "Feedback", path: "/feedback" },
  { icon: RiQuestionLine, text: "Help and docs", path: "/help" },
];

export const Sidebar = () => {
  const [activePath, setActivePath] = useState("/");
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setActivePath(path);
  }, []);

  const handleCollapse = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Collapsing sidebar");
    setIsCollapsed(prev => !prev);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen transition-all duration-300 bg-white border-r`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className={`flex items-center gap-3 ${isCollapsed && "hidden"}`}>
          <img src={ConsistLogo} alt="Consist" className="h-8" />
          {!isCollapsed && (
            <span className="text-xl font-semibold">Consist</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCollapse}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors z-10"
        >
          <RiMenu3Line className="h-6 w-6" />
        </button>
      </div>

      {/* Main Menu */}
      <div className="px-4 py-2">
        <div className={`text-xs font-medium text-gray-400 mb-2 ${isCollapsed ? "hidden" : ""}`}>
          MAIN MENU
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.text}
              to={item.path}
              className={`flex items-center ${isCollapsed ? "justify-center py-3" : "gap-3 p-3"}  rounded-lg transition-all ${
                activePath === item.path
                  ? "bg-[#287f71] text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setActivePath(item.path)}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.text}</span>
              )}
              {item.notification && !isCollapsed && (
                <span className="w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="mt-auto">
        <div className="px-4 pt-4 mt-4 border-t border-gray-100">
          <nav className="space-y-1">
            {bottomMenuItems.map((item) => (
              item.isToggle ? (
                <div
                  key={item.text}
                  className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} p-3 rounded-lg`}
                >
                  <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} text-gray-500`}>
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.text}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <Switch
                      checked={isDemoMode}
                      onChange={setIsDemoMode}
                      className={`${
                        isDemoMode ? "bg-emerald-600" : "bg-gray-200"
                      } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
                    >
                      <span
                        className={`${
                          isDemoMode ? "translate-x-6" : "translate-x-1"
                        } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  )}
                </div>
              ) : (
                <Link
                  key={item.text}
                  to={item.path}
                  className={`flex items-center ${isCollapsed ? "justify-center py-3" : "gap-3 p-3"}  rounded-lg text-gray-500 hover:bg-gray-50`}
                  onClick={() => setActivePath(item.path)}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.text}</span>
                  )}
                </Link>
              )
            ))}
          </nav>
        </div>
        <div className={isCollapsed ? "hidden" : ""}>
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
};
