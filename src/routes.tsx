
import { createBrowserRouter } from 'react-router-dom';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import AuthGuard from '@/components/AuthGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <Index />
      </AuthGuard>
    ),
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
