import { ReactNode, useEffect } from 'react';
import { BaseLayout } from 'components/ui/layouts/BaseLayout';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export const ProtectedBaseLayout = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, []);

  if (!isLoaded) return 'Loading...';
  return <BaseLayout className={className}>{children}</BaseLayout>;
};
