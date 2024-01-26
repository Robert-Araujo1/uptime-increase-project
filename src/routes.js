import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './views/authentication/AuthLayout';
import Dashboard from './views/home/Dashboard';
import Login from './views/authentication/Login';
import ResetPassword from './views/authentication/ResetPassword';
import ResetPasswordMsg from './views/authentication/ResetPasswordMsg';

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout children={<Login />} route={'/home/dashboard'} />,
  },
  {
    path: '/',
    element: <AuthLayout children={<Login />} route={'/home/dashboard'} />,
  },
  {
    path: '/resetpassword',
    element: (
      <AuthLayout children={<ResetPassword />} route={'/resetpasswordmsg'} />
    ),
  },
  {
    path: '/resetpasswordmsg',
    element: <AuthLayout children={<ResetPasswordMsg />} route={'/'} />,
  },
  {
    path: '/home/dashboard',
    element: <Dashboard />,
  },
]);
