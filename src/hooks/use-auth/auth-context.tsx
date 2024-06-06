import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { supabase } from '@/api/supabase';
import { Tables } from '@/types/supabase';

import { AUTH_NEEDED_PAGES, AUTH_NOT_ALLOWED_PAGES } from './constants';
import { TAuthContext } from './type';
import { isPathInclude, validateSignUpInput } from './utils';
import type { Session } from '@supabase/supabase-js';

const AuthContext = createContext<TAuthContext | null>(null);

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuthContext must be used within AuthProvider');
  return value;
};

export const AuthProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userInfo, setUserInfo] = useState<Tables<'user'> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session || userInfo) return;

    const abortController = new AbortController();
    _getUserDataFromDB(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [session, userInfo]);

  useEffect(() => {
    (function handleNavigation() {
      if (
        (!session && isPathInclude(AUTH_NEEDED_PAGES, location.pathname)) ||
        (session && isPathInclude(AUTH_NOT_ALLOWED_PAGES, location.pathname))
      ) {
        navigate('/', { replace: true });
      }
    })();
  }, [session, location.pathname]);

  const signIn = async (email: string, password: string, name: string) => {
    const errorMessage = validateSignUpInput(email, password, name);
    if (errorMessage) return errorMessage;

    const { error: authError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { email, full_name: name },
      },
    });

    if (authError) {
      if (authError.message === 'User already registered') {
        return { error: '이미 같은 아이디의 유저가 있습니다.' };
      }

      return { error: '예측하지 못한 에러가 발생했습니다. 콘솔을 확인해주세요.' };
    }

    return null;
  };

  const logout = useCallback(async () => await supabase.auth.signOut(), [supabase]);

  const loginWithPassword = useCallback(
    async (email: string, password: string) => {
      if (!email || !password) {
        return { error: '양식을 모두 채워주세요.' };
      }

      const loginResult = await supabase.auth.signInWithPassword({ email, password });

      if (loginResult.error) {
        return { error: '해당 유저가 없습니다.' };
      }

      return null;
    },
    [supabase],
  );

  const _getUserDataFromDB = useCallback(
    async (signal: AbortSignal) => {
      const { data, error } = await supabase.from('user').select('*').abortSignal(signal);
      if (data?.length) setUserInfo(data[0]);
      if (error) console.error(error);
    },
    [supabase],
  );

  return (
    <AuthContext.Provider value={{ session, userInfo, loginWithPassword, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
