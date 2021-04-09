const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
  const event = req.body;

  try {
    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

app.listen(4005, () => console.log('[posts] listening on port 4005'));
