import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import auth0Config from './auth0Config'; // Import the Auth0 configuration

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log out
      </button>
    </div>
  );
};

export default Logout;