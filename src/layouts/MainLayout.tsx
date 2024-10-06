import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: FC<{ children: React.ReactNode }> = () => {
  return (
    <>
      <>Main Layout</>
      <Outlet/>
    </>
  );
};

export default MainLayout;
