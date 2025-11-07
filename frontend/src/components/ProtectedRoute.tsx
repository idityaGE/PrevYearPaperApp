// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type ProtectedRouteProps = {
  children: React.ReactNode;        
  // token: string | null | undefined; 
};

export default function ProtectedRoute({
  children,
  // token,
}: ProtectedRouteProps) {
  const {token} = useAuthStore();
  const location = useLocation();

  // If not logged in, redirect to signin and include the original location
  // We use `replace` at the Navigate call so the signin replaces the current history entry
  // (so BACK button doesn't bring the user back to the protected route which immediately redirects).
  if (!token) {
    const redirectTo = `${location.pathname}${location.search || ""}${location.hash || ""}`;
    return <Navigate to={`/signin?redirect=${encodeURIComponent(redirectTo)}`} replace />;
  }


  return <>{children}</>;
}
