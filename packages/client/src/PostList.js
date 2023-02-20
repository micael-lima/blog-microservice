import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('http://localhost:4002/posts');
      console.log(data);
      setPosts(data);
    })();
  }, []);

  if (!posts) return null;

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.values(posts).map((post) => {
        return (
          <div className="card mb-2" style={{ width: '30%' }} key={post.id}>
            <div className="card-body">
              <h3>{post.title}</h3>
              <CommentList comments={post.comments} />
              <CommentCreate postId={post.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
