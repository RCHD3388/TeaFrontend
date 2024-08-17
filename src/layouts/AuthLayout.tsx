import React, { FC } from 'react';

const AuthLayout: FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div>
      <header>Auth Layout Header</header>
      <main>{children}</main>
      <footer>Auth Layout Footer</footer>
    </div>
  );
};

export default AuthLayout;
