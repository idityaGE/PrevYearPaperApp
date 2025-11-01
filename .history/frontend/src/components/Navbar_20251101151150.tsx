import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastContainerComponent from "./ToastContainerComponent";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "../store/authStore";


function Navbar() {
 const { token, setToken } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);


      useEffect(() => {
           const item = localStorage.getItem("token");
          if (!item) return;

         

          if(token){
            
          }

      }, [setAuth]);

  const handleAuthClick = () => {
    const token = localStorage.getItem("auth-storage");

    if (token) {
      localStorage.removeItem("auth-storage");
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } else {
      navigate("/signin");
    }
  };

  return (
<nav className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-gray-600 via-gray-800 to-black shadow-lg backdrop-blur-md z-50">      <div className="max-w-8xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🌟 Brand / Logo */}
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform duration-300">
          <Link to="/">🌟 DashBoard</Link>
        </div>

        {/* 📱 Hamburger Icon (Mobile only) */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </div>

        {/* 🌐 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white font-semibold text-lg">
          <Link className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to="/add-paper">
            Add Paper
          </Link>
          <Link className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to="/features">
            Features
          </Link>
          <Link className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to="/about-us">
            About Us
          </Link>
          <Link className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to="/contact">
            Contact
          </Link>

          {/* ✅ Login / Logout Button */}
          <button
            onClick={handleAuthClick}
            className="ml-2 px-4 py-2 bg-white text-amber-600 rounded-full shadow-md font-semibold hover:bg-yellow-50 hover:shadow-lg transition-all duration-300"
          >
            {localStorage.getItem("token") ? "Logout" : "Login"}
          </button>

          {/* 👤 Profile Icon */}
          <Link to="/profile">
            <img
              className="rounded-full bg-white h-12 w-12 object-cover shadow-md hover:shadow-lg transition-all duration-300"
              src="user.jpeg"
              alt="User"
            />
          </Link>

          <ToastContainerComponent />
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black/80 backdrop-blur-lg text-white font-medium py-4 space-y-4 border-t border-gray-700">
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-200" to="/add-paper">
            Add Paper
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-200" to="/features">
            Features
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-200" to="/about-us">
            About Us
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-200" to="/contact">
            Contact
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleAuthClick();
            }}
            className="px-5 py-2 bg-white text-amber-600 rounded-full font-semibold hover:bg-yellow-50 transition-all duration-300"
          >
            { token ? "Logout" : "Login"}
          </button>

          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            <img
              className="rounded-full bg-white h-12 w-12 object-cover shadow-md hover:shadow-lg transition-all duration-300"
              src="user.jpeg"
              alt="User"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
