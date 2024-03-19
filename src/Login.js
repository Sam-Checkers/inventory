import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import auth0Config from './auth0Config'; // Import the Auth0 configuration

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => loginWithRedirect()}>Log in</button>
    </div>
  );
};

export default Login;