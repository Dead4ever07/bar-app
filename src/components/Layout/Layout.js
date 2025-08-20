import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  console.log("Layout is rendering"); 
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;