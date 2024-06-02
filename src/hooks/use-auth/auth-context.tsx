import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { supabase } from '@/api/supabase';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tables } from '@/types/supabase';
import { regex } from '@/utils/regex';

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
    const isEmpty = !email || !password || !name;
    const isPasswordLengthBetween6and12 = password.length >= 6 && password.length <= 12;
    const isEmailValidate = regex.email.test(email);
    const errorMessage = { error: '' };

    // validate
    if (isEmpty) {
      errorMessage.error = '양식을 모두 채워주세요.';
    } else if (!isEmailValidate) {
      errorMessage.error = '이메일 형식에 알맞게 작성해주세요.';
    } else if (!isPasswordLengthBetween6and12) {
      errorMessage.error = '비밀번호는 6글자 이상, 12글자 이하로 입력해주세요.';
    }

    if (errorMessage.error) {
      return errorMessage;
    }

    const { error: authError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { email, full_name: name },
      },
    });

    if (authError) {
      // TODO: 에러 코드가 넘어오지 않아 임시로 조치. 더 깔끔하게 동일 유저를 확인할 수 있는 방법 고민해보기.
      if (authError.message === 'User already registered') {
        errorMessage.error = '이미 같은 아이디의 유저가 있습니다.';
      } else errorMessage.error = '예측하지 못한 에러가 발생했습니다. 콘솔을 확인해주세요.';

      return errorMessage;
    } else {
      _getUserDataFromDB();
    }

    return null;
  };

  const loginWithPassword = async (email: string, password: string) => {
    const isEmpty = !email || !password;
    const errorMessage = { error: '' };

    // validate
    if (isEmpty) {
      errorMessage.error = '양식을 모두 채워주세요.';
      return errorMessage;
    }

    const loginResult = await supabase.auth.signInWithPassword({ email, password });

    if (loginResult.error) {
      errorMessage.error = '해당 유저가 없습니다.';
      return errorMessage;
    } else {
      _getUserDataFromDB();
    }

    return null;
  };

  const _getUserDataFromDB = async () => {
    const { data, error } = await supabase.from('user').select('*');
    if (data?.length) setUserInfo(data[0]);
    // FIXME: Error 처리 추가
    if (error) console.error(error);
  };

  return (
    <AuthContext.Provider value={{ session, userInfo, loginWithPassword, logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
