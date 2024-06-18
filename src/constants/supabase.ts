import { isDev } from '@/utils/is';

export const REACT_APP_SUPABASE_KEY = isDev
  ? process.env.DEV_REACT_APP_SUPABASE_KEY!
  : process.env.REACT_APP_SUPABASE_KEY!;

export const REACT_APP_SUPABASE_URL = isDev
  ? process.env.DEV_REACT_APP_SUPABASE_URL!
  : process.env.REACT_APP_SUPABASE_URL!;
