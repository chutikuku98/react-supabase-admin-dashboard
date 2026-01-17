import React, { useState } from 'react';
import { User } from '../types';
import { X } from 'lucide-react';

interface ItemFormProps {
  user?: User | null;
  onClose: () => void;
  onSubmit: (userData: any) => void;
  isViewOnly?: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({ user, onClose, onSubmit, isViewOnly = false }) => {
  const [formData, setFormData] = useState({
    name: user?.full_name || '',  // ⬅️ මෙතන change එක
    email: user?.email || '',
    role: user?.role || 'User',
    status: user?.status || 'Active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewOnly) return;
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden slide-in-from-bottom-4 animate-in duration-300">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isViewOnly ? 'User Details' : user ? 'Edit User' : 'Add New User'}
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              required
              disabled={isViewOnly}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary-500 transition-all dark:text-white outline-none disabled:opacity-70"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              required
              disabled={isViewOnly}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-primary-500 transition-all dark:text-white outline-none disabled:opacity-70"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Role</label>
              <select
                disabled={isViewOnly}
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary-500 transition-all dark:text-white outline-none disabled:opacity-70"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</label>
              <select
                disabled={isViewOnly}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary-500 transition-all dark:text-white outline-none disabled:opacity-70"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              {isViewOnly ? 'Close' : 'Cancel'}
            </button>
            {!isViewOnly && (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-lg shadow-primary-600/20 transition-all active:scale-95"
              >
                {user ? 'Save Changes' : 'Create User'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};