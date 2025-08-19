
export default function Layout({ children }) {
  return (
    <div className="w3-row">
      {/* Sidebar for desktop */}
      <div className="w3-col l2 m2 w3-light-grey w3-bar-block w3-hide-small" style={{ height: "100vh" }}>
        <h3 className="w3-bar-item">🍹Bar App</h3>
        <a href="/menu" className="w3-bar-item w3-button">Menu</a>
        <a href="/orders" className="w3-bar-item w3-button">Orders</a>
      </div>

      {/* Top navbar for mobile */}
      <div className="w3-bar w3-light-grey w3-hide-medium w3-hide-large">
        <a href="/menu" className="w3-bar-item w3-button">Menu</a>
        <a href="/orders" className="w3-bar-item w3-button">Orders</a>
      </div>

      {/* Main content */}
      <div className="w3-col l10 m9 s12 w3-container">
        {children}
      </div>
    </div>
  );
}
