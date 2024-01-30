import React from 'react';
import ReactDOM from 'react-dom/client';
import { routes } from './routes';
import { RouterProvider } from 'react-router-dom';
import './assets/css/styles.css';
import './i18n/i18n';
import './assets/scss/uptime-increase-project-react.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
