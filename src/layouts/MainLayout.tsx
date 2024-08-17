import React, { FC } from 'react';

const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>Main Layout Header</header>
      <main>{children}</main>
      <footer>Main Layout Footer</footer>
    </div>
  );
};

export default MainLayout;
