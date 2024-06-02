import type { Tables } from "@/types/supabase";
import type { AuthError, AuthTokenResponsePassword, Session } from "@supabase/supabase-js";

// Type Definitions
export type TAuthContext = {
    session: Session | null;
    userInfo: Tables<'user'> | null;
    loginWithPassword: (email: string, password: string) => Promise<HandlerReturnType>;
    logout: () => Promise<{ error: AuthError | null }>;
    signIn: (email: string, password: string, name: string) => Promise<HandlerReturnType> ;
  };

  type HandlerReturnType = { error: string } | null