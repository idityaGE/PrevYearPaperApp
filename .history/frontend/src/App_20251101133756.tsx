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
        <div className="bg-background min-h-screen pt-20"> 
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPageComponent />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/add-paper" element={token ? <AddPaper /> : <SigninPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={token ? <ProfilePage /> : <SigninPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
