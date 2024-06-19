import { createContext, useContext, useEffect, useState } from 'react';
import { validateToken } from '../../services/authentication';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ loading: true });
  useEffect(() => {
    const validTokenAction = async () => {
      localStorage.setItem('username', null);
      try {
        const token = localStorage.getItem('accessToken');
        const validation = await validateToken(token);

        if (validation) {
          setAuthState({ loading: false, ...validation });
          return validation;
        }
        setAuthState({ loading: false });
      } catch (error) {
        console.error(error);
      }
    };
    validTokenAction();
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
