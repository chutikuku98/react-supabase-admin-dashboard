
import React, { useState } from 'react';
import { User, Shield, Bell, Palette, Globe, Save, CheckCircle2, Moon, Sun, Monitor, Languages, Clock } from 'lucide-react';

interface SettingsPageProps {
  dashboardTitle: string;
  setDashboardTitle: (title: string) => void;
}

type SubTab = 'Profile' | 'Security' | 'Notifications' | 'Branding' | 'Localization';

export const SettingsPage: React.FC<SettingsPageProps> = ({ dashboardTitle, setDashboardTitle }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('Branding');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const menuItems: { label: SubTab; icon: React.ReactNode }[] = [
    { label: 'Profile', icon: <User size={18} /> },
    { label: 'Security', icon: <Shield size={18} /> },
    { label: 'Notifications', icon: <Bell size={18} /> },
    { label: 'Branding', icon: <Palette size={18} /> },
    { label: 'Localization', icon: <Globe size={18} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 px-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your platform preferences and configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation - Left Side */}
        <nav className="lg:col-span-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSubTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group
                ${activeSubTab === item.label
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 translate-x-1'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:translate-x-1'}
              `}
            >
              <span className={`transition-transform duration-300 ${activeSubTab === item.label ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content - Right Side */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-300">
            {/* Tab Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl">
                {menuItems.find(m => m.label === activeSubTab)?.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{activeSubTab} Configuration</h3>
            </div>

            <div className="p-8">
              {activeSubTab === 'Profile' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="relative group">
                      <img src="https://picsum.photos/seed/user123/200/200" className="w-24 h-24 rounded-3xl object-cover border-4 border-white dark:border-slate-700 shadow-xl" />
                      <button className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center text-xs font-bold uppercase tracking-wider">Change</button>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                          <input type="text" defaultValue="Alex Rivera" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Public Email</label>
                          <input type="email" defaultValue="alex@nexus.io" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bio</label>
                        <textarea rows={3} defaultValue="Frontend engineer passionate about UX and performance." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'Security' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Shield size={16} className="text-primary-600" /> Password Management
                    </h4>
                    <div className="grid gap-4">
                      <input type="password" placeholder="Current Password" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                      <input type="password" placeholder="New Password" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Secure your account with 2FA codes.</p>
                      </div>
                      <button className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold rounded-lg hover:scale-105 transition-all">Enable</button>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'Notifications' && (
                <div className="space-y-4">
                  {[
                    { title: 'Security Alerts', desc: 'Notify me of unusual login attempts', default: true },
                    { title: 'Marketing Updates', desc: 'News about our latest product releases', default: false },
                    { title: 'Team Activity', desc: 'Weekly summary of team performance', default: true },
                    { title: 'System Status', desc: 'Alerts for maintenance and downtime', default: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {activeSubTab === 'Branding' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dashboard Title</label>
                      <input
                        type="text"
                        value={dashboardTitle}
                        onChange={(e) => setDashboardTitle(e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-inner"
                        placeholder="Nexus Admin"
                      />
                      <p className="text-xs text-slate-400">This title appears in the sidebar and browser tab.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Brand Color</label>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-primary-500 shadow-lg shadow-primary-500/20 border-2 border-white dark:border-slate-700"></div>
                          <div className="flex-1 bg-slate-50 dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-600 dark:text-slate-400">
                            #0EA5E9
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logo Scale</label>
                        <div className="flex items-center gap-4 py-4">
                          <input type="range" min="0.5" max="1.5" step="0.1" className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'Localization' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Languages size={14} /> Language
                      </label>
                      <select className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={14} /> Timezone
                      </label>
                      <select className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500">
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT+01:00) Central Europe</option>
                        <option>(GMT+09:00) Japan Standard</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save Footer */}
            <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <div className="flex items-center gap-2 text-emerald-500 animate-in fade-in slide-in-from-left-2 duration-300">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold">Preferences saved!</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-600/30 hover:scale-105 active:scale-95"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
