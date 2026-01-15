import React from 'react';
import type { Database } from './supabase-types';

export type NavigationItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

// Use database types
export type User = Database['public']['Tables']['users']['Row'];

export type DashboardStats = {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
};
