import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/api/supabase';
import { useAuthContext } from '@/hooks/use-auth/auth-context';
import { Tables } from '@/types/supabase';

type TAdminContext = {
  formList: Tables<'form'>[] | null;
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

  useEffect(() => {
    if (!session || formList) return;

    const abortController = new AbortController();

    supabase
      .from('form')
      .select()
      .abortSignal(abortController.signal)
      .then(({ data, error }) => {
        if (!error) {
          setFormList(data);
        }
      });

    return () => abortController.abort();
  }, []);

  return <AdminContext.Provider value={{ formList }}>{children}</AdminContext.Provider>;
};
