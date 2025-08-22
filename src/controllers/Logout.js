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
