
import { supabase } from "@/integrations/supabase/client";

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'standard' | 'viewer';
}

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  return data;
};

// Sign up with email and password
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  if (error) throw error;
  
  return data;
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
  
  return data;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get current user
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !sessionData.session) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) return null;
  
  // Get user role from database
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userData.user.id)
    .single();
    
  const role = roleError ? 'standard' : roleData.role;
  
  return {
    id: userData.user.id,
    email: userData.user.email || '',
    role: role as 'admin' | 'standard' | 'viewer',
  };
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const { data, error } = await supabase.auth.getSession();
  return !error && data.session !== null;
};

// Listen for authentication changes
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session && session.user) {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();
        
      const role = roleData?.role || 'standard';
      
      callback({
        id: session.user.id,
        email: session.user.email || '',
        role: role as 'admin' | 'standard' | 'viewer',
      });
    } else {
      callback(null);
    }
  });
};
