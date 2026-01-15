export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'Admin' | 'Editor' | 'User'
          status: 'Active' | 'Inactive' | 'Pending'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role: 'Admin' | 'Editor' | 'User'
          status?: 'Active' | 'Inactive' | 'Pending'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'Admin' | 'Editor' | 'User'
          status?: 'Active' | 'Inactive' | 'Pending'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
