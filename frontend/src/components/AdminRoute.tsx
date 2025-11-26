import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type AdminRouteProps = {
  children: React.ReactNode;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const { token, admin } = useAuthStore();
  const location = useLocation();

  if (!token) {
    const redirectTo = `${location.pathname}${location.search || ""}${
      location.hash || ""
    }`;
    return (
      <Navigate
        to={`/signin?redirect=${encodeURIComponent(redirectTo)}`}
        replace
      />
    );
  }

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
