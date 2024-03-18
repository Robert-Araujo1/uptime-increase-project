import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import HomeLayout from './layouts/HomeLayout';
import Dashboard from './views/home/Dashboard';
import Machines from './views/home/Machines';
import Login from './views/authentication/pages/Login/Login';
import ResetPassword from './views/authentication/pages/ResetPassword/ResetPassword';
import ResetPasswordMsg from './views/authentication/pages/ResetPasswordMsg/ResetPasswordMsg';
import SignUp from './views/authentication/pages/Signup/SignUp';

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
    children: [
      {
        path: '/home/dashboard',
        element: <HomeLayout view={<Dashboard />} title={'Dashboard'} />,
      },
      {
        path: '/home/machines',
        element: <HomeLayout view={<Machines />} title={'Machines'} />,
      },
    ],
  },
]);
