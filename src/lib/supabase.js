import { createClient } from '@supabase/supabase-js';

const fallbackUrl = 'https://juajkyjgqmwxowslpslh.supabase.co';
const fallbackAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YWpreWpncW13eG93c2xwc2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODUxNDQsImV4cCI6MjA4NDc2MTE0NH0.Vxo4Jp0BR4SBRV7OcLOJIS85UUl7TXO84g2FYw56RLY';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

