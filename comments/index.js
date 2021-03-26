const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

console.log(cors);

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.json(commentsByPostId[req.params.id]);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { id: postId } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  res.status(201).json(comments);
});

app.listen(4001, console.log('[´comments] listening at port 4001'));
