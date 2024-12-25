export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affirmations: {
        Row: {
          content: string
          created_at: string | null
          id: number
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
        }
        Relationships: []
      }
      checkin_entries: {
        Row: {
          affirmation_content: string | null
          id: number
          intensity_level: number | null
          mood_description: string | null
          mood_score: number | null
          temptation_type: Database["public"]["Enums"]["temptation_type"] | null
        }
        Insert: {
          affirmation_content?: string | null
          id: number
          intensity_level?: number | null
          mood_description?: string | null
          mood_score?: number | null
          temptation_type?:
            | Database["public"]["Enums"]["temptation_type"]
            | null
        }
        Update: {
          affirmation_content?: string | null
          id?: number
          intensity_level?: number | null
          mood_description?: string | null
          mood_score?: number | null
          temptation_type?:
            | Database["public"]["Enums"]["temptation_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "checkin_entries_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_verses: {
        Row: {
          category: Database["public"]["Enums"]["verse_category"]
          content_csb: string
          created_at: string | null
          id: number
          reference: string
        }
        Insert: {
          category: Database["public"]["Enums"]["verse_category"]
          content_csb: string
          created_at?: string | null
          id?: number
          reference: string
        }
        Update: {
          category?: Database["public"]["Enums"]["verse_category"]
          content_csb?: string
          created_at?: string | null
          id?: number
          reference?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          created_at: string | null
          entry_type: Database["public"]["Enums"]["entry_type"]
          id: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          entry_type: Database["public"]["Enums"]["entry_type"]
          id?: never
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          entry_type?: Database["public"]["Enums"]["entry_type"]
          id?: never
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          check_in_time: string | null
          created_at: string | null
          email_enabled: boolean | null
          push_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          check_in_time?: string | null
          created_at?: string | null
          email_enabled?: boolean | null
          push_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          check_in_time?: string | null
          created_at?: string | null
          email_enabled?: boolean | null
          push_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string | null
          first_name: string | null
          id: string
          last_seen_at: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_seen_at?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_seen_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      temptation_entries: {
        Row: {
          created_at: string | null
          id: number
          intensity_level: number
          resistance_strategy: string | null
          resisted: boolean
          temptation_details: string | null
          temptation_type: Database["public"]["Enums"]["temptation_type"]
          trigger: string | null
        }
        Insert: {
          created_at?: string | null
          id: number
          intensity_level: number
          resistance_strategy?: string | null
          resisted?: boolean
          temptation_details?: string | null
          temptation_type: Database["public"]["Enums"]["temptation_type"]
          trigger?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          intensity_level?: number
          resistance_strategy?: string | null
          resisted?: boolean
          temptation_details?: string | null
          temptation_type?: Database["public"]["Enums"]["temptation_type"]
          trigger?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "temptation_entries_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      temptation_settings: {
        Row: {
          created_at: string | null
          default_intensity: number | null
          default_type: Database["public"]["Enums"]["temptation_type"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          default_intensity?: number | null
          default_type?: Database["public"]["Enums"]["temptation_type"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          default_intensity?: number | null
          default_type?: Database["public"]["Enums"]["temptation_type"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "temptation_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_affirmations: {
        Row: {
          content: string
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_affirmations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          created_at: string | null
          current_streak: number
          last_check_in: string | null
          longest_streak: number
          total_checkins: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number
          last_check_in?: string | null
          longest_streak?: number
          total_checkins?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number
          last_check_in?: string | null
          longest_streak?: number
          total_checkins?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      affirmation_type: "predefined" | "custom"
      entry_type: "check-in" | "temptation"
      temptation_type:
        | "pride"
        | "greed"
        | "lust"
        | "envy"
        | "gluttony"
        | "wrath"
        | "sloth"
      verse_category:
        | "lust"
        | "gluttony"
        | "greed"
        | "sloth"
        | "wrath"
        | "envy"
        | "pride"
        | "general"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
