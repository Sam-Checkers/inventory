import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import auth0Config from './auth0Config'; // Import the Auth0 configuration

const Register = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h2>Register</h2>
      <p>Register using your preferred social account or email</p>
      <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
        Register
      </button>
    </div>
  );
};

export default Register;