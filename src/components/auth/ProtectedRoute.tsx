import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Remove the redirect to index since we're allowing unauthenticated access
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}