import { createContext, useContext, useEffect, useState } from 'react';

import { AuthError, AuthResponse, AuthTokenResponsePassword, Session } from '@supabase/supabase-js';

import { supabase } from '@/api/supabase';
import { Tables } from '@/types/supabase';

type TAuthContext = {
  session: Session | null;
  userInfo: Tables<'user'> | null;
  loginWithPassword: (email: string, password: string) => Promise<AuthTokenResponsePassword>;
  logout: () => Promise<{ error: AuthError | null }>;
  singIn: (email: string, password: string, name: string) => Promise<AuthResponse>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuthContext LanguageProvider 내부에서 사용되어야 합니다.');
  return value;
};

export const AuthProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userInfo, setUserInfo] = useState<Tables<'user'> | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      supabase
        .from('user')
        .select('*')
        .then(({ data }) => {
          if (data?.length) setUserInfo(data[0]);
        });
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => await supabase.auth.signOut();

  const singIn = async (email: string, password: string, name: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { email, full_name: name },
      },
    });
  };

  const loginWithPassword = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  return (
    <AuthContext.Provider value={{ session, userInfo, loginWithPassword, logout, singIn }}>
      {children}
    </AuthContext.Provider>
  );
};
