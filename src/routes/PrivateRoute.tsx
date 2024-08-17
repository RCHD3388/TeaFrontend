import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return true;
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />
};

export default PrivateRoute;