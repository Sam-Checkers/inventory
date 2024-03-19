import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav>
      <div>
        <h1>My Blog</h1>
        <div>
          {!isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>Log in</button>
          )}
          {isAuthenticated && (
            <div>
              <span>Welcome, {user.name}</span>
              <button onClick={() => logout({ returnTo: window.location.origin })}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;