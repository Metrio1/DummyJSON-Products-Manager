import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
