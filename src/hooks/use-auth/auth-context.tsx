import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { supabase } from '@/api/supabase';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tables } from '@/types/supabase';

import { AUTH_NEEDED_PAGES, AUTH_NOT_ALLOWED_PAGES } from './constants';
import { TAuthContext } from './type';
import type { Session } from '@supabase/supabase-js';

const AuthContext = createContext<TAuthContext | null>(null);

// Custom Hook
export const useAuthContext = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuthContext must be used within AuthProvider');
  return value;
};

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userInfo, setUserInfo, removeUserInfo] = useLocalStorage<Tables<'user'>>('userInfo', undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(function handleAuthStateChange(_event, session) {
      setSession(session);

      if (
        (!session && AUTH_NEEDED_PAGES.includes(location.pathname)) ||
        (session && AUTH_NOT_ALLOWED_PAGES.includes(location.pathname))
      ) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const result = await supabase.auth.signOut();
    removeUserInfo();
    navigate('/');
    return result;
  };

  const signIn = async (email: string, password: string, name: string) => {
    const signInResult = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { email, full_name: name },
      },
    });

    if (!signInResult.error) {
      _getUserDataFromDB();
    }

    return signInResult;
  };

  const loginWithPassword = async (email: string, password: string) => {
    const loginResult = await supabase.auth.signInWithPassword({ email, password });

    if (!loginResult.error) {
      _getUserDataFromDB();
    }

    return loginResult;
  };

  const _getUserDataFromDB = async () => {
    const { data, error } = await supabase.from('user').select('*');
    if (data?.length) setUserInfo(data[0]);
    // FIXME: Error 처리 추가
    console.error(error);
  };

  return (
    <AuthContext.Provider value={{ session, userInfo, loginWithPassword, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
