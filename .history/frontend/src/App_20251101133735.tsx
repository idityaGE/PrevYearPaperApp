function App() {
  const token = localStorage.getItem('token');

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
