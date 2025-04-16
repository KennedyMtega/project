import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Use environment variables with a different prefix to avoid client exposure
// In production, these should be set as server-side environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add proper type safety and session persistence configuration
export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'chat-app'
    }
  }
});

// Add error handling for authentication failures
export const handleAuthError = (error: Error): void => {
  console.error('Authentication error:', error.message);
  // Implement proper error handling and user notification
};