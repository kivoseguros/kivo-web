// Server-side Supabase client with service role key - bypasses RLS.
import { createClient } from '@supabase/supabase-js';

function createSupabaseAdminClient() {
  const URL = process.env.SUPABASE_URL;
  const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!URL || !KEY) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return createClient(URL, KEY, { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } });
}

let _admin: ReturnType<typeof createSupabaseAdminClient> | undefined;
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, rec) {
    if (!_admin) _admin = createSupabaseAdminClient();
    return Reflect.get(_admin, prop, rec);
  },
});
