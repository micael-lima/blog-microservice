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
    const { id, content, postId } = data;

    let post = posts[postId];

    if (!post) post = { id: postId, title: '', comments: [] };

    post.comments = [...post.comments, { postId, content }];

    posts[postId] = post;
  }

  res.sendStatus(204);
});

app.listen(4002, () => console.log('[´comments] listening at port 4002'));
