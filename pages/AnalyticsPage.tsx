
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const revenueData = [
  { name: 'Mon', revenue: 4000, users: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398 },
  { name: 'Wed', revenue: 2000, users: 9800 },
  { name: 'Thu', revenue: 2780, users: 3908 },
  { name: 'Fri', revenue: 1890, users: 4800 },
  { name: 'Sat', revenue: 2390, users: 3800 },
  { name: 'Sun', revenue: 3490, users: 4300 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Home', value: 300 },
  { name: 'Books', value: 200 },
];

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899'];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time data insights and platform performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white dark:bg-slate-800 text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Sales', value: '$84,234', change: '+12%', trend: 'up', icon: <DollarSign size={20}/>, color: 'text-emerald-600', bg: 'bg-emerald-100' },
           { label: 'Conversion', value: '3.42%', change: '+0.5%', trend: 'up', icon: <TrendingUp size={20}/>, color: 'text-primary-600', bg: 'bg-primary-100' },
           { label: 'New Customers', value: '1,204', change: '-2%', trend: 'down', icon: <Users size={20}/>, color: 'text-indigo-600', bg: 'bg-indigo-100' },
           { label: 'Avg Order', value: '$72.50', change: '+5%', trend: 'up', icon: <ShoppingCart size={20}/>, color: 'text-amber-600', bg: 'bg-amber-100' },
         ].map((item, i) => (
           <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
             <div className="flex items-center justify-between mb-4">
               <div className={`p-2.5 rounded-xl ${item.bg} dark:bg-opacity-10 ${item.color}`}>
                 {item.icon}
               </div>
               <span className={`text-xs font-bold flex items-center gap-1 ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                 {item.change} {item.trend === 'up' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
               </span>
             </div>
             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{item.value}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Revenue vs Users</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={3} />
                <Area type="monotone" dataKey="users" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Engagement</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Sales by Category</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="hidden md:flex flex-col gap-2 ml-4">
               {categoryData.map((item, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                   <span className="text-xs text-slate-600 dark:text-slate-400">{item.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Customer Growth */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Customer Acquisition</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Line type="stepAfter" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
