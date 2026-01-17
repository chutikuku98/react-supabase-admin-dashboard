import { supabase } from '../supabase';
import type { User } from '../../types';

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.message);
  }

  return data || [];
}

// Create new user
export async function createUser(userData: {
  email: string;
  full_name: string;
  role: 'Admin' | 'Editor' | 'User';
  status?: 'Active' | 'Inactive' | 'Pending';
  avatar_url?: string;
}): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw new Error(error.message);
  }

  return data;
}

// Update user
export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw new Error(error.message);
  }

  return data;
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    throw new Error(error.message);
  }
}
