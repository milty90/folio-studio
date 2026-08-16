import { supabase } from "../api/supabase";

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error logging in with email:", error);
  }
  console.log("Login response:", data);
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  }
  console.log("Sign out response:", error);
  return { error };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
  }
  console.log("Session response:", data);
  return { data, error };
}
