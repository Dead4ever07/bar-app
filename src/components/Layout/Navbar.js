import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "./Layout.css";

const Navbar = () => {
  const [user, setUser] = useState(null); // ✅ track user with state
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null);
      navigate("/");
    }
  };

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

  return (
    <nav className="navbar">
      <div className="navbar-icon w3-round-xxlarge">
        <img src="./favicon.jpeg" alt="App Icon" />
      </div>
      <div className="navbar-buttons">
        {user ? (
          <>
            <Link to="/menu" className="nav-btn">
              Bar
            </Link>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
