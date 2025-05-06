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
      profiles: {
        Row: {
          id: string
          username: string
          is_teacher: boolean
          xp: number
          created_at: string
        }
        Insert: {
          id: string
          username: string
          is_teacher?: boolean
          xp?: number
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          is_teacher?: boolean
          xp?: number
          created_at?: string
        }
      }
      progress: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          completed: boolean
          xp_earned: number
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          completed?: boolean
          xp_earned?: number
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          completed?: boolean
          xp_earned?: number
          completed_at?: string | null
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          content: string
          topic: string
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          topic: string
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          topic?: string
          created_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "student" | "teacher"
    }
  }
}

export type Tables = Database['public']['Tables']
export type Profile = Tables['profiles']['Row']
export type Resource = Tables['resources']['Row']
export type Progress = Tables['progress']['Row']