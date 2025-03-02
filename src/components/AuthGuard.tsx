
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Show nothing while checking authentication
  if (isLoading) return null;

  // If authenticated, render children
  return user ? <>{children}</> : null;
};

export default AuthGuard;
