import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userPosts, setUserPosts] = useState([]);
  const { data: allPosts, error, isPending } = useFetch('http://localhost:3000/create');

  useEffect(() => {
    if (isAuthenticated && allPosts) {
      const postsByCurrentUser = allPosts
      setUserPosts(postsByCurrentUser);
    }
  }, [isAuthenticated, allPosts]);

  return (
    <div className="home">
      {isAuthenticated && (
        <div>
          <h3>Your Cars:</h3>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {userPosts && userPosts.map(post => (
            <div className="post-preview" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;