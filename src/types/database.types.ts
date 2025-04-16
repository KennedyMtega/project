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
      chat_rooms: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user1_id: string
          user2_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user1_id: string
          user2_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user1_id?: string
          user2_id?: string
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          content: string
          sender_id: string
          chat_room_id: string
          read: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          content: string
          sender_id: string
          chat_room_id: string
          read?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          content?: string
          sender_id?: string
          chat_room_id?: string
          read?: boolean
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          avatar_url?: string | null
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
      [_ in never]: never
    }
  }
}