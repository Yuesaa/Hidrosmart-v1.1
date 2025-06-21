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
        }
        Insert: {
          email?: string | null
          id?: number
          id_pengguna?: number | null
          name: string
          pesan?: string | null
          phone?: string | null
          subjek?: string | null
        }
        Update: {
          email?: string | null
          id?: number
          id_pengguna?: number | null
          name?: string
          pesan?: string | null
          phone?: string | null
          subjek?: string | null
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
          id: number
          id_pengguna: number | null
          kode_garansi: string | null
          phone: string
          tanggal_claim: string | null
        }
        Insert: {
          domisili?: string | null
          id?: number
          id_pengguna?: number | null
          kode_garansi?: string | null
          phone: string
          tanggal_claim?: string | null
        }
        Update: {
          domisili?: string | null
          id?: number
          id_pengguna?: number | null
          kode_garansi?: string | null
          phone?: string
          tanggal_claim?: string | null
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
          id: number
          id_pengguna: number | null
          kuantitas: number | null
          metode_pembayaran: string | null
          ongkir: string | null
          phone: string
          status: string | null
          subtotal_harga: number | null
          tanggal_transaksi: string | null
          total_harga: number | null
        }
        Insert: {
          alamat?: string | null
          bukti_transfer?: string | null
          color?: string | null
          id?: number
          id_pengguna?: number | null
          kuantitas?: number | null
          metode_pembayaran?: string | null
          ongkir?: string | null
          phone: string
          status?: string | null
          subtotal_harga?: number | null
          tanggal_transaksi?: string | null
          total_harga?: number | null
        }
        Update: {
          alamat?: string | null
          bukti_transfer?: string | null
          color?: string | null
          id?: number
          id_pengguna?: number | null
          kuantitas?: number | null
          metode_pembayaran?: string | null
          ongkir?: string | null
          phone?: string
          status?: string | null
          subtotal_harga?: number | null
          tanggal_transaksi?: string | null
          total_harga?: number | null
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
      ulasan: {
        Row: {
          id: number
          id_order: number | null
          id_pengguna: number
          isi_ulasan: string | null
          rating: number | null
        }
        Insert: {
          id?: number
          id_order?: number | null
          id_pengguna: number
          isi_ulasan?: string | null
          rating?: number | null
        }
        Update: {
          id?: number
          id_order?: number | null
          id_pengguna?: number
          isi_ulasan?: string | null
          rating?: number | null
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
