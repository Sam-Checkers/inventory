import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './CreatePost.css';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();

  const handleCreatePost = async () => {
    try {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const newPost = { title, body, author: user.name };
      const response = await axios.post('http://localhost:8000/home', newPost, config);
      console.log('New post created:', response.data);
      history.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="create-post">
      <h2>Add a New Car</h2>
      <form onSubmit={handleCreatePost}>
        <div className="form-group">
          <label>Car:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Car Description:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit">Submit Car</button>
      </form>
    </div>
  );
};

export default CreatePost;