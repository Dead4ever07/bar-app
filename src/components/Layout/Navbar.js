import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { supabase } from "../../supabaseClient";
import './Layout.css';

const Navbar = () => {

    let user;
    const navigate = useNavigate();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
        } else {
            navigate("/");
        }
    };

    useEffect(() => {

        const checkUser = async () => {
            user = await supabase.auth.getUser();
        };

        checkUser();

    }, [])

    if (user) {
        return (
            <nav className="navbar">
                <div className="navbar-icon">
                    <img src="./favicon.jpeg" alt="App Icon" />
                </div>
                <div className="navbar-buttons">
                    <Link to="/menu" className="nav-btn">
                        Bar
                    </Link>
                    <button on onClick={handleLogout} className="nav-btn">
                        Logout
                    </button>
                </div>
            </nav>
        );
    }
    return (
        <nav className="navbar">
            <div className="navbar-icon">
                <img src="./favicon.jpeg" alt="App Icon" />
            </div>
            <div className="navbar-buttons">
                <Link to="/Login" className="nav-btn">
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;