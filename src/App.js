import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import auth0Config from './auth0Config'; // Import the Auth0 configuration

function App() {
  const { domain, clientId } = auth0Config;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/blogs/:id" component={BlogDetails} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;