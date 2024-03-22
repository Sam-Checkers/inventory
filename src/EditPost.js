import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const EditPost = ({ postId, updatePosts }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the details of the specific post using the postId
    // Populate the form with the existing post data
  }, [postId]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const updatedData = { title, content }; // Updated post data from the form
      const config = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      };
      await fetch(`https://inventory-api-1.onrender.com/posts/${postId}`, config);
      // Reload the page after the update
      window.location.reload();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdatePost}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;