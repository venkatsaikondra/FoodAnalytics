import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">Food Delivery</div>
        <nav className="nav-links">
          <NavLink to="/" end className={({isActive})=> isActive? 'link active':'link'}>Home</NavLink>
          <NavLink to="/signin" className={({isActive})=> isActive? 'link active':'link'}>Sign In</NavLink>
          <NavLink to="/signup" className={({isActive})=> isActive? 'link active':'link'}>Sign Up</NavLink>
          <NavLink to="/profile" className={({isActive})=> isActive? 'link active':'link'}>Profile</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
