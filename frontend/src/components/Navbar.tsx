import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ToastContainerComponent from "./ToastContainerComponent";

function Navbar() {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ Logout flow
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } else {
      // ✅ Go to login page
      navigate("/signin");
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-gray-600 to-black via-gray-800 shadow-lg backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo / Brand */}
        <div className="text-3xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform duration-300">
          
          <Link to={'/dashboard'}>🌟 DashBoard</Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center space-x-8 text-white font-semibold text-lg">
          <Link  className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to={'/add-paper'}>Add paper</Link>
          <Link  className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to={'/features'}>Features</Link>
          <Link  className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to={'/about-us'}>About Us</Link>
          <Link  className="hover:text-yellow-200 hover:scale-110 transition-all duration-200" to={'/contact'}>Contact</Link>



          {/* ✅ Login / Logout Button */}
          <button
            onClick={handleAuthClick}
            className="ml-4 px-5 py-2 bg-white text-amber-600 rounded-full shadow-md font-semibold hover:bg-yellow-50 hover:shadow-lg transition-all duration-300"
          >
            {localStorage.getItem("token") ? "Logout" : "Login"}
          </button>

          <ToastContainerComponent />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
