import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FilePlus,
  Info,
  Mail,
  LogOut,
  User,
  LogIn,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuthStore();
  const { setOpenMobile } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate("/signin");
    setOpenMobile(false);
  };

  const handleNavigation = () => {
    setOpenMobile(false);
  };

  const platformItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Add Paper",
      url: "/add-paper",
      icon: FilePlus,
    },
  ];

  const supportItems = [
    {
      title: "About Us",
      url: "/about-us",
      icon: Info,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: Mail,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link
          to="/"
          onClick={handleNavigation}
          className="flex items-center gap-2 font-bold text-xl text-sidebar-foreground group-data-[collapsible=icon]:justify-center"
        >
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shrink-0">
            P
          </div>
          <span className="group-data-[collapsible=icon]:hidden">
            PrevPapers
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url} onClick={handleNavigation}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url} onClick={handleNavigation}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {token ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/profile"}
                tooltip="Profile"
              >
                <Link to="/profile" onClick={handleNavigation}>
                  <User />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                tooltip="Logout"
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Login">
                <Link to="/signin" onClick={handleNavigation}>
                  <LogIn />
                  <span>Login</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
