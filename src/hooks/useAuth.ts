import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSession, signInWithEmail, signOut } from "../api/supabaseClient";

const { VITE_ADMIN_EMAIL } = import.meta.env;

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session.data.session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        toast.error("Bitte melden Sie sich an.");
      }
    };
    checkSession();
  }, []);

  const login = async () => {
    if (!password) {
      toast.error("Bitte geben Sie ein Passwort ein.");
      return;
    }

    const { data, error } = await signInWithEmail(VITE_ADMIN_EMAIL, password);

    if (error || !data.session) {
      toast.error(
        "Login fehlgeschlagen. Bitte überprüfen Sie Ihr Passwort und versuchen Sie es erneut.",
      );
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    toast.success("Login erfolgreich!");
  };

  const logout = async (onLogout?: () => void) => {
    await signOut();
    setIsLoggedIn(false);
    toast.success("Erfolgreich abgemeldet.");
    onLogout?.();
  };

  return { isLoggedIn, password, setPassword, login, logout };
}
