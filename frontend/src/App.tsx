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
import Demo from "./pages/Demo";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { signin,token }  = useAuthStore();
  useEffect(()=>{
     const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

     if(token && email){
      signin(token, email);
     }

  },[signin])


  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-20 bg-black min-h-screen text-white">
        <Routes>
          <Route path="/demo" element={<Demo />} />
          <Route path="/" element={<DashBoard />} />
          <Route path="/signup" element={<SignupPageComponent />} />
          <Route path="/signin" element={<SigninPageComponent />} />
          <Route path="/email-verification" element={<OtpVerification />} />
          <Route path="/contact" element={<ProtectedRoute token={token}><Contact/></ProtectedRoute>} />
          <Route path="/features" element={<Features />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/send-otp" element={<SendMail />} />
          <Route path="/admin" element={<Admin />} />

          <Route
           path="/add-paper" 
           element={
            <ProtectedRoute token={token}>
              <AddPaper/>
            </ProtectedRoute>} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute token={token}>
                <ProfilePage />
              </ProtectedRoute>
            }
        />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
