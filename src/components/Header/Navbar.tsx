import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar__brand">React Test Shop</span>

      <ul className="flex-1">
        <li>
          <NavLink className="navbar__link" to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar__link" to="/orders" end>
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
