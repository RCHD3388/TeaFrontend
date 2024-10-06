import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Navbar.css'

const GuestLayout: FC<{ children: React.ReactNode }> = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/g2" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/g3" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default GuestLayout;

