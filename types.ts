
// Added React import to resolve React.ReactNode namespace errors
import React from 'react';

export type NavigationItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
};

export type DashboardStats = {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
};