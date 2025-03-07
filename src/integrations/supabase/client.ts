
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://nryafptwknnftdjugoyn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yeWFmcHR3a25uZnRkanVnb3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MjA5MjksImV4cCI6MjA1NjM5NjkyOX0.6ixFQDUWcBw7Z3LQW6-uehPCza286BV9HDmHnNrM_vw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
