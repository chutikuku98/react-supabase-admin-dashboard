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
      // ⬇️ ADD මේ products type එක
      products: {
        Row: {
          id: string
          name: string
          category: string
          price: number
          stock: number
          status: 'In Stock' | 'Low Stock' | 'Out of Stock'
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          price: number
          stock?: number
          status?: 'In Stock' | 'Low Stock' | 'Out of Stock'
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          price?: number
          stock?: number
          status?: 'In Stock' | 'Low Stock' | 'Out of Stock'
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}