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

    comments.push({ id: commentId, content });

    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        postId,
        content,
      },
    });

    res.status(201).json(comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send();
  }
});

app.post('/events', (req, res) => {
  console.log('Received Event: ', req.body.type);
  res.sendStatus(204);
});

app.listen(4001, console.log('[´comments] listening at port 4001'));
