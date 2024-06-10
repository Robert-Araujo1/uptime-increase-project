import React from 'react';
import ReactDOM from 'react-dom/client';
import { routes } from './routes';
import { RouterProvider } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import './assets/css/styles.css';
import './i18n/i18n';
import './assets/scss/uptime-increase-project-react.scss';
import { AuthProvider } from './contexts/auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </Provider>
);
