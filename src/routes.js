import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import HomeLayout from './layouts/HomeLayout';
import Dashboard from './views/home/Dashboard';
import Login from './views/authentication/Login';
import ResetPassword from './views/authentication/ResetPassword';
import ResetPasswordMsg from './views/authentication/ResetPasswordMsg';
import SignUp from './views/authentication/SignUp';

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout children={<Login />} />,
  },
  {
    path: '/',
    element: <AuthLayout children={<Login />} />,
  },
  {
    path: '/resetpassword',
    element: <AuthLayout children={<ResetPassword />} />,
  },
  {
    path: '/resetpasswordmsg',
    element: <AuthLayout children={<ResetPasswordMsg />} />,
  },
  {
    path: '/signup',
    element: <AuthLayout children={<SignUp />} />,
  },
  {
    path: '/home',
    element: <HomeLayout view={<Dashboard />} />,
    children: [
      { path: '/home/dashboard', element: <HomeLayout view={<Dashboard />} /> },
    ],
  },
]);
