import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-menu">
      <Link to="/cities" className="nav-link">Cities List</Link>
      <Link to="/add-city" className="nav-link">Add City</Link>
    </nav>
  );
}

export default Navigation;