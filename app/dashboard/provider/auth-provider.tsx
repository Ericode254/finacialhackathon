"use client"
import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({
  getToken: () => null,
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const getToken = () => localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    router.replace('/auth/login'); // Redirect to login page
  };

  useEffect(() => {
    // Redirect to login if no token is found
    if (!getToken()) {
      router.replace('/auth/login');
    }
  }, [router]); // Depend on router only to avoid unnecessary rerenders

  return (
    <AuthContext.Provider value={{ getToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
