const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: posts[id],
    });

    res.status(201).json(posts[id]);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

app.post('/events', (req, res) => {
  console.log('Received Event: ', req.body.type);
  res.sendStatus(204);
});

app.listen(4000, () => console.log('[posts] listening on port 4000'));
