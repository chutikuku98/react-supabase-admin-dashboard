
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DashboardStats } from '../types';

export const StatsCard: React.FC<DashboardStats> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  color 
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-default group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
          
          <div className="flex items-center mt-2 gap-1.5">
            <div className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(change)}%</span>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">from last month</span>
          </div>
        </div>
        
        <div className={`p-3 rounded-xl ${color} text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
