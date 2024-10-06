import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC<{ children: React.ReactNode }> = () => {
  return (
    <Outlet/>
  );
};

export default AuthLayout;
