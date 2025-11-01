import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPageComponent from "./pages/SignupPageComponent";
import SigninPageComponent from "./pages/SigninPage";
import DashBoard from "./pages/DashBoard";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import AddPaper from "./pages/AddPaper";
import Admin from "./pages/Admin";
import ProfilePage from "./pages/ProfilePage";
import OtpVerification from "./pages/OtpVerification";
import SendMail from "./pages/SendMail";

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Navbar />

      {/* ✅ Page wrapper with padding below navbar */}
      <div className="pt-20 bg-black min-h-screen text-white">
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/signup" element={<SignupPageComponent />} />
          <Route path="/signin" element={<SigninPageComponent />} />
          <Route path="/email-verification" element={<OtpVerification />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/send-otp" element={<SendMail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-paper" element={token ? <AddPaper /> : <SigninPageComponent />} />
          <Route path="/profile" element={token ? <ProfilePage /> : <SigninPageComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
