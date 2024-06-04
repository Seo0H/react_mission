import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/api/supabase';
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

  useEffect(() => {
    if (!formList)
      supabase
        .from('form')
        .select()
        .then(({ data, error }) => {
          if (!error) setFormList(data);
        });
  }, []);

  return <AdminContext.Provider value={{ formList }}>{children}</AdminContext.Provider>;
};
