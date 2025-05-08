import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>BookRev</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-book">Add Book</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
