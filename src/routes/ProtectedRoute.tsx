import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
