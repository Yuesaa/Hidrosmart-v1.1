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
      contact: {
        Row: {
          email: string | null
          id: number
          id_pengguna: number | null
          name: string
          pesan: string | null
          phone: string | null
          subjek: string | null
          user_id: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          id_pengguna?: number | null
          name: string
          pesan?: string | null
          phone?: string | null
          subjek?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          id_pengguna?: number | null
          name?: string
          pesan?: string | null
          phone?: string | null
          subjek?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_id_pengguna_fkey"
            columns: ["id_pengguna"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      guarantee: {
        Row: {
          domisili: string | null
          email: string | null
          id: number
          id_pengguna: number | null
          kode_garansi: string | null
          name: string | null
          phone: string
          tanggal_claim: string | null
          user_id: string | null
        }
        Insert: {
          domisili?: string | null
          email?: string | null
          id?: number
          id_pengguna?: number | null
          kode_garansi?: string | null
          name?: string | null
          phone: string
          tanggal_claim?: string | null
          user_id?: string | null
        }
        Update: {
          domisili?: string | null
          email?: string | null
          id?: number
          id_pengguna?: number | null
          kode_garansi?: string | null
          name?: string | null
          phone?: string
          tanggal_claim?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guarantee_id_pengguna_fkey"
            columns: ["id_pengguna"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          alamat: string | null
          bukti_transfer: string | null
          color: string | null
          email: string | null
          id: number
          id_pengguna: number | null
          kuantitas: number | null
          metode_pembayaran: string | null
          name: string | null
          ongkir: string | null
          phone: string
          status: string | null
          subtotal_harga: number | null
          tanggal_transaksi: string | null
          total_harga: number | null
          user_id: string | null
        }
        Insert: {
          alamat?: string | null
          bukti_transfer?: string | null
          color?: string | null
          email?: string | null
          id?: number
          id_pengguna?: number | null
          kuantitas?: number | null
          metode_pembayaran?: string | null
          name?: string | null
          ongkir?: string | null
          phone: string
          status?: string | null
          subtotal_harga?: number | null
          tanggal_transaksi?: string | null
          total_harga?: number | null
          user_id?: string | null
        }
        Update: {
          alamat?: string | null
          bukti_transfer?: string | null
          color?: string | null
          email?: string | null
          id?: number
          id_pengguna?: number | null
          kuantitas?: number | null
          metode_pembayaran?: string | null
          name?: string | null
          ongkir?: string | null
          phone?: string
          status?: string | null
          subtotal_harga?: number | null
          tanggal_transaksi?: string | null
          total_harga?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_id_pengguna_fkey"
            columns: ["id_pengguna"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ulasan: {
        Row: {
          id: number
          id_order: number | null
          id_pengguna: number
          isi_ulasan: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          id_order?: number | null
          id_pengguna: number
          isi_ulasan?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          id_order?: number | null
          id_pengguna?: number
          isi_ulasan?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ulasan_id_order_fkey"
            columns: ["id_order"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ulasan_id_pengguna_fkey"
            columns: ["id_pengguna"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          email: string | null
          id: number
          name: string
          password: string | null
          status: string | null
        }
        Insert: {
          email?: string | null
          id?: number
          name: string
          password?: string | null
          status?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          name?: string
          password?: string | null
          status?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "user" | "admin"
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
    Enums: {
      user_role: ["user", "admin"],
    },
  },
} as const
