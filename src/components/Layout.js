import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="w3-row">
      {/* Sidebar */}
      <div className="w3-col s2 w3-light-grey w3-bar-block" style={{ height: "100vh" }}>
        <h3 className="w3-bar-item">🍹 Bar App</h3>
        <Link to="/menu" className="w3-bar-item w3-button">Home</Link>
        <Link to="/orders" className="w3-bar-item w3-button">Orders</Link>
      </div>

      {/* Main content */}
      <div className="w3-col s10 w3-container">
        {children}
      </div>
    </div>
  );
}
