import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import HomeLayout from './layouts/HomeLayout';
import Dashboard from './views/home/Dashboard';
import Machines from './views/home/Machines';
import Login from './views/authentication/pages/Login/Login';
import ResetPassword from './views/authentication/pages/ResetPassword/ResetPassword';
import ResetPasswordMsg from './views/authentication/pages/ResetPasswordMsg/ResetPasswordMsg';
import SignUp from './views/authentication/pages/Signup/SignUp';
import NewPassword from './views/authentication/pages/NewPassword/NewPassword';
import { useAuth } from './contexts/auth/AuthContext';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import WorkshopManagement from './views/home/WorkshopManagement';
import PopsConectado from './views/home/PopsConectado';

const ProtectedRoute = ({ children }) => {
  const { loading, username } = useAuth();

  if (loading && !username) {
    return (
      <Box>
        <LinearProgress />
      </Box>
    );
  } else if (!loading && username) {
    localStorage.setItem('username', username);
    return children;
  } else if (!loading && !username) {
    if (localStorage.getItem('accessToken')) {
      alert('Session Expired.');
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('idToken');
    localStorage.removeItem('machines');
    return <Navigate replace to='/' />;
  } else {
    return <div>Unknown Error</div>;
  }
};

const AuthRedirect = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken && localStorage.getItem('username') ? (
    <Navigate replace to='/home/machines' />
  ) : (
    children
  );
};

const publicRoutes = [
  {
    path: '/',
    element: (
      <AuthRedirect>
        <AuthLayout children={<Login />} />
      </AuthRedirect>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthRedirect>
        <AuthLayout children={<Login />} />
      </AuthRedirect>
    ),
  },
  {
    path: '/resetpassword',
    element: (
      <AuthRedirect>
        <AuthLayout children={<ResetPassword />} />
      </AuthRedirect>
    ),
  },
  {
    path: '/resetpasswordmsg',
    element: (
      <AuthRedirect>
        <AuthLayout children={<ResetPasswordMsg />} />
      </AuthRedirect>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthRedirect>
        <AuthLayout children={<SignUp />} />
      </AuthRedirect>
    ),
  },
  {
    path: '/newPassword/:id',
    element: (
      <AuthRedirect>
        <AuthLayout children={<NewPassword />} />
      </AuthRedirect>
    ),
  },
];

const privateRoutes = [
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <HomeLayout view={<Dashboard />} title={'Dashboard'} />
      </ProtectedRoute>
    ),
  },
  {
    path: 'machines/:id?',
    element: (
      <ProtectedRoute>
        <HomeLayout view={<Machines />} title={'Uptime Increase'} />
      </ProtectedRoute>
    ),
  },
  {
    path: 'workshop-management/:id?',
    element: (
      <ProtectedRoute>
        <HomeLayout
          view={<WorkshopManagement />}
          title={'Gestão de Máquinas Paradas'}
        />
      </ProtectedRoute>
    ),
  },
  {
    path: 'pops-conectado',
    element: (
      <ProtectedRoute>
        <HomeLayout view={<PopsConectado />} title={'POPS Conectado'} />
      </ProtectedRoute>
    ),
  },
];

export const routes = createBrowserRouter([
  ...publicRoutes,
  {
    path: '/home',
    children: privateRoutes,
  },
]);
