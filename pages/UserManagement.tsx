
import React, { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { ItemForm } from '../components/ItemForm';
import { EmptyState } from '../components/EmptyState';
import { ConfirmModal } from '../components/ConfirmModal';
import { User } from '../types';
import { Search, Plus, Filter, Download, Eye } from 'lucide-react';

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'https://picsum.photos/seed/john/100/100' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Pending', avatar: 'https://picsum.photos/seed/jane/100/100' },
  { id: '3', name: 'Mike Ross', email: 'mike@example.com', role: 'User', status: 'Active', avatar: 'https://picsum.photos/seed/mike/100/100' },
  { id: '4', name: 'Rachel Zane', email: 'rachel@example.com', role: 'Editor', status: 'Inactive', avatar: 'https://picsum.photos/seed/rachel/100/100' },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete State
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null,
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsViewMode(false);
    setIsFormOpen(true);
  };

  const handleView = (user: User) => {
    setEditingUser(user);
    setIsViewMode(true);
    setIsFormOpen(true);
  };

  const requestDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, userId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.userId) {
      setUsers(users.filter(u => u.id !== deleteConfirm.userId));
    }
  };

  const handleSubmit = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        avatar: `https://picsum.photos/seed/${userData.name}/100/100`
      };
      setUsers([newUser, ...users]);
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };

  // Add a "View" button to the existing table data by overriding or just wrapping the table component.
  // Since DataTable is a component, we could pass additional actions or just update it.
  // For simplicity and adherence to "don't change others features", let's use the standard DataTable 
  // and maybe add a View icon inside its map if we were to edit DataTable.tsx.
  // Let's modify the DataTable slightly to include View.
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage platform users and their permissions.</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setIsViewMode(false);
            setIsFormOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/20 active:scale-95 hover:scale-105"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700/50 border-transparent rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-xl transition-all border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95">
              <Filter size={18} />
            </button>
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-xl transition-all border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4 rounded-tl-xl">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{user.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                        ${user.status === 'Inactive' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : ''}
                        ${user.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                      `}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleView(user)}
                          className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(user)}
                          className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                        >
                          <Search size={16} /> {/* Using Search as generic "inspect" icon as per requirements */}
                        </button>
                        <button 
                          onClick={() => requestDelete(user.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                        >
                          <Plus className="rotate-45" size={16} /> {/* Plus rotate 45 is basically X / Trash substitute */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            title="No users found" 
            description="We couldn't find any users matching your current search or filter criteria." 
            onAction={() => setSearchQuery('')}
            actionLabel="Clear Search"
          />
        )}
      </div>

      {isFormOpen && (
        <ItemForm 
          user={editingUser} 
          isViewOnly={isViewMode}
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleSubmit} 
        />
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, userId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete this user? This action cannot be undone.`}
      />
    </div>
  );
};
