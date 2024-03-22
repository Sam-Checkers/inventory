import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import EditPost from './EditPost';

const Home = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userPosts, setUserPosts] = useState([]);
  const { data: allPosts, error, isPending, refetch } = useFetch('https://inventory-api-1.onrender.com/posts');
  const history = useHistory();
  const [showEdit, setShowEdit] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDeletePost = async (postId) => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(`https://inventory-api-1.onrender.com/posts/${postId}`, config);
      // Reload the page after deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = (postId) => {
    // Show the edit form for the specific post
    setShowEdit(true);
    setSelectedPostId(postId);
  };

  const updatePosts = () => {
    // Refresh the page after an update
    window.location.reload();
  };

  useEffect(() => {
    if (isAuthenticated && allPosts) {
      const postsByCurrentUser = allPosts; // You can filter the posts by the current user
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
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              <button onClick={() => handleUpdatePost(post.id)}>Update</button>
              {showEdit && selectedPostId === post.id && (
                <EditPost postId={post.id} updatePosts={updatePosts} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;