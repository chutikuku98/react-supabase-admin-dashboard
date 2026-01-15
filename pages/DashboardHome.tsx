
import React from 'react';
import { StatsCard } from '../components/StatsCard';
import { Users, CreditCard, ShoppingBag, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

export const DashboardHome: React.FC = () => {
  const stats = [
    { title: 'Total Revenue', value: '$128,430', change: 12.5, trend: 'up' as const, icon: <CreditCard size={20} />, color: 'bg-indigo-500' },
    { title: 'Active Users', value: '4,231', change: 8.2, trend: 'up' as const, icon: <Users size={20} />, color: 'bg-primary-500' },
    { title: 'Total Orders', value: '1,854', change: -3.4, trend: 'down' as const, icon: <ShoppingBag size={20} />, color: 'bg-amber-500' },
    { title: 'Growth Rate', value: '24.8%', change: 15.1, trend: 'up' as const, icon: <TrendingUp size={20} />, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            <Calendar size={16} />
            Oct 12 - Oct 19
          </button>
          <button className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/20">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Performance</h3>
            <select className="bg-slate-100 dark:bg-slate-700 text-sm px-3 py-1.5 rounded-lg border-none focus:ring-0 dark:text-white">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <button className="text-primary-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="flex-1 space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Users size={18} className="text-slate-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"></div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white">Sarah Jenkins</span> joined the team
                  </p>
                  <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
             Load More Activity <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
