import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return user;
}
