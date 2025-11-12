import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "../store/authStore";
import ToastContainerComponent from "./ToastContainerComponent";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { token, logout, email, admin, checkAdmin } = useAuthStore();

  useEffect(() => {
    if (email) checkAdmin(email);
  }, [email]);

  const handleAuthClick = () => {
    if (token) {
      logout();
      toast.success("Logged out successfully!");
    }
    navigate("/signin");
  };

  const navLinks = [
    { name: "Add Paper", path: "/add-paper" },
    { name: "Features", path: "/features" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-yellow-400 font-bold"
      : "text-white hover:text-yellow-300";

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0c0c0d]/90 backdrop-blur-lg border-b border-white/10 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide hover:text-yellow-300 transition"
        >
          PrevPapers
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${isActive(link.path)} transition`}
            >
              {link.name}
            </Link>
          ))}

          {/* ✅ Admin Button (only visible for admins) */}
          {admin && token && (
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-blue-400 transition shadow"
            >
              Admin Panel
            </button>
          )}

          {/* Auth Button */}
          <button
            onClick={handleAuthClick}
            className="px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition shadow"
          >
            {token ? "Logout" : "Login"}
          </button>

          {/* Profile Picture */}
          {token && (
            <Link to="/profile">
              <img
                src="/user.jpeg"
                className="h-11 w-11 rounded-full border border-white/30 hover:scale-105 transition shadow"
                alt="user"
              />
            </Link>
          )}

          <ToastContainerComponent />
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </div>
      </div>
    </nav>
  );
}
