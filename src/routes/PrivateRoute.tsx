import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';

const isAuthenticated = () => {
  return true;
}

const PrivateRoute: React.FC<{}> = ({}) => {
  return isAuthenticated() ? <UserLayout/> : <Navigate to="/" />
};

export default PrivateRoute;