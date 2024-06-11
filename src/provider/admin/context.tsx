import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form } from '@/api/form/types/server-response';
import { supabase } from '@/api/supabase';
import { useAuthContext } from '@/hooks/use-auth/auth-context';
import { Tables } from '@/types/supabase';

type TAdminContext = {
  formList: Tables<'form'>[] | null;
  getFormList: (abortSignal?: AbortSignal) => Promise<void>;
};

const AdminContext = createContext<TAdminContext | null>(null);

export const useAdminContext = () => {
  const value = useContext(AdminContext);
  if (!value) {
    throw new Error('useAdminContext는 AdminProvider 내부에서만 사용가능합니다.');
  }

  return value;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [formList, setFormList] = useState<Tables<'form'>[] | null>(null);
  const { session } = useAuthContext();
  const navigator = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    getFormList(abortController.signal);
    return () => abortController.abort();
  }, []);

  const getFormList = useCallback(
    async (abortSignal?: AbortSignal) => {
      if (!session) return;

      await supabase
        .from('form')
        .select()
        .abortSignal(abortSignal ?? new AbortController().signal)
        .then(({ data, error, status }) => {
          if (status >= 400) {
            alert(`폼 목록을 가져오던 중 문제가 발생했습니다. / STATUS : ${status}`);
            return;
          }

          if (!error) {
            setFormList(data);
          }
        });
    },
    [supabase],
  );

  return <AdminContext.Provider value={{ formList, getFormList }}>{children}</AdminContext.Provider>;
};
