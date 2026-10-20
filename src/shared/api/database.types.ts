export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      tea_rooms: {
        Row: {
          id: string
          title: string
          price: number
          duration: string
          max_guests: number
          description: string
          preview_image_url: string
          detail_image_url: string[]
          experience: Json
          created_at?: string
        }
        Insert: {
          id?: string
          title: string
          price: number
          duration: string
          max_guests: number
          description: string
          preview_image_url: string
          detail_image_url: string[]
          experience: Json
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          price?: number
          duration?: string
          max_guests?: number
          description?: string
          preview_image_url?: string
          detail_image_url?: string[]
          experience?: Json
          created_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          room_id: string
          author: string
          date: string
          rating: number
          text: string
          avatar_url: string
          is_approved?: boolean
          created_at?: string
        }
        Insert: {
          id?: string
          room_id: string
          author: string
          date?: string
          rating: number
          text: string
          avatar_url: string
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          author?: string
          date?: string
          rating?: number
          text?: string
          avatar_url?: string
          is_approved?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'tea_rooms'
            referencedColumns: ['id']
          },
        ]
      }
      bookings: {
        Row: {
          id: string
          booking_ref: string
          room_id: string
          booking_date: string
          booking_time: string
          first_name: string
          last_name: string
          email: string
          phone: string
          cardholder_name: string | null
          card_last_four: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          booking_ref: string
          room_id: string
          booking_date: string
          booking_time: string
          first_name: string
          last_name: string
          email: string
          phone: string
          cardholder_name?: string | null
          card_last_four?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          booking_ref?: string
          room_id?: string
          booking_date?: string
          booking_time?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          cardholder_name?: string | null
          card_last_four?: string | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'bookings_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'tea_rooms'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
