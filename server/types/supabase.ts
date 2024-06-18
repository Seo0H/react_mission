import { Form } from '@/api/form/types/server-response';
import { Validate } from '@/hooks/use-form/types/validator';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type EscapeValidate = (Validate & { name: string })[];

export type Database = {
  public: {
    Tables: {
      form: {
        Row: {
          access_type: Database['public']['Enums']['form_types'];
          create_user: string | null;
          escapevalidate: EscapeValidate;
          forms: Form[];
          id: number;
          lang: Database['public']['Enums']['lang_type'];
          title: string;
        };
        Insert: {
          access_type?: Database['public']['Enums']['form_types'];
          create_user?: string | null;
          escapevalidate?: EscapeValidate;
          forms: Form[];
          id?: number;
          lang?: Database['public']['Enums']['lang_type'];
          title: string;
        };
        Update: {
          access_type?: Database['public']['Enums']['form_types'];
          create_user?: string | null;
          escapevalidate?: EscapeValidate;
          forms?: Form[];
          id?: number;
          lang?: Database['public']['Enums']['lang_type'];
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'form_create_user_fkey';
            columns: ['create_user'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      form_answer: {
        Row: {
          answer_form_id: number | null;
          answer_user: string | null;
          answers: Json;
          id: number;
        };
        Insert: {
          answer_form_id?: number | null;
          answer_user?: string | null;
          answers: Json;
          id?: number;
        };
        Update: {
          answer_form_id?: number | null;
          answer_user?: string | null;
          answers?: Json;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'form_answer_answer_form_id_fkey';
            columns: ['answer_form_id'];
            isOneToOne: false;
            referencedRelation: 'form';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'form_answer_answer_user_fkey';
            columns: ['answer_user'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          email: string | null;
          id: string;
          name: string | null;
          role: Database['public']['Enums']['user_role'];
        };
        Insert: {
          email?: string | null;
          id: string;
          name?: string | null;
          role: Database['public']['Enums']['user_role'];
        };
        Update: {
          email?: string | null;
          id?: string;
          name?: string | null;
          role?: Database['public']['Enums']['user_role'];
        };
        Relationships: [
          {
            foreignKeyName: 'user_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      form_types: 'common' | 'limited';
      lang_type: 'ko' | 'en';
      user_role: 'admin' | 'default';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
