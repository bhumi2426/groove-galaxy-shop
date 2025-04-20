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
      Composer: {
        Row: {
          address: string | null
          composer_id: number
          composer_name: string
          contact_no: string
        }
        Insert: {
          address?: string | null
          composer_id?: number
          composer_name: string
          contact_no: string
        }
        Update: {
          address?: string | null
          composer_id?: number
          composer_name?: string
          contact_no?: string
        }
        Relationships: []
      }
      Customer: {
        Row: {
          customer_address: string
          customer_id: number
          customer_name: string
          customer_no: string
        }
        Insert: {
          customer_address: string
          customer_id?: number
          customer_name: string
          customer_no: string
        }
        Update: {
          customer_address?: string
          customer_id?: number
          customer_name?: string
          customer_no?: string
        }
        Relationships: []
      }
      Purchase: {
        Row: {
          customer_id: number
          purchase_date: string
          purchase_id: number
          song_id: number
        }
        Insert: {
          customer_id: number
          purchase_date: string
          purchase_id?: number
          song_id: number
        }
        Update: {
          customer_id?: number
          purchase_date?: string
          purchase_id?: number
          song_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Purchase_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "Purchase_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "Song"
            referencedColumns: ["Song_ID"]
          },
        ]
      }
      Singer: {
        Row: {
          Address: string | null
          Contact_No: string
          Singer_id: number
          Singer_Name: string
        }
        Insert: {
          Address?: string | null
          Contact_No: string
          Singer_id?: number
          Singer_Name?: string
        }
        Update: {
          Address?: string | null
          Contact_No?: string
          Singer_id?: number
          Singer_Name?: string
        }
        Relationships: []
      }
      Song: {
        Row: {
          Category: string | null
          Composer_ID: number
          Duration: string
          "Movie/Album Name": string | null
          Price: number
          Singer_ID: number
          Size_MB: number
          Song_ID: number
          Song_Title: string
        }
        Insert: {
          Category?: string | null
          Composer_ID: number
          Duration: string
          "Movie/Album Name"?: string | null
          Price: number
          Singer_ID: number
          Size_MB: number
          Song_ID?: number
          Song_Title: string
        }
        Update: {
          Category?: string | null
          Composer_ID?: number
          Duration?: string
          "Movie/Album Name"?: string | null
          Price?: number
          Singer_ID?: number
          Size_MB?: number
          Song_ID?: number
          Song_Title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Song_Composer_ID_fkey"
            columns: ["Composer_ID"]
            isOneToOne: false
            referencedRelation: "Composer"
            referencedColumns: ["composer_id"]
          },
          {
            foreignKeyName: "Song_Singer_ID_fkey"
            columns: ["Singer_ID"]
            isOneToOne: false
            referencedRelation: "Singer"
            referencedColumns: ["Singer_id"]
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
