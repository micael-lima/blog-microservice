const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsByPostId[req.params.id]);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { id: postId } = req.params;
  const { content } = req.body;

  try {
    const comments = commentsByPostId[postId] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        status: 'pending',
        postId,
        content,
      },
    });

    res.status(201).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
      const { postId, id, status, content } = data;

      const comments = commentsByPostId[postId];
      const comment = comments.find((comment) => comment.id === id);

      comment.status = status;

      await axios.post('http://localhost:4005/events', {
        type: 'CommentUpdated',
        data: { id, postId, status, content },
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(4001, console.log('[´comments] listening at port 4001'));
