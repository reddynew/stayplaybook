// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://urnsvcfmxndglelotdbc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybnN2Y2ZteG5kZ2xlbG90ZGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NTgwMTIsImV4cCI6MjA1NjAzNDAxMn0.rUa7fHz8rTGFE6ZQppW-Byfgz_QOWzSJyVXjFJQY-_Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);