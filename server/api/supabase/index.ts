import { createClient } from '@supabase/supabase-js';

import { REACT_APP_SUPABASE_KEY, REACT_APP_SUPABASE_URL } from 'server/constants/supabase';
import { Database } from 'server/types/supabase';

export const supabase = createClient<Database>(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY);
