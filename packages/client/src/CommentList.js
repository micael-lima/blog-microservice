import React from 'react';

const CommentList = ({ comments }) => {
  if (!comments) return null;

  return (
    <ul>
      {comments.map((comment, id) => {
        return <li key={id}>{comment.content}</li>;
      })}
    </ul>
  );
};

export default CommentList;
