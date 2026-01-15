
import React from 'react';
import { Search, Bell, Moon, Sun, Menu, X, Command } from 'lucide-react';

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  toggleDarkMode, 
  isDarkMode, 
  toggleSidebar,
  isSidebarOpen
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search dashboard..."
            className="block w-full pl-10 pr-12 py-2 bg-slate-100 dark:bg-slate-700/50 border-transparent rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 text-[10px] font-medium text-slate-500">
                <Command size={10} /> K
             </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-xl transition-all duration-200"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-xl transition-all duration-200">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          </button>
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
            <img 
              src="https://picsum.photos/seed/user123/100/100" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-slate-800 dark:text-white leading-none">Alex Rivera</p>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1">Super Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
};
