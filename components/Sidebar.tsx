
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Package, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  title: string;
  logoColor: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen, 
  activeTab, 
  setActiveTab,
  title,
  logoColor
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside 
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-50 transition-all duration-300 overflow-hidden flex flex-col
          ${isOpen ? 'w-64 translate-x-0' : 'w-20 lg:translate-x-0 -translate-x-full lg:w-20'}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 mb-6">
          <div className={`w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0`}>
            <LayoutDashboard className="text-white" size={18} />
          </div>
          <span className={`ml-3 font-bold text-slate-800 dark:text-white truncate transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {title}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                ${activeTab === item.id 
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                  : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'}
              `}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className={`ml-3 font-medium truncate transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {item.label}
              </span>
              
              {!isOpen && (
                <div className="absolute left-full ml-6 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 space-y-1">
          <button className="w-full flex items-center px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50 transition-all">
            <HelpCircle size={20} />
            <span className={`ml-3 font-medium truncate ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Help Center</span>
          </button>
          <button className="w-full flex items-center px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all">
            <LogOut size={20} />
            <span className={`ml-3 font-medium truncate ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>Logout</span>
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex absolute top-5 -right-3 w-6 h-6 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full items-center justify-center text-slate-500 hover:text-primary-600 transition-colors shadow-sm"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>
    </>
  );
};
