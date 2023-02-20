const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => res.json(posts));

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  console.log(req.body.type);
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    let post = posts[postId];

    if (!post) post = { id: postId, title: '', comments: [] };

    post.comments = [...post.comments, { id, postId, content, status }];

    posts[postId] = post;
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    console.log(comment);
    comment.status = status;
    comment.content = content;
  }

  res.sendStatus(204);
});

app.listen(4002, () => console.log('[´comments] listening at port 4002'));
