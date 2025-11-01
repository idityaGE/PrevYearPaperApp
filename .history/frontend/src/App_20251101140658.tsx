import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/Signup"
import SigninPage from "./pages/Signin"
import DashBoard from "./pages/DashBoard"
import Navbar from "./components/Navbar"
import Contact from "./pages/Contact"
import Features from "./pages/Features"
import AboutUs from "./pages/AboutUs"
import AddPaper from "./pages/AddPaper"
import Admin from "./pages/Admin"
// import AdminResponse from "./pages/AdminResponse"
import ProfilePage from "./pages/ProfilePage"
import SignupPageComponent from "./pages/SignupPageComponent"
import SigninPageComponent from "./pages/SigninPage"
// import Admin from "./pages/Admin"



function App() {
  const token = localStorage.getItem('token');

  return (
      <BrowserRouter>
        <Navbar />

        {/* page wrapper with bg + spacing because navbar is fixed */}
        <div className="fixed top-20 left-0 w-full h-20 bg-white z-50 shadow-md"> 
          <Routes>
            <Route path="/signup" element={<SignupPageComponent />} />
            <Route path="/signin" element={<SigninPageComponent />} />
            {/* <Route path="/demo" element={<Demo />} /> */}
            <Route path="/" element={<DashBoard />} />
            <Route path="verify-email" element={}
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/add-paper" element={token ? <AddPaper /> : <SigninPageComponent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={token ? <ProfilePage /> : <SigninPageComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App
