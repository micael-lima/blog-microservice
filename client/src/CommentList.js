import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(data);
    })();
  }, []);

  if (!comments) return null;

  return (
    <ul>
      {comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
      })}
    </ul>
  );
};

export default CommentList;
