import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export function useLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      navigate("/");
    }
  };

  return handleLogout;
}