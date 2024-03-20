import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <h1>Car Universe</h1>
        <div>
          <Link to="/">Home</Link>
          {isAuthenticated && <Link to="/Create">Add Car</Link>}
          {isAuthenticated ? (
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()}>Log in</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;