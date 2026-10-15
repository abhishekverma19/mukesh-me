import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "mukesh_admin_session";

type AdminSession = {
  email: string;
  loggedInAt: number;
};

export function useAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from sessionStorage
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const session: AdminSession = JSON.parse(stored);
        // Session valid for 24 hours
        if (Date.now() - session.loggedInAt < 24 * 60 * 60 * 1000) {
          setUser({ email: session.email });
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      const session: AdminSession = { email, loggedInAt: Date.now() };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setUser({ email });
      return { user: { email } };
    }

    throw new Error("Invalid email or password.");
  }, []);

  const signOut = useCallback(async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, session: user ? { email: user.email } : null, loading, signIn, signOut };
}
