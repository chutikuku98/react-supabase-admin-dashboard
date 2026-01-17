import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';  // ⬅️ ADD මේක
import { DataTable } from '../components/DataTable';
import { ItemForm } from '../components/ItemForm';
import { EmptyState } from '../components/EmptyState';
import { ConfirmModal } from '../components/ConfirmModal';
import { User } from '../types';
import { Search, Plus, Filter, Download, AlertCircle } from 'lucide-react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../lib/api/users';

export const UserManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null,
  });

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // ⬇️ UPDATE මේ mutations 3ම
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsFormOpen(false);
      setEditingUser(null);
      toast.success('User created successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<User> }) =>
      updateUser(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsFormOpen(false);
      setEditingUser(null);
      toast.success('User updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });

  // Rest of the code remains same...
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      deleteMutation.mutate(deleteConfirm.userId);
    }
    setDeleteConfirm({ isOpen: false, userId: null });
  };

  const handleSubmit = (userData: any) => {
    if (editingUser) {
      updateMutation.mutate({
        id: editingUser.id,
        updates: {
          email: userData.email,
          full_name: userData.name,
          role: userData.role,
          status: userData.status,
        },
      });
    } else {
      createMutation.mutate({
        email: userData.email,
        full_name: userData.name,
        role: userData.role,
        status: userData.status || 'Active',
        avatar_url: `https://picsum.photos/seed/${userData.name}/100/100`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <p className="text-slate-600 dark:text-slate-400">Error loading users</p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['users'] })}
          className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage platform users and their permissions.
          </p>
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

        {filteredUsers.length > 0 ? (
          <DataTable data={filteredUsers} onEdit={handleEdit} onDelete={requestDelete} />
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
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
};