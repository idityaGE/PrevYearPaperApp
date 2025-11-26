import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import AddPaper from "./pages/AddPaper";
import Admin from "./pages/Admin";
import ProfilePage from "./pages/ProfilePage";
import OtpVerification from "./pages/OtpVerification";
import SendMail from "./pages/SendMail";
import AuthPage from "./pages/AuthPage";
import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { Separator } from "./components/ui/separator";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col h-screen overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between bg-background z-10">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb className="hidden md:block">
                  <BreadcrumbList>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        <PageTitle />
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-2">
                <HeaderActions />
                <ModeToggle />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-background">
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/:authType" element={<AuthPageWrapper />} />
                <Route
                  path="/email-verification"
                  element={<OtpVerification />}
                />
                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute>
                      <Contact />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/send-otp" element={<SendMail />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/add-paper"
                  element={
                    <ProtectedRoute>
                      <AddPaper />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function HeaderActions() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  if (!token) {
    return (
      <Button variant="default" size="sm" onClick={() => navigate("/signin")}>
        Login
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      onClick={() => navigate("/add-paper")}
      className="flex cursor-pointer"
    >
      <FilePlus className="h-4 w-4 mr-2" />
      Add Paper
    </Button>
  );
}

function PageTitle() {
  const location = useLocation();
  const path = location.pathname;

  switch (path) {
    case "/":
      return "DASHBOARD";
    case "/add-paper":
      return "ADD PAPER";
    case "/about-us":
      return "ABOUT US";
    case "/contact":
      return "CONTACT";
    case "/profile":
      return "PROFILE";
    case "/admin":
      return "ADMIN";
    case "/signup":
      return "SIGN UP";
    case "/signin":
      return "SIGN IN";
    default:
      return "DASHBOARD";
  }
}

function AuthPageWrapper() {
  const { authType } = useParams();
  const { token } = useAuthStore();
  const location = useLocation();

  if (token) {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");
    return <Navigate to={redirect || "/"} replace />;
  }

  if (authType === "signin" || authType === "signup") {
    return <AuthPage />;
  }
  return <Navigate to="/" replace />;
}

export default App;
