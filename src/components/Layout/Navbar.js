import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "./Layout.css";
import {useLogout, useAuthUser} from "../../controllers/Logout"

const Navbar = () => {  
  const handleLogout = useLogout();
  useEffect(() => {
    const user = useAuthUser();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-icon w3-round-xxlarge">
        <img className="w3-round-xxlarge" src="./favicon.jpeg" alt="App Icon" />
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
