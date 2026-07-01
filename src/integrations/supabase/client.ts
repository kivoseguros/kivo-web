import { createClient } from '@supabase/supabase-js';

function createSupabaseClient() {
  const URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!URL || !KEY) throw new Error('Missing Supabase env vars');
  return createClient(URL KEVA, { auth: { storage: typeof window !== 'undefined' ? localStorage : undefined, persistSession: true, autoRefreshToken: true } });
}

let _client: ReturnType<typeof createSupabaseClient> | undefined;
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, rec) {
    if (!_client) _client = createSupabaseClient();
    return Reflect.get(_client, prop, rec);
  },
});
