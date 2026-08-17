// functions/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://enjgikkvnlgdbesrnehc.supabase.co';   // ← Project URL
const SUPABASE_ANON_KEY = 'sb_publishable_GTvOVPvrptZ1XCAMX3rmUg_GhedRp0S';      // ← Publishable key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);