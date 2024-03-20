import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';

const Posts = () => {
  const { data: posts, error, isPending } = useFetch('http://localhost:8000/posts');

  return (
    <div className="posts">
      <h2>Posts</h2>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {posts && (
        <div>
          {posts.map(post => (
            <div className="post-preview" key={post.id}>
              <h3>{post.title}</h3>
              <p>Written by {post.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;